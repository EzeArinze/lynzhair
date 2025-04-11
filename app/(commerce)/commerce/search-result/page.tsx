import SearchPage from "@/components/frontendUI/SearchPage";
import { Suspense } from "react";

function SearchResultPage() {
  return (
    <section>
      <Suspense>
        <SearchPage />
      </Suspense>
    </section>
  );
}

export default SearchResultPage;
