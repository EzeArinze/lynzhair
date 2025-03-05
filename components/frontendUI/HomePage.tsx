import { Banner } from "./Banner";

function HomePage() {
  return (
    <div>
      <Banner />
      <p className="p-6 text-center font-semibold">Categories</p>
      {/* Next Is the Category Functionality */}

      {/* <Suspense fallback={<div>Loading...</div>}>
        <ProductView />
      </Suspense> */}
    </div>
  );
}

export default HomePage;
