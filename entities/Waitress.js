export default class Waitress {
    constructor(id) {
      this.id = id;
      this.isAvailable = true;
    }
  
    deliver(listOfTheDishes, menu, callback) {
      this.isAvailable = false;
      const completedMeals = menu.getMenu().filter(dish => listOfTheDishes.includes(dish.id));
      console.log(`Waitress ${this.id} is delivering ${completedMeals.map(meal => meal.name).join(",")}.`);
      setTimeout(() => {
        this.isAvailable = true;
        console.log(`Waitress ${this.id} finished delivering ${completedMeals.map(meal => meal.name).join(",")}.`);
        callback();
      }, 2000);
    }
  }  