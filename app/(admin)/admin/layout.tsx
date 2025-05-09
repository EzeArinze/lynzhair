import type { Metadata } from "next";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
// import { Playfair_Display, Lato } from "next/font/google"
import React, { ReactNode } from "react";
import "@/app/globals.css";
import QueryProvider from "@/hooks/QueryProvider";
import { Toaster } from "@/components/ui/sonner";

import { AppSidebar } from "@/components/adminUI/AppSidebar";
import SideBarHearder from "@/components/adminUI/SideBarHearder";

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
