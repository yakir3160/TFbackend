import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import routes from './routers/index.js';
const app = express();
app.use(express.json());

// Use the user router
app.use('/api', routes);

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