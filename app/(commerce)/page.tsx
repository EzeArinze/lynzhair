import HomePage from "@/components/frontendUI/HomePage";
import { redirect } from "next/navigation";

import { Suspense } from "react";

interface homeVerifyPageProps {
  searchParams: Promise<{ error: string }>;
}

export default async function Home({ searchParams }: homeVerifyPageProps) {
  const errorObj = (await searchParams) || {};
  const resolvedError = errorObj.error || "";

  if (resolvedError) {
    return redirect(`/auth/verify?error=${resolvedError}`);
  }

  return (
    <section>
      <Suspense>
        <HomePage />
      </Suspense>
    </section>
  );
}
