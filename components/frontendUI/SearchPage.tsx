"use client";

import { useGetSearchResult } from "@/services/productsServices/getSearchResult";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "./ProductCard";
import LoaderWithDetail from "./LoaderWithDetail";

function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  const newQuery = query?.toString() || "";

  const {
    data: searchResults,
    isFetching,
    error,
  } = useGetSearchResult(newQuery);

  if (error)
    return (
      <h2 className="text-center text-lg">
        Something went wrong try refreshing your browser
      </h2>
    );

  return isFetching ? (
    <LoaderWithDetail option={`Searching for ${newQuery}...`} />
  ) : (
    <div className="">
      <h2 className="font-bold p-4 m-2">{"Search Page".toUpperCase()}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mx-auto md:ml-2 lg:ml-2 w-[90%] sm:w-full">
        {searchResults &&
          searchResults.map((searchResult) => (
            <ProductCard key={searchResult._id} product={searchResult} />
          ))}
      </div>
    </div>
  );
}

export default SearchPage;
