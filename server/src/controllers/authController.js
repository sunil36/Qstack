const bcrypt = require('bcryptjs');
const User = require('../models/User');
const generateToken = require('../utils/jwtUtils');

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne(username);
        console.group(user);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' })
        }
        // const isPasswordValid = await bcrypt.compare(password, user.password);
        // if (!isPasswordValid) {
        //     return res.status(404).json({ message, 'Password not match.Please try again.'})
        // }
        // Generate JWT token
        const token = generateToken({ id: user._id, username: user.username });

        res.status(200).json({ message: 'Login successful', token });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: err.message });

    }
};
module.exports = { login };