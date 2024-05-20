import { menu } from "../server.js";

export default class Order {
    constructor(meals, comments, tableNumber) {
      this.listOfDishes = meals;
      this.tableNumber = tableNumber;
      this.comments = comments;
      this.completedMeals = false;
    }
  
    completeMeal() {
      this.completedMeals = true;
    }
  
    isCompleted() {
      return this.completedMeals;
    }

    countBill() {
        return this.listOfDishes.reduce((totalPrice, mealId) => {
            const meal = menu.getMenu().find(item => item.id === mealId);
            return totalPrice + meal.price;
          }, 0);
    }
  }
  