import mongoose from 'mongoose';
import log from '../config/winston';

// MongoDB Connection
export default async function connectWithRetry(mongoUrl) {
  try {
    await mongoose.connect(mongoUrl);
    log.info('🎉 🪅 MongoDB is connected 🪅  🎉');
  } catch (error) {
    log.error(`🥀 Failed to connect to MongoDB 🥀: ${error.message}`);
    log.error('Retrying in 20 seconds.'); // Retry connection after 20 minutes
    setTimeout(() => connectWithRetry(mongoUrl), 20000);
  }
}