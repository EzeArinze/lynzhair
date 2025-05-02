import { authClient } from "@/lib/better-auth/authClient";
import { toast } from "sonner";

export const useAuthentication = () => {
  const { data: session, isPending, error } = authClient.useSession();

  const user = session?.user ?? null;
  const userInitial = session?.user.email?.slice(0, 1).toUpperCase() ?? "N/A";
  const userEmail = session?.user.email ?? "N/A";
  const isAdmin = session?.user.role === "admin";

  async function signOut() {
    try {
      await authClient.signOut();
      toast.success("Successfully signed out");
    } catch (error) {
      toast.error("An unexpected error occurred during sign-out");
      console.error("Error signing out user:", error);
    }
  }

  return {
    session,
    signOut,
    isPending,
    userInitial,
    userEmail,
    error,
    user,
    isAdmin,
  };
};
