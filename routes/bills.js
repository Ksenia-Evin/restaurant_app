import express from 'express';
import { orders } from '../server.js';

const router = express.Router();

let PROFIT = 0;

router.get('/bill/:tableId', async (req, res) => {
    const {tableId } = req.params;
    const tableOrder = orders[tableId];
    if (tableOrder?.completedMeals) {
        let bill = tableOrder.countBill();
        PROFIT = PROFIT + bill;
        res.send({ message: `Your bill is ${bill}` });
    }
    else {
        res.send({ message: `The order has not completed yet` });
    }
});

router.get('/profit', async (req, res) => {
    res.send({ message: `Your current profit is ${PROFIT}` });
})

export default router;