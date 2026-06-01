const path = require("path");
const { fork } = require("child_process");
const express = require("express");

const api = require("./api");

// -----------------------------
// 1) Lancer Showdown comme serveur principal
// -----------------------------
const showdownPort = process.env.PORT || 3000;

const serverPath = path.join(
    __dirname,
    "pokemon-showdown",
    "dist",
    "server",
    "index.js"
);

const child = fork(serverPath, [], {
    env: { ...process.env, PORT: showdownPort }
});

child.on("message", msg => console.log("[Showdown]", msg));
child.on("error", err => console.error("[Showdown ERROR]", err));
child.on("exit", code => console.log("[Showdown EXIT]", code));

console.log("Pokémon Showdown public server on port " + showdownPort);

// -----------------------------
// 2) Lancer Express sur un port interne
// -----------------------------
const apiPort = 4000;

const app = express();

// CORS pour ton API
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === "OPTIONS") return res.sendStatus(200);
    next();
});

app.use("/api", api);

app.listen(apiPort, () => {
    console.log("Internal API running on port " + apiPort);
});

app.use("/", express.static(path.join(__dirname, "pokemon-showdown", "client")));