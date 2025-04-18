import { authClient } from "@/lib/better-auth/authClient";

export async function forgottenPassword(email: string) {
  try {
    await authClient.forgetPassword({
      email,
      redirectTo: "/auth/reset-password",
    });
  } catch (error) {
    console.log("Error sending password reset email:", error);
    throw new Error(
      "An unexpected error occurred while sending the password reset email. Please try again later."
    );
  }
}
