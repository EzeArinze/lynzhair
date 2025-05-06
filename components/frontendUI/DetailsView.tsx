"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import BreadCrumb from "./BreadCrumb";
import ProductDetails from "./ProductDetails";
import DetailsTabs from "./DetailsTabs";
// import { getProductDetails } from "@/services/productsServices/productDetails";
import useGetProductDetails from "@/services/productsServices/productDetails";
// import LoadingSpinner from "../Loader";
import LoaderWithDetail from "./LoaderWithDetail";

export default function DetailsView({ id }: { id: string }) {
  const { data: details, isFetching } = useGetProductDetails(id);

  // const details = await getProductDetails(id);

  return isFetching ? (
    <LoaderWithDetail option="Loading Details..." />
  ) : (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <BreadCrumb name={details?.name} />

          {/* Back button */}
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-pink-600 mb-6 hover:underline"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to all products
          </Link>

          {/* Product details */}
          {details && <ProductDetails details={details} />}

          {/* Product details tabs */}
          <DetailsTabs description={details?.description} />
        </div>
      </main>
    </div>
  );
}
