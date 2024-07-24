import express from 'express';
import Product from '../dal/models/Product.js';
import multer from 'multer';
import path from 'path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const router = express.Router();

const uploadsDir = './uploads';
if (!fs.existsSync(uploadsDir)){
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// router.post('/init', async (req, res) => {
//     try {
//         const initialProducts = [
//             { name: 'Apple', pricePerKg: 5.99, image: 'apple.jpg' },
//             { name: 'Banana', pricePerKg: 3.99, image: 'banana.jpg' },
//             { name: 'Orange', pricePerKg: 4.99, image: 'orange.jpg' },
//         ];
//
//         await Product.insertMany(initialProducts);
//         res.status(201).json({ message: 'Initial products added successfully' });
//     } catch (error) {
//         res.status(500).json({ message: 'Error adding initial products', error: error.message });
//     }
// });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', 'uploads'))
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage:storage });

router.post('/', upload.single('image'), async (req, res) => {
    try{

        const { name, pricePerKg } = req.body;
        if (!req.file) {
            throw new Error('No file uploaded');
        }
        const image = req.file.filename;

        const newProduct = new Product({
            name,
            pricePerKg: parseFloat(pricePerKg),
            image });

        await newProduct.save();

        res.status(201).json({message: 'Product added successfully', product: newProduct});
    } catch (error) {
        res.status(500).json({ message: 'Error adding product', error: error.message });
    }


})
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
});
router.get('/best-sellers', async (req, res) => {
    try {
        const bestSellers = await Product.find()
            .sort({ orderCount: -1 })  // Sort by orderCount in descending order
            .limit(8);  // Limit to top 8 products
        res.json(bestSellers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching best sellers', error: error.message });
    }
});

export default router;
