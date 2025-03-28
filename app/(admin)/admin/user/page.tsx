"use client";
import LoadingSpinner from "@/components/Loader";
import dynamic from "next/dynamic";
import React from "react";

// Dynamically import UserSignup
const UserSignup = dynamic(() => import("@/components/backendUI/UserSignup"), {
  loading: () => <LoadingSpinner />,
  ssr: false,
});

function userPage() {
  return (
    <section>
      <UserSignup />
    </section>
  );
}

export default userPage;
