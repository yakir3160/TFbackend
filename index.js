import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';
import routes from './routers/index.js';
const app = express();
app.use(cors());

app.use(express.json());

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