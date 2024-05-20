import express from 'express';
import Order from '../entities/Order.js';
import { menu, orders, cookingQueue } from '../server.js';

const router = express.Router();

router.post('/order', async (req, res) => {
    const { meals: orderedMeals, comments, tableNumber } = req.body;
    const listOfDishes = [];
    for (let orderedMeal of orderedMeals) {
      const meal = menu.getMenu().find(dish => dish.name === orderedMeal);
      if (!meal?.id) {
        return res.status(400).send({ error: `Invalid meal type: ${meal}` });
      }
      else {
        listOfDishes.push(meal.id);
      }
    }

    orders[tableNumber] = new Order(listOfDishes, comments, tableNumber);
  
    cookingQueue.add({ order: orders[tableNumber] });
  
    res.send({ message: `Your order has been queued with order ID ${tableNumber}` });
});

export default router;