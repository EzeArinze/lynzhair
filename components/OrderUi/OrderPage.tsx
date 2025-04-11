"use client";

import React from "react";
// import Orders from "./Orders";
import dynamic from "next/dynamic";

const Orders = dynamic(() => import("./Orders"), {
  ssr: false,
});

function OrderPage() {
  return (
    <>
      <Orders />
    </>
  );
}

export default OrderPage;
