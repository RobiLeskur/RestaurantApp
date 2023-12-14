class Table {
  constructor(id, maxNumberOfPeople) {
    this.id = id;
    this.numberOfPeople = 0;
    this.maxNumberOfPeople = maxNumberOfPeople;
    this.orderedDishes = {
      readyMeals: [],
      customMeals: [],
    };
    this.active = false;
    this.check = 0;
  }

 resetTable(){
  this.numberOfPeople = 0;
  this.orderedDishes = {
    readyMeals: [],
    customMeals: [],
  };
  this.active = false;
  this.check = 0;
 }


  orderFood(objectRestaurant) {
    objectRestaurant.menu.showMenu();
    let orderChoice = prompt(
      "Unesi jela koja zelis naruciti, ako zelis neko novo jelo, napisi rijec (custom)"
    );

   if (orderChoice.toLowerCase().trim() != "custom") {
      let listOfDishNamesToMake = orderChoice.split(",");
      listOfDishNamesToMake = listOfDishNamesToMake.map(x => x.trim().toLowerCase());
     
     listOfDishNamesToMake.forEach(dishName => {
          
        let dish = objectRestaurant.menu.readyMeals.find(obj => obj.name.toLowerCase() == dishName);

        if(dish){
          this.orderedDishes.readyMeals.push(dish);
          this.check += dish.price;
        }

      });
    }
    else{
      this.orderedDishes.customMeals.push(objectRestaurant.menu.addCustomDish());
      this.check += this.orderedDishes.customMeals[this.orderedDishes.customMeals.length-1].price;

    }
 
 

  }
}

function generateRandomTables(restaurant) {
  let tables = [];
  for(let i = 1; i <= restaurant.numberOfTablesAtRestaurant; i++){
    tables.push(new Table(i, Number((Math.random()*10).toFixed())+1));

  }
  return tables;
}


class Dish {
  constructor(name, ingredients, description, price) {
    this.name = name;
    this.ingredients = ingredients;
    this.description = description;
    this.price = price;
  }
}

function createReadyDishes() {
  const dishList = [];

  dishList.push(new Dish(
    "Pasta Carbonara",
    ["tjestenina", "jaja", "panceta", "parmezan", "crni papar"],
    "Klasično talijansko jelo s kremastim umakom",
    35.99
  ));

  dishList.push(new Dish(
    "Losos",
    ["filet lososa", "limun", "maslinovo ulje", "začini"],
    "Svježi grilani filet lososa s citrusnim okusom",
    45.99
  ));

  dishList.push(new Dish(
    "Pileca Salata",
    ["piletina", "zeleniš", "rajčica", "krastavac", "preljev"],
    "Svježa salata s pečenom piletinom",
    25.99
  ));

  dishList.push(new Dish(
    "Pizza",
    ["rajčica", "paprika", "gljive", "masline", "sir"],
    "Pizza bogata povrćem za vegetarijance",
    28.99
  ));

  dishList.push(new Dish(
    "Sufle",
    ["čokolada", "jaja", "šećer", "maslac"],
    "Topao sufle od čokolade s tekućim srednjim dijelom",
    15.99
  ));

  return dishList;
}



class Restaurant {
  constructor(numberOfTablesAtRestaurant) {
    this.numberOfTablesAtRestaurant = numberOfTablesAtRestaurant;
    this.tableState = [];
    this.allTables = [];
    this.menu = {
      readyMeals: [],
      customMeals: [],

      showMenu: function() {
        console.log("Gotova jela: ");
        this.readyMeals.forEach(dish => {
          console.log(dish.name + " - " + dish.price);
        });
      },

     addCustomDish: function(){
      //ovdje mi je vise smisla imalo staviti random kao cijenu, *nije slucajno tako

          let dishName = prompt("Unesi ime jela: ");
          let dishIngredients = prompt("Unesi sastojke jela(odvoji ih zarezom): ").split(",");
          let dishDescription = prompt("Unesi opis jela: ");
          return new Dish(dishName, dishIngredients, dishDescription, Number((Math.random()*30+10).toFixed(2)));
        
        },
    
      
      
};
}
updateTableState(table){
    for(let i = 0;i < this.tableState.length;i++){
      if(this.tableState[i].id === table.id)
      this.tableState[i] = table;
      break;
    }
  }

