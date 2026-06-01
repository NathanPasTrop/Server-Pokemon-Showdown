const { fork } = require("child_process");
const path = require("path");

const showdownPath = path.join(__dirname, "pokemon-showdown", "dist", "server", "index.cjs");

console.log("Launching Pokémon Showdown…");

const child = fork(showdownPath, [], {
    cwd: path.join(__dirname, "pokemon-showdown"),
    env: { ...process.env, PORT: process.env.PORT || 8000 }
});
