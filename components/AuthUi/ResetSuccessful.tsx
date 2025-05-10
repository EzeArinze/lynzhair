import { CheckCircle } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

function ResetSuccessful() {
  return (
    <div className="text-center py-4">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckCircle className="h-8 w-8 text-green-600" />
      </div>
      <h3 className="text-xl font-semibold mb-2">
        Password Reset Successfully
      </h3>
      <p className="text-gray-600 mb-6">
        Your password has been reset successfully. You can now sign in with your
        new password.
      </p>
      <Button
        asChild
        className="w-full bg-pink-600 hover:bg-pink-700 text-white"
      >
        <Link href="/auth/sign-in">Sign In</Link>
      </Button>
    </div>
  );
}

export default ResetSuccessful;
