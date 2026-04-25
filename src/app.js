import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { env } from './core/config/env.js';
import { registerApiRoutes } from './routes.js';
import { notFoundHandler } from './core/middlewares/notFound.js';
import { errorHandler } from './core/middlewares/errorHandler.js';

export const buildApp = () => {
  const app = express();

  app.use(
    cors({
      origin: env.corsOrigin,
      credentials: true
    })
  );
  app.use(express.json({ limit: '2mb' }));
  app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));

  app.get('/health', (_req, res) => {
    res.status(200).json({ ok: true, service: 'domihive-backend', env: env.nodeEnv });
  });

  registerApiRoutes(app);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};
