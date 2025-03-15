"use client";
import dynamic from "next/dynamic";

// import ProductList from "@/components/backendUI/ProductList";
const ProductList = dynamic(
  () => import("@/components/backendUI/ProductList"),
  {
    ssr: false,
  }
);

export default function ProductsPage() {
  return (
    <section className="w-[90%] mx-auto my-8">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <ProductList />
    </section>
  );
}
