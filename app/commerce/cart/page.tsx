import React from "react";
import dynamic from "next/dynamic";
import LoadingSpinner from "@/components/Loader";

const CartView = dynamic(() => import("@/components/CartUi/CartView"), {
  loading: () => <LoadingSpinner />,
});

function page() {
  return (
    <section>
      <CartView />
    </section>
  );
}

export default page;
