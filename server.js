const path = require("path");
const { fork } = require("child_process");
const express = require("express");
const api = require("./api");

const app = express();

// -----------------------------
// 🔥 1) CORS GLOBAL
// -----------------------------
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
});

// -----------------------------
// 🔥 2) Servir les fichiers statiques de Showdown
// -----------------------------
app.use(express.static(path.join(__dirname, "pokemon-showdown")));

// -----------------------------
// 🔥 3) Monter ton API Express sur /api
// -----------------------------
app.use("/api", api);

// -----------------------------
// 🔥 4) Lancer Express (port Railway)
// -----------------------------
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Express + CORS running on port " + port);
});

// -----------------------------
// 🔥 5) Lancer Showdown en interne
// -----------------------------
const showdownPort = 8000; // port interne, non exposé

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

console.log("Pokémon Showdown internal server on port " + showdownPort);
