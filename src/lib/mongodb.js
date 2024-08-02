import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI; // Ensure this is set in your .env.local

if (!MONGO_URI) {
  throw new Error('Please define the MONGO_URI environment variable inside .env.local');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    console.log('Using cached database connection');
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI, {
      // Deprecated options removed
    }).then((mongoose) => {
      console.log('Connected to MongoDB');
      return mongoose;
    }).catch((error) => {
      console.error('Error connecting to MongoDB:', error);
      throw new Error('Error connecting to MongoDB');
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
