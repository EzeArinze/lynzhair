import React from "react";

function WelcomeLoader() {
  return (
    <div className="flex items-center justify-center min-h-dvh">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-gray-500">Welcome 💇🏻‍♀️...</p>
      </div>
    </div>
  );
}

export default WelcomeLoader;
