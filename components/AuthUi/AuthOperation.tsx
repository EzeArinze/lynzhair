"use client";

import { useState, useCallback, memo } from "react";
import { useAuthentication } from "@/actions/auth";
import {
  LogIn,
  UserIcon,
  LogOut,
  ShoppingBasketIcon,
  UserRoundCheck,
} from "lucide-react";
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
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

// Memoize the ProfileDropdown component
const MemoizedProfileDropdown = memo(ProfileDropdown);

function SignInSignOut({
  isMenu,
  isMenuOpen,
}: {
  isMenu: boolean;
  isMenuOpen?: () => void;
}) {
  const { session, signOut, isPending, userEmail, userInitial, isAdmin } =
    useAuthentication();
  const [popoverOpen, setPopoverOpen] = useState(false);

  // Handle menu click and close popover
  const handleMenuClick = useCallback(() => {
    if (isMenuOpen) {
      isMenuOpen(); // Trigger the external menu open logic
    }
    setPopoverOpen(false);
  }, [isMenuOpen]);

  const handleSignOut = useCallback(() => {
    signOut();
    setPopoverOpen(false);
  }, [signOut]);

  // Render for menu layout
  if (isMenu) {
    return (
      <div className="mb-4">
        {session?.user ? (
          <div className="flex items-center justify-between w-full space-x-4">
            {/* Popover for menu */}
            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
              <PopoverTrigger asChild>
                <Avatar className="w-8 h-8 hover:cursor-pointer">
                  <AvatarImage
                    src={session.user.image || ""}
                    alt={session.user.name || ""}
                  />
                  <AvatarFallback className="font-semibold">
                    {" "}
                    {userInitial}
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-52 space-y-2 mb-3">
                {isAdmin ? (
                  <>
                    <Link href={"/admin"} className="flex justify-between">
                      <span className="">Admin</span>
                      <UserRoundCheck className="w-5 h-5" />
                    </Link>
                    <Separator className="w-full h-[1px] my-2 bg-gray-300" />
                  </>
                ) : null}
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
          <Link href={"/auth/sign-in"} className="flex w-full">
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
  if (isPending) {
    return (
      <div className="hidden md:flex items-center space-x-4">
        <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="hidden md:flex">
      {session ? (
        <MemoizedProfileDropdown
          initials={userInitial}
          onClick={handleSignOut}
          isAdmin={isAdmin}
          session={session}
        />
      ) : (
        <Link href={"/auth/sign-in"}>
          <Button
            variant="ghost"
            className="px-4 py-2 bg-white text-primary rounded-md hover:bg-primary-dark transition w-full"
            disabled={isPending}
            size="icon"
          >
            <LogIn className="h-5 w-5" />
          </Button>
        </Link>
      )}
    </div>
  );
}

export default SignInSignOut;
