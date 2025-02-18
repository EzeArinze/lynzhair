import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MONGO_URI } from "../constant/env";

// Use your MongoDB connection string from the environment variables
const client = new MongoClient(
  // process.env.NEXT_PUBLIC_MONGODB_URI || "mongodb://localhost:27017"
  MONGO_URI
);

// Connect the client and get the database instance
await client.connect();
const db = client.db(process.env.NEXT_PUBLIC_MONGODB_NAME || "better-auth-db");

export const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true,
    // requireEmailVerification: true,
  },
});
