const authModel = require("../MODELO/authModel");

const registerUser = (data) => {
    const { email, username, password } = data;

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
};

const loginUser = (data) => {
    const { user, password } = data;

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
};

module.exports = {
    loginUser,
    registerUser
};