import express from 'express';
import userRoutes from './users.js';
import productRoutes from './products.js';
import orderRoutes from './orders.js';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/orders', orderRoutes);

export default router;