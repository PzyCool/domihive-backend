import dotenv from 'dotenv';

dotenv.config();

const toNumber = (value, fallback) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: toNumber(process.env.PORT, 4000),
  mongoUri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/domihive',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET || 'change_me_access',
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || 'change_me_refresh',
  jwtAccessTtl: process.env.JWT_ACCESS_TTL || '15m',
  jwtRefreshTtl: process.env.JWT_REFRESH_TTL || '30d'
};
