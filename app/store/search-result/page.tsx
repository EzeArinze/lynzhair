"use client";

import { useGetSearchResult } from "@/services/getSearchResult";
import { useSearchParams } from "next/navigation";
import React from "react";

function SearchResultPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  const { data, isFetching, error } = useGetSearchResult(
    query?.toString() || ""
  );

  console.log(data, isFetching, error);

  return <div>searchResultPage</div>;
}

export default SearchResultPage;
