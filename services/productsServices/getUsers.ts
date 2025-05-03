import { useInfiniteQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { authClient } from "@/lib/better-auth/authClient";
// import { auth } from "@/lib/better-auth/auth";

const fetchUsers = async ({
  pageParam = 1,
  pageSize = 10,
  value = "",
}: {
  pageParam?: number;
  pageSize?: number;
  value?: string;
}) => {
  try {
    const res = await authClient.admin.listUsers({
      query: {
        searchField: "email",
        searchOperator: "contains",
        searchValue: value,
        limit: pageSize,
        offset: (pageParam - 1) * pageSize,
        sortBy: "createdAt",
        sortDirection: "desc",
      },
    });

    const users = res.data?.users || [];
    // const total = res?.total || users.length;
    const totalPages = Math.ceil(users.length / pageSize);
    const hasNextPage = pageParam < totalPages;

    return {
      users,
      nextPage: hasNextPage ? pageParam + 1 : null,
    };
  } catch (error) {
    toast.error(
      "Failed to fetch users: " +
        (error instanceof Error ? error.message : "Unknown error")
    );
    throw error;
  }
};

export const useInfiniteUsers = (pageSize: number = 10, value?: string) => {
  return useInfiniteQuery({
    queryKey: ["infiniteUsers", pageSize, value],
    queryFn: ({ pageParam = 1 }: { pageParam: number }) =>
      fetchUsers({ pageParam, pageSize, value }),
    getNextPageParam: (lastPage: { nextPage: number | null }) =>
      lastPage.nextPage,
    staleTime: 1000 * 60 * 5,
    initialPageParam: 1,
  });
};
