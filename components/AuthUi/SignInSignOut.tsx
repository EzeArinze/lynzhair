import { useAuthentication } from "@/actions/auth";
import { LogIn, UserIcon } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

function SignInSignOut({ isMenu = false }: { isMenu: boolean }) {
  const { session, SignOut } = useAuthentication();

  const userInitial = session?.user.name.slice(0, 2).toUpperCase();

  if (isMenu) {
    return (
      <div className="mb-4">
        {session ? (
          <div className="flex items-center justify-between w-full space-x-4">
            <Button className="flex items-center justify-center w-8 h-8 rounded-md bg-gray-200 text-gray-800 font-semibold p-2">
              {userInitial}
            </Button>

            {/* Sign Out Button */}
            <Button
              type="button"
              size="icon"
              onClick={SignOut}
              className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition w-full"
            >
              <UserIcon className="h-5 w-5" />
              <span className="text-sm font-medium">Sign Out</span>
            </Button>
          </div>
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
    <div className="hidden md:flex">
      {session ? (
        <Button type="button" variant="ghost" size="icon" onClick={SignOut}>
          <UserIcon className="h-5 w-5" />
        </Button>
      ) : (
        <Link href={"/auth/signin"}>
          <Button variant="ghost" size="icon">
            <LogIn className="h-5 w-5" />
          </Button>
        </Link>
      )}
    </div>
  );
}

export default SignInSignOut;
