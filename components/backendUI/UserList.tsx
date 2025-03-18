"use client";

import { useState } from "react";

import MoreActionsOptions from "@/components/Options_action";
import getStatusColor from "@/lib/constant/getStatusColor";

import { DataTable } from "./Table";

const DummyUser = [
  {
    _id: "1",
    name: "Mike",
    email: "Mike@example.com",
    value: "User",
  },
  {
    _id: "2",
    name: "James",
    email: "James@example.com",
    value: "Admin",
  },
];

export default function UserList() {
  const [user, setUser] = useState(DummyUser);

  const handleUserChange = (Id: string, newStatus: "Admin" | "User") => {
    setUser(
      user.map((user) =>
        user._id === Id ? { ...user, value: newStatus } : user
      )
    );
  };

  // Handle delete
  const handleDelete = (Id: string) => {
    setUser(user.filter((order) => order._id !== Id));
  };

  const userColumns = [
    { header: "User ID", key: "_id" },
    { header: "Name", key: "name" },
    { header: "Email", key: "email", hideOnMobile: true },
  ];

  const Users = [
    { value: "Admin", label: "Admin", color: getStatusColor("Admin") },
    {
      value: "User",
      label: "User",
      color: getStatusColor("User"),
    },
  ];

  return (
    <>
      <DataTable
        data={user}
        columns={userColumns}
        title="User"
        statusField="value"
        statusOptions={Users}
        onStatusChange={(id, newStatus) =>
          handleUserChange(id, newStatus as "Admin" | "User")
        }
        onDelete={handleDelete}
        ActionsComponent={MoreActionsOptions}
      />
    </>
  );
}
