import { authClient } from "@/lib/better-auth/authClient";
import { toast } from "sonner";

export const useAuthentication = () => {
  const { data: session } = authClient.useSession();
  // const { data: activeSession } = await authClient.getSession()

  async function SignOut() {
    try {
      await authClient.signOut();
      toast.success("Successfully signed out");
    } catch (error) {
      toast.error("An unexpected error occurred during sign-out");
      console.error("Error signing out user:", error);
    }
  }

  return { session, SignOut };
};
