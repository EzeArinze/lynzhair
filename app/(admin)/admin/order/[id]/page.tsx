import OrderDetailsPage from "@/components/adminUI/OrderDetails";
import React from "react";

async function page({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParam = await params;

  const id = resolvedParam.id;

  return <OrderDetailsPage id={id} />;
}

export default page;
