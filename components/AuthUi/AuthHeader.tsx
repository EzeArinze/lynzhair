import Image from "next/image";
import React from "react";

function AuthHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm">
      <Image
        src="/LynzHair-removebg-preview.png"
        alt="logo"
        width={60}
        height={60}
        priority
      />
    </header>
  );
}

export default AuthHeader;
