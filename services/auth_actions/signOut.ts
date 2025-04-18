import { authClient } from "@/lib/better-auth/authClient";
import { toast } from "sonner";

export async function useSignOut() {
  try {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("User signed out successfully");
        },
      },
    });
  } catch (error) {
    toast.error("An unexpected error occurred during sign-out");
    console.error("Error signing out user:", error);
  }
}
