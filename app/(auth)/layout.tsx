import type { Metadata } from "next"; // import { Playfair_Display, Lato } from "next/font/google"
import React, { ReactNode } from "react";
import "@/app/globals.css";
import { Toaster } from "@/components/ui/sonner";

// const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })
// const lato = Lato({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-lato" })
// className={`${playfair.variable} ${lato.variable} font-sans`}

export const metadata: Metadata = {
  title: "Lynz_hair | Sign in",
  description: "Your one-stop shop for all your hair needs, top 1 in Nigeria.",
};

function layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}

export default layout;
