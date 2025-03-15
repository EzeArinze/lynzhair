"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { useRouter } from "next/navigation";

function NotFound() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 wi">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center w-72">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-lg text-gray-600 mb-8">Page Not Found</p>
        <Button
          onClick={handleGoBack}
          className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition"
        >
          Click to go back
        </Button>
      </div>
    </div>
  );
}

export default NotFound;
