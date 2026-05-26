import { Server } from './file-pokemon-showdown';

const port = process.env.PORT || 3000;

Server.listen(port);

console.log("Pokémon Showdown running on port " + port);
