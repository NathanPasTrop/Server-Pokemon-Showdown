/**
 * Pokémon Showdown Server - Railway compatible
 */

'use strict';

const path = require('path');

// 1) Charger le moteur Showdown
require('./pokemon-showdown/lib/fs').FS = require('./pokemon-showdown/lib/fs').FS;
require('./pokemon-showdown/lib/process-manager');
require('./pokemon-showdown/lib/repl');

global.Config = require('./pokemon-showdown/config/config');
global.Monitor = require('./pokemon-showdown/lib/monitor');
global.Dex = require('./pokemon-showdown/sim/dex').Dex;
global.LoginServer = require('./pokemon-showdown/lib/loginserver');
global.Users = require('./pokemon-showdown/users');
global.Rooms = require('./pokemon-showdown/rooms');
global.Chat = require('./pokemon-showdown/chat');
global.Ladders = require('./pokemon-showdown/ladders');
global.Tournaments = require('./pokemon-showdown/tournaments');

// 2) Démarrer le serveur HTTP + WebSocket Showdown
const Server = require('./pokemon-showdown/server');

const PORT = process.env.PORT || Config.port || 8001;
const HOST = Config.bindaddress || '0.0.0.0';

Server.listen(PORT, HOST, () => {
    console.log(`🔥 Showdown server running on ${HOST}:${PORT}`);
});
