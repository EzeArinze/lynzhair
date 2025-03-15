// import CategoriesPageComponent from "@/components/frontendUI/CategoriesPageComponent";
import LoadingSpinner from "@/components/Loader";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const CategoriesPageComponent = dynamic(
  () => import("@/components/frontendUI/CategoriesPageComponent"),
  {
    loading: () => <LoadingSpinner />,
  }
);

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
