import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MONGO_URI } from "../constant/env";
import { admin } from "better-auth/plugins";
import { sendEmail } from "@/actions/sendEmail";

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
      maxAge: 5 * 60, // Cache duration in seconds
    },
  },
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url, token }) => {
      await sendEmail({
        to: user.email,
        subject: "Reset your password",
        text: `Click the link to reset your password: ${url}`,
      });
      console.log(token);
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }) => {
      await sendEmail({
        to: user.email,
        subject: "Verify your email address",
        text: `Click the link to verify your email: ${url}`,
      });
      console.log(token);
    },
  },
  plugins: [
    admin({
      defaultRole: "user",
    }),
  ],
});
