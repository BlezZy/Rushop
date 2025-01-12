const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();




const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const user = await User.findOne({email});

        if (!user) {
            return res.status(404).json({error: 'User not found'})
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return res.status(401).json({error: 'Invalid password'})
        }

        const token = jwt.sign({
            id: user._id, role: user.role},
            process.env.JWT_SECRET,
            {expiresIn: '5m'}
        )

        return res.status(200).json({message: 'Login successful', token})
    }
    catch (error) {
        console.error("Error during login", error)
        return res.status(500).json(error)
    }
}

const logoutUser = async (req, res) => {
    try {
        res.status(200).json({message: 'Logged out successfully.'})
    }
    catch (error) {
        console.error("Error during logout", error)
        return res.status(500).json(error)
    }
}


module.exports = {
    loginUser,
    logoutUser,
}