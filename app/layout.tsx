import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/frontendUI/NavBar";
import Footer from "@/components/frontendUI/Footer";
import QueryProvider from "@/hooks/QueryProvider";
import { NuqsAdapter } from "nuqs/adapters/next/app";
// import NuqsContext from "@/context/use-nuqs-state";
// import { Suspense } from "react";

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
  description: "Your one stop shop for all your hairs,top 1 in nigeria",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased grid grid-col-[auto_1fr_auto] items-stretch min-h-dvh`}
      >
        <Navbar />
        <QueryProvider>
          <NuqsAdapter>
            <main className="container mx-auto p-2 lg:w-[97%]">{children}</main>
          </NuqsAdapter>
        </QueryProvider>
        <Footer />
      </body>
    </html>
  );
}
