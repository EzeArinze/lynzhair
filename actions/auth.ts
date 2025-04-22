import { authClient } from "@/lib/better-auth/authClient";
import { useMemo } from "react";
import { toast } from "sonner";

export const useAuthentication = () => {
  const { data: session, isPending } = authClient.useSession();

  const userInitial = useMemo(
    () => session?.user.email.slice(0, 2).toUpperCase() || "N/A",
    [session]
  );

  const userEmail = useMemo(() => session?.user.email || "N/A", [session]);

  async function SignOut() {
    try {
      await authClient.signOut();
    } catch (error) {
      toast.error("An unexpected error occurred during sign-out");
      console.error("Error signing out user:", error);
    }
  }

  return { session, SignOut, isPending, userInitial, userEmail };
};
