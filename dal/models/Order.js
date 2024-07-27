import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    customerInfo: {
        fullName: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        zip: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true }
    },
    products: [{
        productId: { type: String, required: true },
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        pricePerKg: { type: Number, required: true }
    }],
    totalPrice: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    status: {
        type: String,
        enum: ['processing', 'shipped', 'closed'],
        default: 'processing'
    },
});

const Order = mongoose.model('Order', orderSchema);

export default Order;