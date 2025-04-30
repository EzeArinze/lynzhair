import OrderDetailsPage from "@/components/AdminUI/OrderDetails";
import React from "react";

async function page({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParam = await params;

  const id = resolvedParam.id;

  //680635b8800477221aa9a677

  return <OrderDetailsPage id={id} />;
}

export default page;
