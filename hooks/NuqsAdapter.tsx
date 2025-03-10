import React from "react";
import { NuqsAdapter } from "nuqs/adapters/next/app";

function NuqsAdapterWrap({ children }: { children: React.ReactNode }) {
  return <NuqsAdapter>{children}</NuqsAdapter>;
}

export default NuqsAdapterWrap;
