import { Banner } from "./Banner";

function HomePage() {
  return (
    <div>
      <Banner />
      <p className="p-6">Categories</p>
      {/* <Suspense fallback={<div>Loading...</div>}>
        <ProductView />
      </Suspense> */}
    </div>
  );
}

export default HomePage;
