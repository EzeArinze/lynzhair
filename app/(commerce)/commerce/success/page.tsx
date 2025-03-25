"use client";
import dynamic from "next/dynamic";
import React from "react";

const SuccessPage = dynamic(() => import("@/components/SuccesUI/success"), {
  ssr: false,
});

function page() {
  return (
    <div>
      <SuccessPage />
    </div>
  );
}

export default page;
