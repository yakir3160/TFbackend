import express from 'express';
import Product from '../dal/models/Product.js';

const router = express.Router();

router.post('/init', async (req, res) => {
    try {
        const initialProducts = [
            { name: 'Apple', pricePerKg: 5.99, image: 'apple.jpg' },
            { name: 'Banana', pricePerKg: 3.99, image: 'banana.jpg' },
            { name: 'Orange', pricePerKg: 4.99, image: 'orange.jpg' },
        ];

        await Product.insertMany(initialProducts);
        res.status(201).json({ message: 'Initial products added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding initial products', error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
});

export default router;