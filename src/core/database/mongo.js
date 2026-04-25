import mongoose from 'mongoose';
import { env } from '../config/env.js';

export const connectMongo = async () => {
  mongoose.set('strictQuery', true);
  await mongoose.connect(env.mongoUri);
};

export const disconnectMongo = async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
};
