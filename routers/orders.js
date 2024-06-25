import express from 'express';
import Order from '../dal/models/Order.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { user, products, totalPrice } = req.body;
        const order = new Order({ user, products, totalPrice });
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ message: 'Error creating order', error: error.message });
    }
});

export default router;