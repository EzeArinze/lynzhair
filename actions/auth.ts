import { authClient } from "@/lib/better-auth/authClient";
import { toast } from "sonner";

const ALLOWED_REDIRECT_PATHS = ["/auth/sign-in", "/"];

export const useAuthentication = () => {
  const { data: session, isPending, error } = authClient.useSession();

  const user = session?.user ?? null;
  const userInitial = session?.user.email?.slice(0, 1).toUpperCase() ?? "N/A";
  const userEmail = session?.user.email ?? "N/A";
  const isAdmin = session?.user.role === "admin";

  async function signOut(redirectUrl?: string) {
    try {
      if (redirectUrl) {
        // Check if URL starts with / and is in allowed paths
        if (
          !redirectUrl.startsWith("/") ||
          !ALLOWED_REDIRECT_PATHS.includes(redirectUrl)
        ) {
          throw new Error("Invalid redirect URL");
        }
      }

      await authClient.signOut({
        fetchOptions: {
          onSuccess() {
            if (redirectUrl) {
              window.location.href = redirectUrl;
            }
            toast.success("Successfully Signed Out");
          },
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
        },
      });
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
