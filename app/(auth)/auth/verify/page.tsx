import React from "react";

import ResendVerification from "@/components/AuthUi/Verify";

interface verifyPageProps {
  searchParams: Promise<{ error: string }>;
}

async function VerifyPage({ searchParams }: verifyPageProps) {
  const errorObj = (await searchParams) || {};
  const resolvedError = errorObj.error || "";

  return (
    <div className=" w-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center mt-4">
        <h1 className="text-2xl font-bold mt-4 mb-2 text-red-600">
          Verification Failed
        </h1>
        <p className="text-gray-700 mb-6">
          {resolvedError === "invalid_token" ||
          resolvedError === "token_expired"
            ? "Your token is invalid or expired please request a new one"
            : "There was a problem verifying your email. Please try again or request a new verification link."}
        </p>
        <ResendVerification />
      </div>
    </div>
  );
}

export default VerifyPage;
