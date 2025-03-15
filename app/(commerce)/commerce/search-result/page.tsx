import SearchPage from "@/components/frontendUI/SearchPage";
import { Suspense } from "react";

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
