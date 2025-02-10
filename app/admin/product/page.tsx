import ProductList from "@/components/backendUI/ProductList";

export default function ProductsPage() {
  return (
    <div className="w-[90%] mx-auto">
      <h1 className="text-3xl font-bold mb-8">Products</h1>
      <ProductList />
    </div>
  );
}
