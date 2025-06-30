import { Player } from '@otilos/common-game-logic/Player';
import fastify from 'fastify';

const server = fastify();

server.get('/ping', async (request, reply) => {
  const player = new Player('Alice', 'red');
  console.log({ request, reply });
  return `Player ${player.username} joined the game!`;
});

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
