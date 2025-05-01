import UserList from "@/components/adminUI/UserList";
import React from "react";

function userPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold sm:text-3xl">User Management</h1>
      <UserList />
    </section>
  );
}

export default userPage;
