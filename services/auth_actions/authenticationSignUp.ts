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

    const { data, error } = await authClient.signUp.email(
      {
        email,
        password,
        name: username,
      },
      {
        onRequest(ctx) {
          console.log("Request made" + ctx);
        },
        onError: (ctx) => {
          // Handle the error
          if (ctx.error.status === 403) {
            toast.error("Sign Up Failed, " + error?.message);
          }
        },
        onSuccess: (ctx) => {
          toast.success(
            `User with email ${data?.user.email} singed up successfully`
          );
          console.log(ctx);
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
  }
}
