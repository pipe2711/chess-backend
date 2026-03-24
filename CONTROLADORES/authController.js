const authService = require("./authService");

const handleAuth = (req, res) => {
    try {
        const result = authService.handleAuth(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    handleAuth
};