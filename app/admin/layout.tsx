import { AppSidebar } from "@/components/AppSidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
// import { Playfair_Display, Lato } from "next/font/google"
import React, { ReactNode } from "react";

// const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })
// const lato = Lato({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-lato" })
// className={`${playfair.variable} ${lato.variable} font-sans`}

function layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </header>
          <main>{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

export default layout;
