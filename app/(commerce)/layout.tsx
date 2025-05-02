import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Navbar } from "@/components/frontendUI/NavBar";
import Footer from "@/components/frontendUI/Footer";
import QueryProvider from "@/hooks/QueryProvider";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import NuqsContext from "@/context/use-nuqs-state";
import { Suspense } from "react";

import WelcomeLoader from "@/components/frontendUI/WelcomeLoader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lynz_hair",
  description: "Your one-stop shop for all your hair needs, top 1 in Nigeria.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased grid grid-rows-[auto_1fr_auto] items-stretch min-h-dvh`}
      >
        <QueryProvider>
          <Navbar />
          <Suspense fallback={<WelcomeLoader />}>
            <NuqsAdapter>
              <NuqsContext>
                <main className="container mx-auto p-2 lg:w-[97%] min-h-dvh">
                  {children}
                </main>
              </NuqsContext>
            </NuqsAdapter>
          </Suspense>
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
