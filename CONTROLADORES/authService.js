const authModel = require("../MODELO/authModel");

const handleAuth = (data) => {
    const { operation, email, username, password, user } = data;

    if (!operation) {
        throw new Error("operation es obligatorio");
    }

    if (operation === "register") {
        if (!email || !username || !password) {
            throw new Error("email, username y password son obligatorios");
        }

        const existingUserByEmail = authModel.findUserByEmail(email);
        if (existingUserByEmail) {
            throw new Error("El correo ya está registrado");
        }

        const existingUserByUsername = authModel.findUserByUsername(username);
        if (existingUserByUsername) {
            throw new Error("El nombre de usuario ya está registrado");
        }

        const newUser = authModel.createUser({ email, username, password });

        return {
            user: {
                userId: newUser.userId,
                username: newUser.username,
                email: newUser.email,
                elo: newUser.elo ?? 0,
                wins: newUser.wins ?? 0,
                losses: newUser.losses ?? 0,
                draws: newUser.draws ?? 0,
                matches: newUser.matches ?? []
            }
        };
    }

    if (operation === "login") {
        if (!user || !password) {
            throw new Error("user y password son obligatorios");
        }

        const userFound = authModel.findUserByEmailOrUsernameAndPassword(user, password);

        if (!userFound) {
            throw new Error("Credenciales inválidas");
        }

        return {
            user: {
                userId: userFound.userId,
                username: userFound.username,
                email: userFound.email,
                elo: userFound.elo ?? 0,
                wins: userFound.wins ?? 0,
                losses: userFound.losses ?? 0,
                draws: userFound.draws ?? 0,
                matches: userFound.matches ?? []
            }
        };
    }

    throw new Error("Operación no válida");
};

module.exports = {
    handleAuth
};