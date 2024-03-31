const express = require('express');
const router = express.Router();

// Impor user model
const { User } = require('../models');

// GET all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find().populate('thoughts').populate('friends');
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to get users' });
    }
});

// GET single user by ID
router.get('/users/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate('thoughts').populate('friends');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to get user' });
    }
});

// POST a new user
router.post('/users', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: 'Failed to create user' });
    }
});

// PUT update a user by ID
router.put('/users/:userId', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: 'Failed to update user' });
    }
});

// DELETE to remove a user by ID
router.delete('/users/:userId', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.userId);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(deletedUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete user' });
    }
});

module.exports = router;
