import mongoose from "mongoose";
import { MONGO_URI } from "./constant/env";

async function connectDB() {
  if (!MONGO_URI) {
    throw new Error("❌ MONGO_URI is not defined in environment variables.");
  }

  interface MongooseCache {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  }

  const globalWithMongoose = global as typeof global & {
    mongoose: MongooseCache;
  };

  const cached: MongooseCache = globalWithMongoose.mongoose || {
    conn: null,
    promise: null,
  };

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    console.log("📡 Connecting to MongoDB...");
    if (!MONGO_URI) {
      throw new Error("❌ MONGO_URI is not defined in environment variables.");
    }
    cached.promise = mongoose.connect(MONGO_URI);
  }

  cached.conn = await cached.promise;
  console.log("✅ MongoDB connected.");
  return cached.conn;
}

export default connectDB;
