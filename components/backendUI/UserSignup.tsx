"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Alert, AlertDescription } from "../ui/alert";
import { schema } from "@/lib/Zschema";

import authenticationSignUp from "@/services/authenticationSignUp";

function UserSignup() {
  const [formDetails, setFormDetails] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const validation = schema.safeParse(formDetails);

    if (!validation.success) {
      setError(validation.error.errors[0].message);
      return;
    }

    const { username, email, password } = formDetails;

    try {
      setLoading(true);
      await authenticationSignUp({ username, email, password });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    } finally {
      setLoading(false);
    }

    setFormDetails({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="mx-auto sm:w-2/3 p-4 space-y-4 w-full">
      <h1 className="p-2 mx-auto font-semibold text-xl text-center">
        Create Admin User
      </h1>
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Create Admin Account</CardTitle>
          <CardDescription>
            Enter your details to create a new admin account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="username">Username</label>
                <Input
                  id="username"
                  name="username"
                  value={formDetails.username}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="email">Email</label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={formDetails.email}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="password">Password</label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  value={formDetails.password}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="confirm-password">Confirm Password</label>
                <Input
                  id="confirm-password"
                  type="password"
                  name="confirmPassword"
                  value={formDetails.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>
            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button className="w-full mt-4">
              {loading ? "Creating..." : "Create Admin"}
            </Button>
          </form>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}

export default UserSignup;
