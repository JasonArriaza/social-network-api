const express = require('express');
const router = express.Router();
const { Thought, User } = require('../models');

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


// GET all thoughts
router.get('/thoughts', async (req, res) => {
    try {
        const thoughts = await Thought.find().populate('reactions');
        res.json(thoughts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to get thoughts' });
    }
});

// GET a single thought by ID
router.get('/thoughts/:thoughtId', async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.thoughtId).populate('reactions');
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        res.json(thought);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to get thought' });
    }
});

// POST a new thought
router.post('/thoughts', async (req, res) => {
    try {
        const thought = await Thought.create(req.body);
        // Push the created thought's _id to the associated user's thoughts array field
        const user = await User.findByIdAndUpdate(
            req.body.userId,
            { $push: { thoughts: thought._id } },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(201).json(thought);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: 'Failed to create thought' });
    }
});

// PUT to update a thought by ID
router.put('/thoughts/:thoughtId', async (req, res) => {
    try {
        const updatedThought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true });
        if (!updatedThought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        res.json(updatedThought);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: 'Failed to update thought' });
    }
});

// DELETE to remove a thought by ID
router.delete('/thoughts/:thoughtId', async (req, res) => {
    try {
        const deletedThought = await Thought.findByIdAndDelete(req.params.thoughtId);
        if (!deletedThought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        // Remove the deleted thought's _id from the associated user's thoughts array field
        await User.findByIdAndUpdate(deletedThought.userId, { $pull: { thoughts: req.params.thoughtId } });
        res.json(deletedThought);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete thought' });
    }
});


module.exports = router;
