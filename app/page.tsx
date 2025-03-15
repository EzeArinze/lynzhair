import Footer from "@/components/frontendUI/Footer";
import HomePage from "@/components/frontendUI/HomePage";
import { Navbar } from "@/components/frontendUI/NavBar";
import { Suspense } from "react";

export default function Home() {
  return (
    <section className="grid grid-rows-[auto_1fr_auto] items-stretch min-h-dvh">
      <Navbar />
      <div className="container mx-auto p-2 lg:w-[97%] min-h-dvh">
        <Suspense>
          <HomePage />
        </Suspense>
      </div>
      <Footer />
    </section>
  );
}
