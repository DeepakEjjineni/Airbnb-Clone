const User = require("../models/user.js");

// Signup
module.exports.signup = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        let newUser = new User({ email, username });
        let registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ success: true, message: "Welcome to GlobeTrotter!!", user: req.user });
        });
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};

// Login
module.exports.login = async (req, res) => {
    res.json({ success: true, message: "Welcome Back!!", user: req.user });
};

// Logout
module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.json({ success: true, message: "Logged out successfully" });
    });
};