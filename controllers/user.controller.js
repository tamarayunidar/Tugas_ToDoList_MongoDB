const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports = {
    registerUser: async (req, res) => {
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const user = await User.create({
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword
            });

            res.status(201).json({
                message: "User successfully registered",
                data: user
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    loginUser: async (req, res) => {
        const user = await User.findOne({ username: req.body.username });
        if (user == null) {
            return res.status(400).json({ message: "User not found" });
        }

        try {
            if (await bcrypt.compare(req.body.password, user.password)) {
                const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET);
                res.json({ accessToken: accessToken });
            } else {
                res.status(401).json({ message: "Invalid password" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};