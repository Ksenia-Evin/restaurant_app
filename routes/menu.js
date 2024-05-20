import express from 'express';
import { menu } from '../server.js';

const router = express.Router();

router.get('/menu', (req, res) => {
    res.send(menu.getMenu());
});

router.post('/dish', (req, res) => {
    const {name, price, time} = req.body;
    try {
      menu.addMeal(name, price, time);
      res.send({ message: `Your dish ${name} added to the menu` })
    }
    catch {
      res.status(400).send({ error: `Error occured during the adding of the dish ${name}`});
    }
});

export default router;
