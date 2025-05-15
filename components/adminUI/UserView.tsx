"use client";

import { useInfiniteUsers } from "@/services/productsServices/getUsers";
import UsersLoading from "./UserListSkeleton";
import ErrorSituation from "../Error";
import { Loader2, RefreshCcw, Search } from "lucide-react";
import { Input } from "../ui/input";
import { Card } from "../ui/card";
import UserList from "./UserList";
import { Button } from "../ui/button";
import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";

export default function UserView() {
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue, 500);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
    isRefetching,
  } = useInfiniteUsers(10, debouncedSearch);

  if (isError) return <ErrorSituation situation="UserList" />;

  const allUsers = data?.pages.flatMap((page) => page.users) || [];

  return (
    <>
      <div className="space-y-6 w-[90%] m-auto">
        {/* Always show input */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search users..."
              className="pl-8 w-full lg:w-[50%]"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <Button
            onClick={() => refetch()}
            size={"icon"}
            type="button"
            variant={"outline"}
            className="w-fit p-2 place-self-end"
            disabled={isLoading}
          >
            <RefreshCcw className="h-4 w-4" />
          </Button>
        </div>

        {/* Conditional Loading State */}
        {isLoading ? (
          <UsersLoading />
        ) : allUsers.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900">
              No users found
            </h3>
            <p className="mt-2 text-gray-500">
              Try adjusting your search to find what you&apos;re looking for.
            </p>
          </div>
        ) : isRefetching ? (
          <div className=" flex items-center justify-center h-[50vh]">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allUsers.map((user) => (
              <Card key={user.id} className="overflow-hidden ">
                <UserList user={user} />
              </Card>
            ))}
          </div>
        )}

        {hasNextPage && !isLoading && (
          <div className="flex justify-center mt-6">
            <Button
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
            </Button>
          </div>
        )}
      </div>

      {!isLoading && allUsers.length > 0 && (
        <p className="text-sm text-gray-500 mt-4 text-center">
          Showing {allUsers.length} User{allUsers.length !== 1 ? "s" : ""}
        </p>
      )}
    </>
  );
}
