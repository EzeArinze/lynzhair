"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Alert, AlertDescription } from "../ui/alert";
import { siginUpSchema } from "@/lib/Zschema";
import authenticationSignUp from "@/services/auth_actions/authenticationSignUp";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import ContinueWith from "./ContinueWith";
import { Label } from "../ui/label";
import SignUpSeccessful from "./SignUpSeccessful";

function UserSignup() {
  const [formDetails, setFormDetails] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const validation = siginUpSchema.safeParse(formDetails);

    if (!validation.success) {
      setError(validation.error.errors[0].message);
      setLoading(false);
      return;
    }

    const { username, email, password } = formDetails;

    try {
      await authenticationSignUp({ username, email, password });
      setIsSubmitted((prev) => !prev);
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
    <section className="flex min-h-screen flex-col">
      <div className="flex-1 py-10 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                Create Your Account
              </h1>
              <p className="text-gray-600 mt-2">
                Join Lynnhairz to access exclusive offers and track your orders
              </p>
            </div>

            {!isSubmitted ? (
              <div className="bg-white rounded-lg shadow-sm border p-8">
                <form onSubmit={handleSubmit}>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        name="username"
                        placeholder="Enter your username"
                        value={formDetails.username}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formDetails.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={formDetails.password}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        name="confirmPassword"
                        placeholder="Re-enter your password"
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

                  <Button
                    className="w-full bg-pink-600 hover:bg-pink-700 text-white mt-4"
                    disabled={loading}
                  >
                    {loading ? (
                      <Loader2
                        className="animate-spin w-5 h-5 mx-auto"
                        color="white"
                      />
                    ) : (
                      "Sign Up"
                    )}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link
                      href="/auth/sign-in"
                      className="text-pink-600 hover:underline font-medium"
                    >
                      Sign In
                    </Link>
                  </p>
                </div>
                <ContinueWith />
              </div>
            ) : (
              <SignUpSeccessful />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default UserSignup;
