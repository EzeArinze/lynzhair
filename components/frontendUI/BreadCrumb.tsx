import Link from "next/link";
import React from "react";

function BreadCrumb({ name }: { name: string | undefined }) {
  return (
    <div className="mb-6">
      <nav className="flex items-center text-sm text-gray-500">
        <Link href="/" className="hover:text-pink-600">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">{name}</span>
      </nav>
    </div>
  );
}

export default BreadCrumb;
