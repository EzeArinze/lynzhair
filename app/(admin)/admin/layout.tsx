import type { Metadata } from "next";
import { AppSidebar } from "@/components/AdminUI/AppSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
// import { Playfair_Display, Lato } from "next/font/google"
import React, { ReactNode } from "react";
import "@/app/globals.css";
import QueryProvider from "@/hooks/QueryProvider";
import { Toaster } from "@/components/ui/sonner";

import SideBarHearder from "@/components/AdminUI/SideBarHearder";

// const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })
// const lato = Lato({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-lato" })
// className={`${playfair.variable} ${lato.variable} font-sans`}

export const metadata: Metadata = {
  title: "Lynz_hair",
  description: "Your one-stop shop for all your hair needs, top 1 in Nigeria.",
};

function layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              {/* <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <User className="w-5 h-5" />
              </header> */}
              <SideBarHearder />
              <main>{children}</main>
              <Toaster />
            </SidebarInset>
          </SidebarProvider>
        </QueryProvider>
      </body>
    </html>
  );
}

export default layout;
