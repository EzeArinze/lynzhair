import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LogOut, ShoppingBasketIcon, UserRoundCheck } from "lucide-react";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Session, User } from "better-auth/types";

interface SessionUser {
  session: Session;
  user: User;
}

interface ProfileDropdownProps {
  onClick: () => void;
  initials: string;
  isAdmin: boolean;
  session: SessionUser;
}

export function ProfileDropdown({
  onClick,
  initials,
  isAdmin,
  session,
}: ProfileDropdownProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Avatar className="w-8 h-8 hover:cursor-pointer">
          <AvatarImage
            src={session?.user.image || ""}
            alt={session?.user.name || ""}
          />
          <AvatarFallback> {initials}</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="w-52 space-y-2 mt-3 mr-2">
        {isAdmin ? (
          <>
            <Link href={"/admin"} className="flex justify-between">
              <span className="">Admin</span>
              <UserRoundCheck className="w-5 h-5" />
            </Link>
            <Separator className="w-full h-[1px] my-2 bg-gray-300" />
          </>
        ) : null}

        <Link href={"/commerce/orders"} className="flex justify-between">
          <span className="">Orders</span>
          <ShoppingBasketIcon className="w-5 h-5" />
        </Link>
        <Separator className="w-full h-[1px] my-2 bg-gray-300" />
        <Button
          type="button"
          size="icon"
          onClick={onClick}
          className="flex items-center space-x-2 px-4 py-2 bg-white text-primary rounded-md hover:bg-primary-dark transition w-full"
        >
          <LogOut className="h-5 w-5" />
          <span className="text-sm font-medium">Sign Out</span>
        </Button>
      </PopoverContent>
    </Popover>
  );
}
