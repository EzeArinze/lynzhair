import CategoriesPageComponent from "@/components/frontendUI/CategoriesPageComponent";
import { Suspense } from "react";

function categoriesPage() {
  return (
    <div>
      <Suspense>
        <CategoriesPageComponent />
      </Suspense>
    </div>
  );
}

export default categoriesPage;
