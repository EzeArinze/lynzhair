import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  MONGO_URI,
} from "../constant/env";
import { admin } from "better-auth/plugins";
import { sendEmail } from "@/actions/sendEmail";
import { nextCookies } from "better-auth/next-js";

if (!MONGO_URI) {
  throw new Error("MONGO_URI is not defined in the environment variables.");
}

const client = new MongoClient(MONGO_URI);

await client.connect();
const db = client.db(process.env.NEXT_PUBLIC_MONGODB_NAME || "better-auth-db");

export const auth = betterAuth({
  database: mongodbAdapter(db),

  session: {
    cookieCache: {
      enabled: true,
      maxAge: 8 * 60 * 60, // Cache duration in seconds
    },
    expiresIn: 3 * 24 * 60 * 60, // expires in three days
  },
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Reset your password",
        text: `Click the link below to complete reset your password`,
        url,
      });
    },
  },

  socialProviders: {
    google: {
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    },
  },

  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    expiresIn: 60 * 60,
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Verify your email address",
        text: `Please verify your email address to complete registration`,
        url,
      });
    },
  },

  plugins: [
    admin({
      defaultRole: "user",
    }),
    nextCookies(),
  ],
});
