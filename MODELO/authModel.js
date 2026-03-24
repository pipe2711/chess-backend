const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "./data/users.json");

const readUsers = () => {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, "[]", "utf8");
    }

    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data || "[]");
};

const saveUsers = (users) => {
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2), "utf8");
};

const findUserByEmail = (email) => {
    const users = readUsers();
    return users.find(user => user.email === email);
};

const findUserByUsername = (username) => {
    const users = readUsers();
    return users.find(user => user.username === username);
};

const findUserByEmailOrUsernameAndPassword = (user, password) => {
    const users = readUsers();
    return users.find(
        item =>
            (item.email === user || item.username === user) &&
            item.password === password
    );
};

const createUser = ({ email, username, password }) => {
    const users = readUsers();

    const newUser = {
        userId: Date.now().toString(),
        email,
        username,
        password,
        elo: 0,
        wins: 0,
        losses: 0,
        draws: 0,
        matches: []
    };

    users.push(newUser);
    saveUsers(users);

    return newUser;
};

module.exports = {
    findUserByEmail,
    findUserByUsername,
    findUserByEmailOrUsernameAndPassword,
    createUser
};