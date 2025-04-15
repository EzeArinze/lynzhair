import { authClient } from "@/lib/better-auth/authClient";
import { toast } from "sonner";

interface AuthenticationSignIn {
  email: string;
  password: string;
}

export default async function authenticationSignIn({
  email,
  password,
}: AuthenticationSignIn) {
  try {
    if (!email || !password) return;

    const { data, error } = await authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onRequest(ctx) {
          console.log("Sign-in request made: ", ctx);
        },
        onError: (ctx) => {
          // Handle the error
          if (ctx.error.status === 401) {
            toast.error("Sign In Failed: Invalid credentials");
          } else {
            toast.error("Sign In Failed: " + ctx.error.message);
          }
        },
        onSuccess: (ctx) => {
          toast.success(
            `User with email ${data?.user.email} signed in successfully`
          );
          console.log("Sign-in successful: ", ctx || error?.message);
        },
      }
    );

    return console.log("User signed in successfully");
  } catch (error) {
    console.error("Error signing in user:", error);
    toast.error("An unexpected error occurred during sign-in");
  }
}
