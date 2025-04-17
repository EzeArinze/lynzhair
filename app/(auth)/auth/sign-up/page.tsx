"use client";
import LoadingSpinner from "@/components/Loader";
import dynamic from "next/dynamic";
import React from "react";

// Dynamically import UserSignup
const UserSignup = dynamic(() => import("@/components/AuthUi/UserSignup"), {
  loading: () => <LoadingSpinner />,
  ssr: false,
});

function signUpPage() {
  return (
    <section>
      <UserSignup />
    </section>
  );
}

export default signUpPage;
