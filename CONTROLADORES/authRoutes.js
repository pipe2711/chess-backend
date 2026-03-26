const express = require("express");
const authController = require("./authController");

const loginRouter = express.Router();
const registerRouter = express.Router();

loginRouter.post("/", authController.login);
registerRouter.post("/", authController.register);

module.exports = {
    loginRouter,
    registerRouter
};