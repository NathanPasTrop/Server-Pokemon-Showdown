const path = require("path");
const { fork } = require("child_process");

const port = process.env.PORT || 3000;

// Chemin vers le serveur compilé
const serverPath = path.join(__dirname, "pokemon-showdown", "dist", "server", "index.js");

// Lancer Showdown comme un sous-processus
const child = fork(serverPath, [], {
    env: { ...process.env, PORT: port }
});

child.on("message", msg => console.log("[Showdown]", msg));
child.on("error", err => console.error("[Showdown ERROR]", err));
child.on("exit", code => console.log("[Showdown EXIT]", code));

console.log("Pokémon Showdown starting on port " + port);
