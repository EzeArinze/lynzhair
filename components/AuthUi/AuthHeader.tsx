import Image from "next/image";
import Link from "next/link";
import React from "react";

function AuthHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm">
      <Link href="/">
        <Image
          src="/Lynnhairz-removebg-preview.png"
          alt="logo"
          width={60}
          height={60}
          priority
        />
      </Link>
    </header>
  );
}

export default AuthHeader;
