import { useState, useMemo, useCallback } from "react";
import { useAuthentication } from "@/actions/auth";
import { LogIn, UserIcon, LogOut, ShoppingBasketIcon } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "../ui/separator";
import { ProfileDropdown } from "./ProfileDropdown";

function SignInSignOut({
  isMenu = false,
  isMenuOpen,
}: {
  isMenu: boolean;
  isMenuOpen?: () => void;
}) {
  const { session, SignOut, isPending } = useAuthentication();
  const [popoverOpen, setPopoverOpen] = useState(false);

  const userInitial = useMemo(
    () => session?.user.email.slice(0, 2).toUpperCase() || "N/A",
    [session]
  );
  const userEmail = useMemo(() => session?.user.email || "N/A", [session]);

  // Handle menu click and close popover
  const handleMenuClick = useCallback(() => {
    if (isMenuOpen) {
      isMenuOpen(); // Trigger the external menu open logic
    }
    setPopoverOpen(false);
  }, [isMenuOpen]);

  const handleSignOut = useCallback(() => {
    SignOut();
    setPopoverOpen(false);
  }, [SignOut]);

  if (isPending) {
    return (
      <div className="flex items-center space-x-4">
        <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
      </div>
    );
  }

  // Render for menu layout
  if (isMenu) {
    return (
      <div className="mb-4">
        {session?.user ? (
          <div className="flex items-center justify-between w-full space-x-4">
            {/* Popover for menu */}
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
                  <span>Orders</span>
                  <ShoppingBasketIcon className="w-5 h-5" />
                </Link>
                <Separator className="w-full h-[1px] my-2 bg-gray-300" />
                <Button
                  type="button"
                  size="icon"
                  onClick={handleSignOut}
                  className="flex items-center space-x-2 px-4 py-2 bg-white text-primary rounded-md hover:bg-primary-dark transition w-full"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="text-sm font-medium">Sign Out</span>
                </Button>
              </PopoverContent>
            </Popover>

            {/* User email display */}
            <Button
              type="button"
              size="icon"
              className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition w-full"
            >
              <UserIcon className="h-5 w-5" />
              <span
                className="text-sm font-medium truncate max-w-[150px]"
                title={userEmail}
              >
                {userEmail}
              </span>
            </Button>
          </div>
        ) : (
          <Link href={"/auth/signin"} className="flex w-full">
            <Button size="icon" className="w-full" disabled={isPending}>
              <LogIn className="h-5 w-5" />
              <span>Sign In</span>
            </Button>
          </Link>
        )}
      </div>
    );
  }

  // Render for non-menu layout
  return (
    <div className="hidden md:flex">
      {session ? (
        <ProfileDropdown initials={userInitial} onClick={handleSignOut} />
      ) : (
        <Link href={"/auth/signin"}>
          <Button
            variant="ghost"
            className="px-4 py-2 bg-white text-primary rounded-md hover:bg-primary-dark transition w-full"
          >
            Sign in
          </Button>
        </Link>
      )}
    </div>
  );
}

export default SignInSignOut;
