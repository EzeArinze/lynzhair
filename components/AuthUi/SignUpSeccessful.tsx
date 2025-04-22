import { ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

function SignUpSeccessful() {
  return (
    <div className="text-center py-4">
      <Link
        href="/auth/signin"
        className="inline-flex items-center text-sm font-medium text-pink-600 mb-6 hover:underline"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to sign in
      </Link>

      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckCircle className="h-8 w-8 text-green-600" />
      </div>
      <h3 className="text-xl font-semibold mb-2">Sign Up Successfully</h3>
      <p className="text-gray-600 mb-6">
        Click the link sent to your email. To verify and sign into your new
        account.
      </p>
      <span className="w-full bg-pink-600 hover:bg-pink-700 text-white p-2 rounded-md font-semibold">
        Check Your Email
      </span>
    </div>
  );
}

export default SignUpSeccessful;
