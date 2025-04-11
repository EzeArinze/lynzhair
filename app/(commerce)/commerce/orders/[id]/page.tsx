import OrderDetailsPage from "@/components/OrderUi/OrderDetails";
import React from "react";

function page() {
  const params = { id: "some-id" }; // Replace "some-id" with the actual id value
  return <OrderDetailsPage params={params} />;
}

export default page;
