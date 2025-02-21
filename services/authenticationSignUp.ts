import axios from "axios";

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
    const { data } = await axios.post("/api/signup", {
      username,
      password,
      email,
    });

    return data;
  } catch (error) {
    console.error("Error signing up user:", error);
  }
}
