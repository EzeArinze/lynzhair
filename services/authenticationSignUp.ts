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
    const response = await fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify({ username, password, email }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to sign up user");
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}
