import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    pricePerKg: { type: Number, required: true },
    image: { type: String, required: true },
});

export default mongoose.model('Product', productSchema);