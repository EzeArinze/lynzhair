import { authClient } from "@/lib/better-auth/authClient";
// import { BETTER_AUTH_URL } from "@/lib/constant/env";
import { toast } from "sonner";

interface AuthenticationSignIn {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export default async function authenticationSignIn({
  email,
  password,
  rememberMe,
}: AuthenticationSignIn) {
  try {
    if (!email || !password) return;

    await authClient.signIn.email(
      {
        email,
        password,
        rememberMe,
        callbackURL: `/`,
      },
      {
        onError: (ctx) => {
          toast.error(ctx.error.message || "Please verify your account!");
        },
        onSuccess: (ctx) => {
          toast.success(`${ctx.data?.user.email} signed in successfully`);
        },
      }
    );

    return console.log("User signed in successfully");
  } catch (error) {
    console.error("Error signing in user:", error);
    toast.error("An unexpected error occurred during sign-in");
  }
}

export const signInWithGoogle = async () => {
  try {
    await authClient.signIn.social(
      {
        provider: "google",
      },
      {
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      }
    );
  } catch (error) {
    console.error("Error signing in with Google:", error);
    toast.error("An unexpected error occurred during sign-in");
  }
};
