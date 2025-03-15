// import SearchPage from "@/components/frontendUI/SearchPage";
import dynamic from "next/dynamic";
import { Suspense } from "react";
const SearchPage = dynamic(() => import("@/components/frontendUI/SearchPage"));

function SearchResultPage() {
  return (
    <div>
      <Suspense>
        <SearchPage />
      </Suspense>
    </div>
  );
}

export default SearchResultPage;
