export default class Chef {
    constructor(id) {
      this.id = id;
      this.isAvailable = true;
    }
  
    async cook(mealIds, menu, callback) {
      this.isAvailable = false;
      for (const mealId of mealIds) {
        const mealFromTheMenu = menu.getMenu().find(dish => dish.id === mealId);
        console.log(`Chef ${this.id} is cooking ${mealFromTheMenu.name} for ${mealFromTheMenu.time} minutes.`);
        await this.cookMeal(mealFromTheMenu.time);
        console.log(`Chef ${this.id} finished cooking ${mealFromTheMenu.name}.`);
      }
      this.isAvailable = true;
      callback();
    }

    cookMeal(time) {
      return new Promise(resolve => {
        setTimeout(resolve, time * 100);
      });
    }
    
  }
  