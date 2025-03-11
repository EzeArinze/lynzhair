import HomePage from "@/components/frontendUI/HomePage";
import { Suspense } from "react";

export default function Home() {
  return (
    <div>
      <Suspense>
        <HomePage />
      </Suspense>
    </div>
  );
}
