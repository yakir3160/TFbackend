import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import productRoutes from './routers/products.js';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use('/products', productRoutes);

(async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {

        });
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
})();
