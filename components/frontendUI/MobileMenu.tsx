import Link from "next/link";
import {
  SheetContent,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Links } from "@/lib/constant/Links";
import SearchComponent from "./SearchComponent";

interface MobileMenuProps {
  setMobileMenuOpen?: (open: boolean) => void;
}

export function MobileMenu({ setMobileMenuOpen }: MobileMenuProps) {
  return (
    <SheetContent side="left" className="w-[300px] sm:w-[350px]">
      <section className="flex flex-col h-full">
        <div className="flex items-center justify-between border-b py-4">
          <span className="text-xl font-bold text-pink-600">
            lynz<span className="text-black">hair</span>
          </span>
          <SheetTitle hidden>Menu</SheetTitle>
          <SheetDescription hidden>Mobile menu</SheetDescription>
        </div>

        <SearchComponent className="pr-10" parentClassName="relative my-4" />

        <nav className="flex flex-col space-y-4 py-4">
          {Links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-base font-medium hover:text-pink-600"
              onClick={() => setMobileMenuOpen?.(false)}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </section>
    </SheetContent>
  );
}
