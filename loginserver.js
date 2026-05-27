/**
 * Pokémon Showdown Login Server
 * Open-source under the MIT license
 */

'use strict';

const http = require('http');
const url = require('url');
const crypto = require('crypto');

const PORT = process.env.PORT || 8000;

function generateAssertion(userid) {
    const token = crypto.randomBytes(16).toString('hex');
    return `${userid}|${token}`;
}

const server = http.createServer((req, res) => {
    const parsed = url.parse(req.url, true);

    // /action.php
    if (parsed.pathname === '/action.php') {
        const act = parsed.query.act;

        // 1) LOGIN REQUEST
        if (act === 'login') {
            const userid = parsed.query.name;
            const assertion = generateAssertion(userid);

            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end(assertion);
            return;
        }

        // 2) LOGOUT REQUEST
        if (act === 'logout') {
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('OK');
            return;
        }

        // 3) DEFAULT
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.end('Invalid action');
        return;
    }

    // DEFAULT ROUTE
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Pokémon Showdown Login Server');
});

server.listen(PORT, () => {
    console.log(`Login server running on port ${PORT}`);
});
