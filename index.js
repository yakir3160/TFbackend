import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';
import routes from './routers/index.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const app = express();
app.use(cors());

app.use(express.json());

app.use('/api', routes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('*', (req, res) => {
    console.log(`No route found for ${req.method} ${req.originalUrl}`);
    res.status(404).json({ message: 'Route not found' });
});
const PORT = process.env.PORT;

(async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
    catch(err) {
        console.error(err);
        process.exit(1);
    }
})();