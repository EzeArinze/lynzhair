import { authClient } from "@/lib/better-auth/authClient";
// import { BETTER_AUTH_URL } from "@/lib/constant/env";
import { toast } from "sonner";
// import axios from "axios";

interface AuthenticationDetails {
  username: string;
  password: string;
  email: string;
}

// export default async function authenticationSignUp({
//   username,
//   password,
//   email,
// }: AuthenticationDetails) {
//   try {
//     if (!username || !password || !email) return;

//     await authClient.signUp.email(
//       {
//         email,
//         password,
//         name: username,
//         callbackURL: `/`,
//       },
//       {
//         onError: (ctx) => {
//           // Handle the error
//           if (ctx.error.status === 401) {
//             toast.error("Sign Up Failed: Invalid credentials");
//           } else {
//             toast.error("Sign Up Failed: " + ctx.error.message);
//           }
//         },
//         onSuccess: (ctx) => {
//           // Use ctx.data instead of data
//           toast.success(
//             `Verification link has been sent to ${ctx.data?.user.email} click to verify and login`
//           );
//           // window.location.href = "/auth/signin";
//         },
//       }
//     );
//   } catch (error) {
//     console.error("Error signing up user:", error);
//     toast.error("An unexpected error occurred during sign-up");
//   }
// }

export default async function authenticationSignUp({
  username,
  password,
  email,
}: AuthenticationDetails) {
  try {
    if (!username || !password || !email) {
      throw new Error("All fields are required");
    }

    await authClient.signUp.email(
      {
        email,
        password,
        name: username,
        callbackURL: `/`,
      },
      {
        onError: (ctx) => {
          throw new Error(ctx.error.message);
        },
        onSuccess: (ctx) => {
          toast.success(
            `Verification link has been sent to ${ctx.data?.user.email}. Click to verify and login.`
          );
        },
      }
    );
  } catch (error) {
    toast.error(
      `Sign Up Failed: ${error instanceof Error ? error.message : "An unexpected error occurred"}`
    );
    throw error; // Re-throw to handle in component
  }
}
