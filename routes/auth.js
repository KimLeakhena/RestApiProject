const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require("jsonwebtoken");
const { verifyOrdinaryUser, verifyAdmin } = require('../middleware/authenticate');
const bcrypt = require('bcrypt');

//SIGNUP Route
router.post("/signup", async (req, res) => {
    try {
        const { username, password, role } = req.body;

        const existing = await User.findOne({ username });
        if (existing) {
            return res.status(409).json({ message: "Username already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword, role });
        await user.save();

        res.status(201).json({ message: "New user registered successfully" });
    } catch (error) {
        console.error("Signup error:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
});

//LOGIN Route
router.post("/login", async (req, res) => {
    const { username, password, role } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch || user.role !== role) {
            return res.status(401).json({ message: "Invalid username, password, or role" });
        }

        const token = jwt.sign(
            { id: user._id, username: user.username, role: user.role, },
            process.env.JWT_SECRET,
            { expiresIn: "2d" }
        );

        res.json({ token });
    } catch (error) {
        console.error("Login error:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
});

//Get All User

router.get('/users', verifyOrdinaryUser, verifyAdmin, async (req, res) => {
    try {
        const users = await User.find().select('-password'); // hide password
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving users' });
    }
});


module.exports = router;
