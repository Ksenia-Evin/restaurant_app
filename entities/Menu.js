export default class Menu {
    constructor() {
      this.menu = [
        { id: 1, name: "meat", price: 25, time: 25 },
        { id: 2, name: "fish", price: 20, time: 15 },
        { id: 3, name: "potato", price: 10, time: 10 },
        { id: 4, name: "salad", price: 15, time: 15 },
        { id: 5, name: "pasta", price: 30, time: 25 }
			]
    }
  
    getMenu() {
      return this.menu;
    }
  
    addMeal(name, price, time) {
    	const menuSize = this.menu.length;
      this.menu.push({ id: menuSize+1, name, price, time });
		}
  }
  