import { Banner } from "./Banner";
import HairCategorySelector from "./CategoriesSelector";

function HomePage() {
  return (
    <div>
      <Banner />
      <p className="p-6 text-center font-semibold">Categories</p>
      <HairCategorySelector />

      {/* <Suspense fallback={<div>Loading...</div>}>
        <ProductView />
      </Suspense> */}
    </div>
  );
}

export default HomePage;
