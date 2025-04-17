import type { Metadata } from "next"; // import { Playfair_Display, Lato } from "next/font/google"
import React, { ReactNode } from "react";
import "@/app/globals.css";
import { Toaster } from "@/components/ui/sonner";
import AuthHeader from "@/components/AuthUi/AuthHeader";

export const metadata: Metadata = {
  title: "Lynz_hair | Authentication",
  description: "Your one-stop shop for all your hair needs, top 1 in Nigeria.",
};

function layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthHeader />
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}

export default layout;
