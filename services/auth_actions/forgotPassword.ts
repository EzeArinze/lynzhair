import { authClient } from "@/lib/better-auth/authClient";
import { toast } from "sonner";

export async function forgottenPassword(email: string) {
  try {
    await authClient.forgetPassword(
      {
        email,
        redirectTo: "/auth/reset-password",
      },
      {
        onError: (ctx) => {
          toast.error(
            ctx.error.message ||
              "Failed.. Please Check Email provided. and try again."
          );
          throw new Error(
            ctx.error.message ||
              "Failed.. Please Check Email provided. and try again."
          );
        },
      }
    );
  } catch (error) {
    console.log("Error sending password reset email:", error);
    throw error;
  }
}
