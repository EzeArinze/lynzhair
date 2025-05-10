"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { sendVerificationEmail } from "@/lib/better-auth/authClient";
import VerifySuccessful from "./VerifySuccessful";

export default function ResendVerification() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState<string>("");

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    if (!email && email.trim()) {
      toast.error("Email is required.");
      return;
    }

    try {
      await sendVerificationEmail({
        email,
        callbackURL: "/",
        fetchOptions: {
          onRequest: () => {
            setIsLoading(true);
          },
          onError: (ctx) => {
            setIsLoading(false);
            toast.error(ctx.error.message);
          },
          onSuccess(context) {
            toast.success(
              "Verification link has been sent to: ",
              context?.data.email
            );
            setIsSubmitted(true);
          },
        },
      });
    } catch (error) {
      console.error("Error Re-sending verification link:", error);
      throw new Error("Error Re-sending verification link: Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex flex-col">
      <div className="flex-1 py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-lg shadow-sm border p-8">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* New Password Field */}
                  <div className="space-y-2">
                    <Label htmlFor="password">New Password</Label>
                    <div className="relative">
                      <Input
                        id="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="pr-10"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full bg-pink-600 hover:bg-pink-700 text-white"
                    disabled={isLoading}
                  >
                    {isLoading
                      ? "Sending verification link..."
                      : "Send verification link"}
                  </Button>
                </form>
              ) : (
                <VerifySuccessful />
              )}
            </div>

            {/* Additional Help */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500">
                Need help?{" "}
                <Link
                  href="/commerce/contact"
                  className="text-pink-600 hover:underline"
                >
                  Contact Support
                </Link>
              </p>
              <p className="text-sm text-gray-500">
                Go to Sign-Up{" "}
                <Link
                  href="/auth/sign-up"
                  className="text-pink-600 hover:underline"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
