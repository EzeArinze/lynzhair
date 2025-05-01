import { useInfiniteQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { authClient } from "@/lib/better-auth/authClient";
// import { auth } from "@/lib/better-auth/auth";

const fetchUsers = async ({
  pageParam = 1,
  pageSize = 10,
}: {
  pageParam?: number;
  pageSize?: number;
}) => {
  try {
    const res = await authClient.admin.listUsers({
      query: {
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

export const useInfiniteUsers = (pageSize: number = 10) => {
  return useInfiniteQuery({
    queryKey: ["infiniteUsers", pageSize],
    queryFn: ({ pageParam = 1 }: { pageParam: number }) =>
      fetchUsers({ pageParam, pageSize }),
    getNextPageParam: (lastPage: { nextPage: number | null }) =>
      lastPage.nextPage,
    staleTime: 1000 * 60 * 5,
    initialPageParam: 1,
  });
};
