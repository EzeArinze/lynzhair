import { useAuthentication } from "@/actions/auth";
import { LogIn, UserIcon } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

function SignInSignOut({ isMenu = false }: { isMenu: boolean }) {
  const { session, SignOut } = useAuthentication();

  if (isMenu) {
    return (
      <div className="mb-4">
        {session ? (
          <Button
            type="button"
            size="icon"
            onClick={SignOut}
            className="flex w-full"
          >
            <UserIcon className="h-5 w-5" />
            <span>SignOut</span>
          </Button>
        ) : (
          <Link href={"/auth/signin"} className="flex w-full">
            <Button size="icon" className="w-full">
              <LogIn className="h-5 w-5" />
              <span>SignIn</span>
            </Button>
          </Link>
        )}
      </div>
    );
  }

  return (
    <div>
      {session ? (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={SignOut}
          className="hidden md:block"
        >
          <UserIcon className="h-5 w-5" />
        </Button>
      ) : (
        <Link href={"/auth/signin"} className="hidden md:flex">
          <Button variant="ghost" size="icon" className="hidden md:block">
            <LogIn className="h-5 w-5" />
          </Button>
        </Link>
      )}
    </div>
  );
}

export default SignInSignOut;
