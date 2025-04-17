"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", { email });
    setIsSubmitted(true);
  };

  return (
    <section className="flex min-h-screen flex-col">
      <div className="flex-1 py-10 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            <Link
              href="/auth/signin"
              className="inline-flex items-center text-sm font-medium text-pink-600 mb-6 hover:underline"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to sign in
            </Link>

            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                Reset Your Password
              </h1>
              <p className="text-gray-600 mt-2">
                Enter your email address and we&apos;ll send you a link to reset
                your password
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-8">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full bg-pink-600 hover:bg-pink-700 text-white"
                  >
                    Send Reset Link
                  </Button>
                </form>
              ) : (
                <div className="text-center py-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Check Your Email
                  </h3>
                  <p className="text-gray-600 mb-6">
                    We&apos;ve sent a password reset link to{" "}
                    <span className="font-medium">{email}</span>
                  </p>
                  <div className="space-y-4">
                    <Button
                      onClick={() => setIsSubmitted(false)}
                      variant="outline"
                      className="w-full"
                    >
                      Resend Email
                    </Button>
                    <Button
                      asChild
                      className="w-full bg-pink-600 hover:bg-pink-700 text-white"
                    >
                      <Link href="/auth/signin">Return to Sign In</Link>
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Additional Help */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500">
                Need help?{" "}
                <Link href="/contact" className="text-pink-600 hover:underline">
                  Contact Support
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
