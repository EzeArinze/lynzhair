import { CheckCircle } from "lucide-react";
import React from "react";

function VerifySuccessful() {
  return (
    <div className="text-center py-4">
      <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckCircle className="h-8 w-8 text-green-600" />
      </div>
      <h3 className="text-xl font-semibold mb-2">
        Verification has been sent to your email
      </h3>
      <p className="text-gray-600 mb-6">
        The verification link will expire in 1 hour. Please check your email and
        verify promptly.
      </p>
    </div>
  );
}

export default VerifySuccessful;
