import DetailsView from "@/components/frontendUI/DetailsView";
// import { getProductDetails } from "@/services/productsServices/productDetails";

import React from "react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const productId = resolvedParams.id;

  // const details = await getProductDetails(productId);

  // if (!details) {
  //   return <div>Product not found</div>;
  // }

  return <DetailsView id={productId} />;
}
