window.GameConfigModel = {
    save(config) {
        localStorage.setItem("gameConfig", JSON.stringify(config));
    },

    get() {
        const saved = localStorage.getItem("gameConfig");
        return saved ? JSON.parse(saved) : null;
    }
};