import { Banner } from "./Banner";

function HomePage() {
  return (
    <div>
      <Banner />
      {/* <Suspense fallback={<div>Loading...</div>}>
        <ProductView />
      </Suspense> */}
    </div>
  );
}

export default HomePage;
