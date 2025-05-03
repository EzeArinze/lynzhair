import React from "react";

function LoaderWithDetail({ option }: { option: string }) {
  return (
    <div className="flex items-center justify-center min-h-dvh">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-gray-500">
          {option ? option : "Welcome 💇🏻‍♀️..."}
        </p>
      </div>
    </div>
  );
}

export default LoaderWithDetail;
