import dynamic from "next/dynamic";
import React from "react";
const ConatactPage = dynamic(() => import("@/components/Contact/ContactPage"));

function page() {
  return <ConatactPage />;
}

export default page;
