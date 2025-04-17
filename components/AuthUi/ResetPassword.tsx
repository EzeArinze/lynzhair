"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PasswordStrength from "./PasswordStrength";
import { getPasswordStrength } from "@/utils/getPasswordStrength";
import ResetSuccessful from "./ResetSuccessful";

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Password strength criteria
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const passwordsMatch = password === passwordConfirm && password !== "";

  const passwordStrength = getPasswordStrength(
    hasLowercase,
    hasUppercase,
    hasNumber,
    hasMinLength
  );

  const strengthText = ["Very Weak", "Weak", "Good", "Strong"];
  const strengthColor = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-blue-500",
    "bg-green-500",
  ];

  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", { password });
    setIsSubmitted(true);
  };

  return (
    <section className="flex min-h-screen flex-col">
      <div className="flex-1 py-10 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                Reset Your Password
              </h1>
              <p className="text-gray-600 mt-2">
                Create a new password for your account
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-8">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* New Password Field */}
                  <div className="space-y-2">
                    <Label htmlFor="password">New Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter new password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>

                    {/* Password Strength Indicator */}
                    {password && (
                      <PasswordStrength
                        hasLowercase={hasLowercase}
                        passwordStrength={passwordStrength}
                        hasMinLength={hasMinLength}
                        hasNumber={hasNumber}
                        hasUppercase={hasUppercase}
                        strengthColor={strengthColor}
                        strengthText={strengthText}
                      />
                    )}
                  </div>

                  {/* Confirm Password Field */}
                  <div className="space-y-2">
                    <Label htmlFor="passwordConfirm">
                      Confirm New Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="passwordConfirm"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your new password"
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                        required
                        className={`pr-10 ${
                          passwordConfirm && !passwordsMatch
                            ? "border-red-500 focus-visible:ring-red-500"
                            : ""
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                    {passwordConfirm && !passwordsMatch && (
                      <p className="text-xs text-red-500 mt-1">
                        Passwords do not match
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full bg-pink-600 hover:bg-pink-700 text-white"
                    disabled={!passwordsMatch || passwordStrength < 3}
                  >
                    Reset Password
                  </Button>
                </form>
              ) : (
                <ResetSuccessful />
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
