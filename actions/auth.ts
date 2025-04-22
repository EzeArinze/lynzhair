import { authClient } from "@/lib/better-auth/authClient";
// import { useMemo } from "react";
import { toast } from "sonner";

export const useAuthentication = () => {
  const { data: session, isPending, error } = authClient.useSession();

  const userInitial = session?.user.email?.slice(0, 1).toUpperCase() ?? "N/A";
  const userEmail = session?.user.email ?? "N/A";

  async function signOut() {
    try {
      await authClient.signOut();
    } catch (error) {
      toast.error("An unexpected error occurred during sign-out");
      console.error("Error signing out user:", error);
    }
  }

  return { session, signOut, isPending, userInitial, userEmail, error };
};
