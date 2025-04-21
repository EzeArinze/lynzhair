import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LogOut, ShoppingBasketIcon } from "lucide-react";
import { Separator } from "../ui/separator";
import Link from "next/link";

export function ProfileDropdown({
  onClick,
  initials,
}: {
  onClick: () => void;
  initials: string;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center justify-center w-8 h-8 rounded-md bg-gray-200 text-gray-500 font-semibold p-2"
          size={"icon"}
          type="button"
        >
          {initials}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-52 space-y-2 mt-3 mr-2">
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
