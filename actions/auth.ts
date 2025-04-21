import { authClient } from "@/lib/better-auth/authClient";
import { toast } from "sonner";

export const useAuthentication = () => {
  const { data: session, isPending } = authClient.useSession();

  async function SignOut() {
    try {
      await authClient.signOut();
    } catch (error) {
      toast.error("An unexpected error occurred during sign-out");
      console.error("Error signing out user:", error);
    }
  }

  return { session, SignOut, isPending };
};
