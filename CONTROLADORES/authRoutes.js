const express = require("express");
const router = express.Router();
const authController = require("./authController");

router.post("/", authController.handleAuth);

module.exports = router;