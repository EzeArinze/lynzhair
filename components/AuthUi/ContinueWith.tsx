import React from "react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import Image from "next/image";
import { signInWithGoogle } from "@/services/auth_actions/authenticationSignIn";

function ContinueWith() {
  return (
    <section className="mt-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-gray-500">Or continue with</span>
        </div>
      </div>

      <div className="mt-6 w-full space-y-4">
        <Button
          variant="outline"
          className="w-full flex items-center justify-center"
          onClick={signInWithGoogle}
        >
          <Image
            src="/google-icon.svg"
            alt="Google Icon"
            className="h-5 w-5 mr-2"
            width={20}
            height={20}
          />
          Google
        </Button>
      </div>
    </section>
  );
}

export default ContinueWith;
