const express = require("express");
const cors = require("cors");

const authRoutes = require("./CONTROLADORES/authRoutes");

const app = express();
const PORT = 3001; // 🔥 IMPORTANTE: cambiar puerto

app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/auth", authRoutes);

// Ruta de prueba
app.get("/", (req, res) => {
    res.json({ mensaje: "Backend funcionando" });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});