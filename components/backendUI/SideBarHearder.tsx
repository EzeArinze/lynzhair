import React from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";
import { LogIn } from "lucide-react";
import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { Badge } from "../ui/badge";
// import { useServerSession } from "@/actions/useServerAuth";

async function SideBarHearder() {
  // const { session, userInitial, userEmail } = await useServerSession();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userInitial = session?.user.email?.slice(0, 1).toUpperCase() ?? "N/A";
  const userEmail = session?.user.email ?? "N/A";

  return (
    <header className="flex justify-between h-16 shrink-0 items-center gap-2 border-b px-4">
      <span className="flex items-center">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
      </span>

      <span className="flex items-center gap-2">
        {session ? (
          <span>
            <Badge className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-200 text-gray-800 font-semibold p-2">
              {userInitial}
            </Badge>
            <span className="text-sm font-medium">{userEmail}</span>
          </span>
        ) : (
          <Link href={"/auth/signin"} className="flex w-full ">
            <Badge className="w-full p-1">
              <span>Sign In</span>
              <LogIn className="h-5 w-5" />
            </Badge>
          </Link>
        )}
      </span>
    </header>
  );
}

export default SideBarHearder;