  addToAllTables(table){
    for(let i = 0; i < this.tableState.length; i++){
      if(this.tableState[i].id === table.id) {
        this.allTables.push(table);
        break;
      }
    }
  }

  printAndReturnListOfAllActiveTables(){
    console.clear();
    let listOfTables = this.tableState.filter(table => table.active == true);
     listOfTables.map(table => console.log("Id: "+table.id + " -> Broj gostiju: " + table.numberOfPeople + ", racun: " + table.check));
    
    return listOfTables;
  }


}

function inputNumber(message){
  let string;
  do{
    try{
      string = Number(prompt(message))
    if(!Number.isInteger(string))
      throw new Error();
    }
    catch(error){
      console.error("Unesite ispravan broj");
    }
  }while(!Number.isInteger(string))

  return string;
}


function returnTableWithOptimalNumberOfPeople(objectRestaurant, numberOfGuests){
  const freeTables = objectRestaurant.tableState.filter(table => table.maxNumberOfPeople >= numberOfGuests && !table.active);

  if (freeTables.length === 0) {
    return null; 
  }

  return freeTables.reduce((min, table) => table.maxNumberOfPeople < min.maxNumberOfPeople ? table : min, freeTables[0]);
}


function printAllTablesForGivenAmountOfGuests(objectRestaurant, numberOfGuests){
  console.clear();
  const freeTables = objectRestaurant.tableState.filter(table => table.maxNumberOfPeople >= numberOfGuests && table.active == false);
  if(freeTables.length == 0)
  console.log("Nazalost nema slobodnih stolova")
  freeTables.forEach(table => {
    console.log("Stol broj "+table.id + " -> max " + table.maxNumberOfPeople + " ljudi")
  });

}





//Object Generation

let restaurant = new Restaurant(inputNumber("Unesi broj stolova na raspolaganju: "));
restaurant.menu.readyMeals = createReadyDishes();
restaurant.tableState = generateRandomTables(restaurant);


//App Execution


let ownerChoice;
do{
  do{
     ownerChoice =  prompt("Unesi naredbu: \nNovi stol -> \"1\"\nIsprazni stol -> \"2\"\nGotov radno vrijeme -> \"3\"");
     if(ownerChoice != "1" && ownerChoice != "2" && ownerChoice != "3")
      console.error("Unesi ispravan broj!")

  }while(ownerChoice != "1" && ownerChoice != "2" && ownerChoice != "3")
    
  switch(ownerChoice) {

    case "1":
      let numberOfGuests = inputNumber("Unesi broj gostiju: ");
      


      printAllTablesForGivenAmountOfGuests(restaurant, numberOfGuests);
      let currentTable;
      try{
      currentTable = returnTableWithOptimalNumberOfPeople(restaurant, numberOfGuests); //note: ovdje sam implementirao da sustav automatski sjedne osobu za stol koji ce oduzimati minimalno mjesta restoranu umjesto da sami biraju
      currentTable.active = true;
      currentTable.numberOfPeople = numberOfGuests;
      restaurant.updateTableState(currentTable);
  
    }
    catch(error){
      console.log("Pokusajte kasnije\n");
      continue;
    }

    console.clear();
      console.log("*sjeli ste za stol broj "+ currentTable.id);
      currentTable.orderFood(restaurant);
      restaurant.updateTableState(currentTable);
      restaurant.addToAllTables(currentTable);
     


      break;
      case "2":
       let listOfActiveTables = restaurant.printAndReturnListOfAllActiveTables();
       let idOfTableToRemove = inputNumber("Unesi broj stola za isprazniti: ");
      let isInputRight = false;
       listOfActiveTables.forEach(table => {
        if(table.id == idOfTableToRemove){
          restaurant.tableState[restaurant.tableState.find(item => item.id == idOfTableToRemove)] = table.resetTable();
          console.log("Stol "+ table.id +" - ispraznjen");
          isInputRight = true;
        }
       });
       if(isInputRight == false)
        console.log("Stol je vec prazan...");

      break;
      case "3":
      break;
  
  }
  
  
}while(ownerChoice != "3");
 







