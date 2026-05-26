const path = require("path");
const { fork } = require("child_process");
const api = require("./api");

const port = process.env.PORT || 3000;

// 1) Lancer Showdown
const serverPath = path.join(__dirname, "pokemon-showdown", "dist", "server", "index.js");

const child = fork(serverPath, [], {
    env: { ...process.env, PORT: port }
});

child.on("message", msg => console.log("[Showdown]", msg));
child.on("error", err => console.error("[Showdown ERROR]", err));
child.on("exit", code => console.log("[Showdown EXIT]", code));

console.log("Pokémon Showdown starting on port " + port);

// 2) Lancer l’API Express (sur un autre port)
const apiPort = process.env.API_PORT || 4000;
api.listen(apiPort, () => {
    console.log("API Express running on port " + apiPort);
});
