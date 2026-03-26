const authService = require("./authService");

const login = (req, res) => {
    try {
        const result = authService.loginUser(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const register = (req, res) => {
    try {
        const result = authService.registerUser(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    login,
    register
};