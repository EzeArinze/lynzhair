"use client";

import { useInfiniteUsers } from "@/services/productsServices/getUsers";
import UsersLoading from "./UserListSkeleton";
import ErrorSituation from "../Error";
import { Loader2, Search } from "lucide-react";
import { Input } from "../ui/input";
import { Card } from "../ui/card";
import UserList from "./UserList";

export default function UserView() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteUsers();

  if (isLoading) return <UsersLoading />;

  if (isError) return <ErrorSituation situation="UserList" />;

  const allUsers = data?.pages.flatMap((page) => page.users) || [];

  return (
    <>
      <div className="space-y-6 w-[85%] m-auto">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search users..."
              className="pl-8 w-full lg:w-[50%]"
            />
          </div>
        </div>

        {allUsers.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900">
              No users found
            </h3>
            <p className="mt-2 text-gray-500">
              Try adjusting your search to find what you&apos;re looking for.
            </p>
          </div>
        ) : (
          <>
            {/* <UserList displayedUsers={allUsers} /> */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {allUsers.map((user) => (
                <Card key={user.id} className="overflow-hidden ">
                  <UserList user={user} />
                </Card>
              ))}
            </div>
          </>
        )}

        {hasNextPage && (
          <div className="flex justify-center mt-6">
            <button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="w-full sm:w-auto"
            >
              {isFetchingNextPage ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                "Load More"
              )}
            </button>
          </div>
        )}
      </div>

      {allUsers && allUsers.length > 0 && (
        <p className="text-sm text-gray-500 mt-4 text-center">
          Showing Result of {allUsers.length} User&apos;s
        </p>
      )}
    </>
  );
}
