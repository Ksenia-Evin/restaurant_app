import express from 'express';
import Bull from 'bull';
import Menu from './entities/Menu.js';
import Chef from './entities/Chef.js';
import menuRoutes from './routes/menu.js';
import orderRoutes from './routes/orders.js';
import billsRoutes from './routes/bills.js';
import Waitress from './entities/Waitress.js';
import { userPrompt } from './promptUser.js';

const app = express();
const port = 3000;

app.use(express.json());

const cookingQueue = new Bull('cookingQueue', {
  redis: {
    host: '127.0.0.1',
    port: 6379
  }
});
  
const deliveryQueue = new Bull('deliveryQueue', {
  redis: {
      host: '127.0.0.1',
      port: 6379
  }
});

const menu = new Menu();

const chefs = [
  new Chef(1),
  new Chef(2)
];

const waitresses = [
  new Waitress(1)
]

const orders = {};

async function processCookingQueue() {
  cookingQueue.process(async (job, done) => {
    const { order } = job.data;
    const { tableNumber, listOfDishes } = order;

    const availableChef = chefs.find(chef => chef.isAvailable);
    if (availableChef) {
      availableChef.cook(listOfDishes, menu, async () => {
        deliveryQueue.add({ tableNumber, listOfDishes });
      });
    } else {
      console.log('No chefs available at the moment. Job will be retried.');
      cookingQueue.add({ order }, { delay: 3000 });
    }
    done();
  });
}

async function processDeliveryQueue() {
  deliveryQueue.process(async (job, done) => {
    const { tableNumber, listOfDishes } = job.data;
    const availableWaitress = waitresses.find(waitress => waitress.isAvailable);

    if (availableWaitress) {
      availableWaitress.deliver(listOfDishes, menu, () => {
        orders[tableNumber].completeMeal();
        if (orders[tableNumber].isCompleted()) {
          console.log(`Order ${tableNumber} is complete and all meals have been delivered.`);
        }
      });
    } else {
      console.log(`No waitresses available to deliver. Job will be retried.`);
      deliveryQueue.add({ tableNumber, listOfDishes}, { delay: 3000 });
    }
    done();
  });
}
    

app.use('/', orderRoutes);
app.use('/', menuRoutes);
app.use('/', billsRoutes);

processCookingQueue();
processDeliveryQueue();

app.listen(port, () => {
    console.log(`\nRestaurant API listening at http://localhost:${port}`);
  });

// userPrompt(menu)

export { menu, orders, cookingQueue}