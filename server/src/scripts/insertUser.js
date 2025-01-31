const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
});

// Function to insert a user
const insertUser = async () => {
    const username = 'admin';
    const password = 'password123';

    try {
        const user = new User({ username, password });

        // Save the user to the database
        await user.save();

        console.log('User inserted successfully:', user);
    } catch (err) {
        console.error('Error inserting user:', err.message);
    } finally {
        // Close the database connection
        mongoose.connection.close();
    }
};

// Run the function
insertUser();