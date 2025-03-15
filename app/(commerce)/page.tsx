import HomePage from "@/components/frontendUI/HomePage";

import { Suspense } from "react";

export default function Home() {
  return (
    <section>
      <Suspense>
        <HomePage />
      </Suspense>
    </section>
  );
}
