const express = require("express");
const cors = require("cors");

const { loginRouter, registerRouter } = require("./CONTROLADORES/authRoutes");

const loginApp = express();
const registerApp = express();

const LOGIN_PORT = 3001;
const REGISTER_PORT = 3002;

loginApp.use(cors());
loginApp.use(express.json());

registerApp.use(cors());
registerApp.use(express.json());

loginApp.use("/api/login", loginRouter);
registerApp.use("/api/register", registerRouter);

loginApp.get("/", (req, res) => {
    res.json({ mensaje: "Servidor de login funcionando" });
});

registerApp.get("/", (req, res) => {
    res.json({ mensaje: "Servidor de registro funcionando" });
});

loginApp.listen(LOGIN_PORT, () => {
    console.log(`Login corriendo en http://localhost:${LOGIN_PORT}`);
});

registerApp.listen(REGISTER_PORT, () => {
    console.log(`Register corriendo en http://localhost:${REGISTER_PORT}`);
});