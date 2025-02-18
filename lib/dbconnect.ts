import mongoose from "mongoose";

// const MONGODB_URI = process.env.MONGO_URI || "";

// if (!MONGODB_URI) {
//   throw new Error(
//     "Please define the MONGO_DB_CONNECTION environment variable."
//   );
// }

// interface MongooseCache {
//   conn: typeof mongoose | null;
//   promise: Promise<typeof mongoose> | null;
// }

// const globalWithMongoose = global as typeof global & {
//   mongoose: MongooseCache;
// };

// const cached: MongooseCache = globalWithMongoose.mongoose || {
//   conn: null,
//   promise: null,
// };

// async function dbConnect() {
//   if (cached.conn) {
//     return cached.conn;
//   }

//   if (!cached.promise) {
//     cached.promise = mongoose
//       .connect(MONGODB_URI, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       } as mongoose.ConnectOptions)
//       .then((mongoose) => mongoose);
//   }

//   cached.conn = await cached.promise;
//   return cached.conn;
// }

// export default dbConnect;

// simpler version with no caching

const MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URI as string;
// console.log("MONGODB_URI", MONGODB_URI);

async function connectDB() {
  if (!MONGODB_URI) {
    throw new Error("❌ MONGODB_URI is not defined in environment variables.");
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
    if (!MONGODB_URI) {
      throw new Error("❌ MONGO_URI is not defined in environment variables.");
    }
    cached.promise = mongoose.connect(MONGODB_URI);
  }

  cached.conn = await cached.promise;
  console.log("✅ MongoDB connected.");
  return cached.conn;
}

export default connectDB;
