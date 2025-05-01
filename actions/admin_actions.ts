import { authClient } from "@/lib/better-auth/authClient";
import { toast } from "sonner";

//Update user role action
export const updateUserRole = async (id: string, newRole: string = "admin") => {
  try {
    await authClient.admin.setRole(
      {
        userId: id,
        role: newRole,
      },
      {
        onSuccess: (ctx) => {
          toast.success(
            `User role updated successfully to: ${ctx.data?.user.role}`
          );
        },
      }
    );
  } catch (error) {
    toast.error(
      "Failed to update user role: " +
        (error instanceof Error ? error.message : "Unknown error")
    );
  }
};

//Delete User Action
export const deleteUser = async (id: string) => {
  try {
    await authClient.admin.removeUser(
      {
        userId: id,
      },
      {
        onSuccess: () => {
          toast.success(`User deleted successfully!`);
        },
      }
    );
  } catch (error) {
    toast.error(
      "Failed to delete user: " +
        (error instanceof Error ? error.message : "Unknown error")
    );
  }
};

// Ban user action
export const banUser = async (id: string) => {
  try {
    await authClient.admin.banUser(
      {
        userId: id,
        banReason: "Spamming", // Optional (if not provided, the default ban reason will be used - No reason)
        banExpiresIn: 60 * 60 * 24 * 7, // Optional (if not provided, the ban will never expire)
      },
      {
        onSuccess: () => {
          toast.success(`User banned successfully`);
        },
      }
    );
  } catch (error) {
    toast.error(
      "Failed to ban user: " +
        (error instanceof Error ? error.message : "Unknown error")
    );
  }
};

//Unban User Action
export const unBanUser = async (id: string) => {
  try {
    await authClient.admin.unbanUser(
      {
        userId: id,
      },
      {
        onSuccess: () => {
          toast.success(`User Unbanned successfully!`);
        },
      }
    );
  } catch (error) {
    toast.error(
      "Failed to unBanUser: " +
        (error instanceof Error ? error.message : "Unknown error")
    );
  }
};
