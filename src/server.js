import { buildApp } from './app.js';
import { env } from './core/config/env.js';
import { connectMongo, disconnectMongo } from './core/database/mongo.js';

const app = buildApp();
let server;

const start = async () => {
  await connectMongo();

  server = app.listen(env.port, () => {
    console.log(`domihive-backend listening on ${env.port}`);
  });
};

const shutdown = async (signal) => {
  console.log(`received ${signal}, shutting down`);
  if (server) {
    await new Promise((resolve) => server.close(resolve));
  }
  await disconnectMongo();
  process.exit(0);
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

start().catch((error) => {
  console.error('failed to start server', error);
  process.exit(1);
});
