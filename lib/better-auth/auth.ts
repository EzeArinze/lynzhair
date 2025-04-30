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
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Reset your password",
        text: `Click the link to reset your password`,
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
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Verify your email address",
        text: `Click the link to verify your email`,
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
