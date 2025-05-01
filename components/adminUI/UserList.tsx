"use client";

import { useInfiniteUsers } from "@/services/productsServices/getUsers";
import UsersLoading from "./UserListSkeleton";

export default function UserList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteUsers();

  if (isLoading) return <UsersLoading />;

  const allUsers = data?.pages.flatMap((page) => page.users) || [];

  return (
    <>
      {allUsers.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}

      {hasNextPage && (
        <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? "Loading..." : "Load More"}
        </button>
      )}
    </>
  );
}
