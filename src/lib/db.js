import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGODB_URI;
// console.log(MONGO_URI)

if (!MONGO_URI) {
  throw new Error('Please define the MONGO_URI environment variable inside .env.local');
}

let cachedClient = global.mongoose;

if (!cachedClient) {
  cachedClient = global.mongoose = { conn: null, promise: null };
}

async function connectMongoDB() {
  if (cachedClient.conn) {
    return cachedClient.conn;
  }

  if (!cachedClient.promise) {

    cachedClient.promise = mongoose.connect(MONGO_URI).then((mongoose) => {
      return mongoose;
    });
  }

  cachedClient.conn = await cachedClient.promise;
  return cachedClient.conn;
}

export default connectMongoDB;
