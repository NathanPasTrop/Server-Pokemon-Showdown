const { fork } = require("child_process");
const path = require("path");

const showdownPath = path.join(__dirname, "pokemon-showdown", "pokemon-showdown");

console.log("Launching Pokémon Showdown…");

const child = fork(showdownPath, ["start"], {
    cwd: path.join(__dirname, "pokemon-showdown"),
    env: { ...process.env, PORT: process.env.PORT || 8000 }
});

child.on("message", msg => console.log("[Showdown]", msg));
child.on("error", err => console.error("[Showdown ERROR]", err));
child.on("exit", code => console.log("[Showdown EXIT]", code));
