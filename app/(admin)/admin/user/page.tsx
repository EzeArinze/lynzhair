import UserView from "@/components/adminUI/UserView";
import React from "react";

function userPage() {
  return (
    <section className="mt-4 ">
      <h1 className="text-2xl font-bold sm:text-3xl pl-6 mb-4">
        User Management
      </h1>
      <UserView />
    </section>
  );
}

export default userPage;
