"use client";
import LoadingSpinner from "@/components/Loader";
import dynamic from "next/dynamic";
import React from "react";
const ConatactPage = dynamic(() => import("@/components/Contact/ContactPage"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

function page() {
  return <ConatactPage />;
}

export default page;
