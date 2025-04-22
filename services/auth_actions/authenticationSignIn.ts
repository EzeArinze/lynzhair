import { authClient } from "@/lib/better-auth/authClient";
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
        callbackURL: "/",
      },
      {
        onError: (ctx) => {
          // Handle the error
          if (ctx.error.status === 401) {
            toast.error("Sign In Failed: Invalid credentials");
          } else {
            toast.error("Sign In Failed: " + ctx.error.message);
          }
        },
        onSuccess: (ctx) => {
          toast.success(`${ctx.data?.user.email} signed in successfully`);
          // window.location.href = "/";
        },
      }
    );

    return console.log("User signed in successfully");
  } catch (error) {
    console.error("Error signing in user:", error);
    toast.error("An unexpected error occurred during sign-in");
  }
}
