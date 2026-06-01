// api.js
const express = require("express");
const app = express();

app.use(express.json());

// Exemple: ping
app.get("/api/status", (req, res) => {
    res.json({ ok: true, server: "showdown" });
});

// Exemple: endpoint custom
app.post("/api/example", (req, res) => {
    const { user, message } = req.body;
    res.json({
        received: true,
        user,
        message,
        timestamp: Date.now(),
    });
});

module.exports = app;