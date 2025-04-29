import { authClient } from "@/lib/better-auth/authClient";
import { toast } from "sonner";

export const useAuthentication = () => {
  const { data: session, isPending, error } = authClient.useSession();

  const userInitial = session?.user.email?.slice(0, 1).toUpperCase() ?? "N/A";
  const userEmail = session?.user.email ?? "N/A";

  async function signOut() {
    try {
      await authClient.signOut();
      toast.success("Successfully signed out");
    } catch (error) {
      toast.error("An unexpected error occurred during sign-out");
      console.error("Error signing out user:", error);
    }
  }

  return { session, signOut, isPending, userInitial, userEmail, error };
};

/// This function is used to get the session on the server side
/// It is used in the server components and API routes
// export const useServerSession = async () => {
//   const session = await auth.api.getSession({
//     headers: await headers(),
//   });

//   const userInitial = session?.user.email?.slice(0, 1).toUpperCase() ?? "N/A";
//   const userEmail = session?.user.email ?? "N/A";

//   if (!session) {
//     return { session: null, userInitial, userEmail };
//   }

//   return { session, userInitial, userEmail };
// };
