import express from 'express';
import Order from '../dal/models/Order.js';
import Product from '../dal/models/Product.js';
import mongoose from 'mongoose';


const router = express.Router();

router.post('/', async (req, res) => {
    try {

        const { customerInfo, products, totalPrice } = req.body;

        // Basic validation
        if (!customerInfo || !products || products.length === 0 || totalPrice === undefined) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        // Create new order
        const order = new Order({
            customerInfo,
            products: Array.isArray(products) ? products.map(item => ({
                productId: item.productId.toString(),
                name: item.name,
                quantity: item.quantity,
                pricePerKg: item.pricePerKg
            })) : [],
            totalPrice
        });

        // Save the order
        const savedOrder = await order.save();

        for (let item of products) {
            await Product.findByIdAndUpdate(item.productId, { $inc: { orderCount: item.quantity } });
        }
        // Send the saved order back to the client
        res.status(201).json({ success: true, orderId: savedOrder._id });
    } catch (error) {
        console.error('Error creating order:', error);
        if (error instanceof mongoose.Error.ValidationError) {
            console.error('Validation error details:', error.errors);
        }
        res.status(400).json({
            success: false,
            message: 'Error creating order',
            error: error.message,
            stack: error.stack
        });
    }
});

router.get('/', async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
});

export default router;