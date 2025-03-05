"use client";

import { useGetSearchResult } from "@/services/getSearchResult";
import { useSearchParams } from "next/navigation";

function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  const newQuery = query?.toString() || "";

  const { data, isFetching, error } = useGetSearchResult(newQuery);

  console.log(data, isFetching, error);

  return <div>SearchPage</div>;
}

export default SearchPage;
