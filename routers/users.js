import express from 'express';
import User from '../dal/models/User.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { fullName, email, phoneNumber } = req.body;
        const user = new User({ fullName, email, phoneNumber });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: 'Error creating user', error: error.message });
    }
});

export default router;