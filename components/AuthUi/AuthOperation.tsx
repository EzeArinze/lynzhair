import { useState } from "react";
import { useAuthentication } from "@/actions/auth";
import { LogIn, UserIcon } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LogOut, ShoppingBasketIcon } from "lucide-react";
import { Separator } from "../ui/separator";

function SignInSignOut({
  isMenu = false,
  isMenuOpen,
}: {
  isMenu: boolean;
  isMenuOpen?: () => void;
}) {
  const { session, SignOut } = useAuthentication();
  const [popoverOpen, setPopoverOpen] = useState(false); // State to control popover

  const userInitial = session?.user.email.slice(0, 2).toUpperCase() || "N/A";
  const userEmail = session?.user.email || "N/A";

  const handleMenuClick = () => {
    if (isMenuOpen) {
      isMenuOpen(); // Trigger the external menu open logic
    }
    setPopoverOpen(false); // Close the popover
  };

  if (isMenu) {
    return (
      <div className="mb-4">
        {session ? (
          <div className="flex items-center justify-between w-full space-x-4">
            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center justify-center w-8 h-8 rounded-md bg-gray-200 text-gray-800 font-semibold p-2"
                >
                  {userInitial}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-52 space-y-2 mb-3">
                <Link
                  href={"/commerce/orders"}
                  className="flex justify-between"
                  onClick={handleMenuClick} // Close popover on click
                >
                  <span className="">Orders</span>
                  <ShoppingBasketIcon className="w-5 h-5" />
                </Link>
                <Separator className="w-full h-[1px] my-2 bg-gray-300" />
                <Button
                  type="button"
                  size="icon"
                  onClick={() => {
                    SignOut();
                    setPopoverOpen(false); // Close popover after sign-out
                  }}
                  className="flex items-center space-x-2 px-4 py-2 bg-white text-primary rounded-md hover:bg-primary-dark transition w-full"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="text-sm font-medium">Sign Out</span>
                </Button>
              </PopoverContent>
            </Popover>

            <Button
              type="button"
              size="icon"
              className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition w-full"
            >
              <UserIcon className="h-5 w-5" />
              <span className="text-sm font-medium">{userEmail}</span>
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
