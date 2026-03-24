function formatTimer(timeCode) {
    if (timeCode === "bullet") return "01:00";
    if (timeCode === "blitz") return "05:00";
    if (timeCode === "rapid") return "10:00";
    if (timeCode === "classic") return "30:00";
    if (timeCode === "daily") return "24:00";
    return "05:00";
}

function getOpponentData(mode) {
    if (mode === "machine") {
        return {
            avatar: "IA",
            name: "Máquina",
            elo: ""
        };
    }

    if (mode === "player") {
        return {
            avatar: "JV",
            name: "Jugador",
            elo: ""
        };
    }

    return {
        avatar: "RV",
        name: "Rival",
        elo: ""
    };
}

window.startGameFromMenu = function () {
    const selectedMode = document.querySelector(".mode-card.selected");
    const selectedTime = document.querySelector(".time-chip.sel");

    const mode = selectedMode ? selectedMode.dataset.mode : "machine";
    const modeLabel = selectedMode ? selectedMode.dataset.label : "Máquina";
    const timeCode = selectedTime ? selectedTime.dataset.time : "blitz";
    const timeLabel = selectedTime ? selectedTime.dataset.label : "Blitz · 5 min";

    window.GameConfigModel.save({
        mode,
        modeLabel,
        timeCode,
        timeLabel
    });

    window.location.href = "game.html";
};

window.loadGameScreen = function () {
    const config = window.GameConfigModel.get();
    const savedUser = localStorage.getItem("user");

    const opponentAvatar = document.getElementById("game-opponent-avatar");
    const opponentName = document.getElementById("game-opponent-name");
    const opponentElo = document.getElementById("game-opponent-elo");
    const gameTimeLabel = document.getElementById("game-time-label");
    const topTimer = document.getElementById("game-opponent-timer");
    const bottomTimer = document.getElementById("game-user-timer");

    const gameUserName = document.getElementById("game-user-name");
    const gameUserElo = document.getElementById("game-user-elo");
    const gameUserAvatar = document.getElementById("game-user-avatar");

    if (savedUser) {
        const user = JSON.parse(savedUser);

        if (gameUserName) {
            gameUserName.textContent = user.username || "";
        }

        if (gameUserElo) {
            gameUserElo.textContent = user.elo && user.elo > 0 ? `★ ELO ${user.elo}` : "";
        }

        if (gameUserAvatar && user.username) {
            gameUserAvatar.textContent = user.username.substring(0, 2).toUpperCase();
        }
    }

    if (!config) return;

    const opponent = getOpponentData(config.mode);
    const timerText = formatTimer(config.timeCode);

    if (opponentAvatar) {
        opponentAvatar.textContent = opponent.avatar;
    }

    if (opponentName) {
        opponentName.textContent = opponent.name;
    }

    if (opponentElo) {
        opponentElo.textContent = opponent.elo;
    }

    if (gameTimeLabel) {
        gameTimeLabel.textContent = `♟ ${config.timeLabel}`;
    }

    if (topTimer) {
        topTimer.textContent = timerText;
    }

    if (bottomTimer) {
        bottomTimer.textContent = timerText;
    }
};