"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { ShoppingCart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MobileMenu } from "./MobileMenu";
import { Links } from "@/lib/constant/Links";
import SearchComponent from "./SearchComponent";
import Image from "next/image";
import { useGroupedItems } from "@/utils/useGroupedItems";
import SignInSignOut from "../AuthUi/AuthOperation";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getGrouped = useGroupedItems();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/LynzHair-removebg-preview.png"
                alt="Logo"
                height={120}
                width={100}
                priority
                className="object-contain object-center h-32 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {Links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Search, Cart, and Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Suspense>
              <SearchComponent
                className="pr-10 bg-white/80"
                parentClassName="hidden md:flex relative w-64"
              />
            </Suspense>

            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link href={"/commerce/cart"}>
                <ShoppingCart className="h-5 w-5" />
                <span
                  className={`absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full ${
                    getGrouped?.length === 0
                      ? ""
                      : "bg-primary text-[10px] font-medium text-white shadow-md"
                  } `}
                >
                  {getGrouped?.length || ""}
                </span>
              </Link>
            </Button>

            <SignInSignOut isMenu={false} />

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>

              <SheetContent
                side="left"
                className="w-[300px] sm:w-[350px] flex flex-col justify-around"
              >
                <SheetHeader>
                  <SheetTitle hidden>Menu</SheetTitle>
                  <SheetDescription hidden>Mobile menu</SheetDescription>
                </SheetHeader>
                <MobileMenu setMobileMenuOpen={setMobileMenuOpen} />
                <SignInSignOut
                  isMenu={true}
                  isMenuOpen={() => setMobileMenuOpen?.(false)}
                />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
