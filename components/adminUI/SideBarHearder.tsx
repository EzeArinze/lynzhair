import React from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";
import { LogIn } from "lucide-react";
import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

async function SideBarHearder() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userInitial = session?.user.email?.slice(0, 1).toUpperCase() ?? "N/A";
  const userEmail = session?.user.email ?? "N/A";

  return (
    <header className="flex justify-between h-16 shrink-0 items-center gap-2 border-b px-4">
      <div className="flex items-center">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
      </div>

      <div className="flex items-center gap-2">
        {session ? (
          <span className="flex items-center gap-2">
            {/* <Badge className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-200 text-gray-800 font-semibold p-2">
              {userInitial}
            </Badge> */}
            <Avatar className="w-8 h-8">
              <AvatarImage
                src={session?.user.image || ""}
                alt={session?.user.name}
              />
              <AvatarFallback>{userInitial}</AvatarFallback>
            </Avatar>
            <h3
              className="text-sm font-medium truncate max-w-[110px] border-inherit"
              title={userEmail}
            >
              {userEmail}
            </h3>
          </span>
        ) : (
          <Link href={"/auth/signin"} className="flex w-full ">
            <Badge className="w-full p-1">
              <span>Sign In</span>
              <LogIn className="h-5 w-5" />
            </Badge>
          </Link>
        )}
      </div>
    </header>
  );
}

export default SideBarHearder;
