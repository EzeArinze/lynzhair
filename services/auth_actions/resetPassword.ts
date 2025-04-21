import { authClient } from "@/lib/better-auth/authClient";
import { toast } from "sonner";

export async function passwordReset(password: string) {
  const token = new URLSearchParams(window.location.search).get("token");

  try {
    if (!token) {
      // Handle the error
      console.error("Token not found in the URL");
      return;
    }

    await authClient.resetPassword(
      {
        newPassword: password,
        token,
      },
      {
        onSuccess: () => {
          toast.success("Password reset successfully. You can now sign in.");
          window.location.href = "/auth/signin";
        },
        onError: () => {
          toast.error("Password reset failed. Please try again.");
          throw new Error("Password reset failed. Please try again.");
        },
      }
    );
  } catch (error) {
    console.log("Error resetting password:", error);
    throw new Error(
      "An unexpected error occurred while resetting the password. Please try again later."
    );
  }
}
