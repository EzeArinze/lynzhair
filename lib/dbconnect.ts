// import mongoose from "mongoose";
// import { MONGO_URI } from "./constant/env";

// async function connectDB() {
//   if (!MONGO_URI) {
//     throw new Error("❌ MONGO_URI is not defined in environment variables.");
//   }

//   interface MongooseCache {
//     conn: typeof mongoose | null;
//     promise: Promise<typeof mongoose> | null;
//   }

//   const globalWithMongoose = global as typeof global & {
//     mongoose: MongooseCache;
//   };

//   const cached: MongooseCache = globalWithMongoose.mongoose || {
//     conn: null,
//     promise: null,
//   };

//   if (cached.conn) return cached.conn;

//   if (!cached.promise) {
//     console.log("📡 Connecting to MongoDB...");
//     if (!MONGO_URI) {
//       throw new Error("❌ MONGO_URI is not defined in environment variables.");
//     }
//     cached.promise = mongoose.connect(MONGO_URI);
//   }

//   cached.conn = await cached.promise;
//   console.log("✅ MongoDB connected.");
//   return cached.conn;
// }

// export default connectDB;

import mongoose from "mongoose";
import { MONGO_URI } from "./constant/env";

async function connectDB(): Promise<typeof mongoose> {
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

  if (!globalWithMongoose.mongoose) {
    globalWithMongoose.mongoose = { conn: null, promise: null };
  }

  const cached: MongooseCache = globalWithMongoose.mongoose;

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    console.log("📡 Connecting to MongoDB...");
    try {
      cached.promise = mongoose.connect(MONGO_URI);
    } catch (error) {
      console.error("❌ Failed to connect to MongoDB:", error);
      throw error;
    }
  }

  cached.conn = await cached.promise;
  console.log("✅ MongoDB connected.");
  return cached.conn;
}

export default connectDB;
