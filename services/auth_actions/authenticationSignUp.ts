import { authClient } from "@/lib/better-auth/authClient";
import { toast } from "sonner";
// import axios from "axios";

interface AuthenticationDetails {
  username: string;
  password: string;
  email: string;
}

export default async function authenticationSignUp({
  username,
  password,
  email,
}: AuthenticationDetails) {
  try {
    if (!username || !password || !email) return;

    await authClient.signUp.email(
      {
        email,
        password,
        name: username,
      },
      {
        onRequest(ctx) {
          console.log("Request made: ", ctx);
        },
        onError: (ctx) => {
          // Handle the error
          if (ctx.error.status === 401) {
            toast.error("Sign Up Failed: Invalid credentials");
          } else {
            toast.error("Sign Up Failed: " + ctx.error.message);
          }
        },
        onSuccess: (ctx) => {
          // Use ctx.data instead of data
          toast.success(
            `User with email ${ctx.data?.user.email} signed up successfully`
          );
          console.log("Sign-up successful: ", ctx.data);
        },
      }
    );

    // const { data: axiosData } = await axios.post("/api/signup", {
    //   username: data?.user.name,
    //   password,
    //   email: data?.user.email,
    // });

    // return axiosData;
    return console.log("User signed up successfully");
  } catch (error) {
    console.error("Error signing up user:", error);
    toast.error("An unexpected error occurred during sign-up");
  }
}
