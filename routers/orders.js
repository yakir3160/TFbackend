import express from 'express';
import Order from '../dal/models/Order.js';
import mongoose from 'mongoose';


const router = express.Router();

router.post('/', async (req, res) => {
    try {
        console.log('Received request body:', JSON.stringify(req.body, null, 2));
        console.log('Products from request:', JSON.stringify(req.body.products, null, 2));

        const { customerInfo, products, totalPrice } = req.body;

        console.log('Destructured products:', JSON.stringify(products, null, 2));


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
        console.log('Products in new order:', JSON.stringify(order.products, null, 2));

        console.log('Order before save:', JSON.stringify(order, null, 2));

        // Save the order
        const savedOrder = await order.save();

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
    console.log('GET request received for /api/orders');
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        console.log(`Found ${orders.length} orders`);
        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
});

export default router;