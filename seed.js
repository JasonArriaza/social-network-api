const mongoose = require('mongoose');
const { User, Thought } = require('./models');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/social-network', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Function to seed initial users
const seedUsers = async () => {
    try {
        await User.deleteMany(); // Clear existing users

        const users = [
            { username: 'user1', email: 'user1@example.com' },
            { username: 'user2', email: 'user2@example.com' },
            { username: 'user3', email: 'user3@example.com' }
        ];

        await User.create(users);

        console.log('Users seeded successfully');
    } catch (err) {
        console.error('Error seeding users:', err);
    }
};

// Function to seed initial thoughts
const seedThoughts = async () => {
    try {
        await Thought.deleteMany(); // Clear existing thoughts

        const thoughts = [
            { thoughtText: 'Thought 1', username: 'user1' },
            { thoughtText: 'Thought 2', username: 'user2' },
            { thoughtText: 'Thought 3', username: 'user3' }
        ];

        await Thought.create(thoughts);

        console.log('Thoughts seeded successfully');
    } catch (err) {
        console.error('Error seeding thoughts:', err);
    }
};

// Seed the database with initial data
const seedDatabase = async () => {
    await seedUsers();
    await seedThoughts();
    mongoose.connection.close(); // Close the connection after seeding
};

// Call the seedDatabase function to start seeding
seedDatabase();
