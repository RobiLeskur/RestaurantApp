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

 


  orderFood(objectRestaurant) {
    objectRestaurant.menu.showMenu();
    let orderChoice = prompt(
      "Unesi jela koja zelis naruciti, ako zelis neko novo jelo, napisi rijec (custom)"
    );

   if (orderChoice.toLowerCase().trim() != "custom") {
      this.orderedDishes.readyMeals.push(...orderChoice.split(","));
      this.orderedDishes.readyMeals = this.orderedDishes.readyMeals.map(x => x.trim().toLowerCase());
    }
    else{
      this.orderedDishes.customMeals.push(objectRestaurant.menu.addCustomDish());

    }
 

  }
}

function generateRandomTables(restaurant) {
  let tables = [];
  for(let i = 1; i <= restaurant.numberOfTablesAtRestaurant; i++){
    tables.push(new Table(i, (Math.random()*10).toFixed()));

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
    "Grilani losos",
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
    "Vegetarijanska Pizza",
    ["rajčica", "paprika", "gljive", "masline", "sir"],
    "Pizza bogata povrćem za vegetarijance",
    28.99
  ));

  dishList.push(new Dish(
    "Cokoladni sufle",
    ["čokolada", "jaja", "šećer", "maslac"],
    "Topao sufle od čokolade s tekućim srednjim dijelom",
    15.99
  ));

  return dishList;
}



class Restaurant {
  constructor(numberOfTablesAtRestaurant, listOfTables) {
    this.numberOfTablesAtRestaurant = numberOfTablesAtRestaurant;
    this.tableState = listOfTables;
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

          let dishName = prompt("Unesi ime jela: ");
          let dishIngredients = prompt("Unesi sastojke jela(odvoji ih zarezom): ").split(",");
          return new Dish(dishName, dishIngredients, "", (Math.random()*30+10).toFixed(2));
        
        }

  
}
}
}

//Object Generation

let restaurant = new Restaurant(Number(prompt("Unesi broj stolova na raspolaganju: ")));
restaurant.menu.readyMeals = createReadyDishes();
restaurant.tableState = generateRandomTables(restaurant);


 






//table.orderFood(restaurant);
console.log(restaurant.tableState)


