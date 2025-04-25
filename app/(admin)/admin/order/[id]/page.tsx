import React from "react";

async function page({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParam = await params;

  const id = resolvedParam.id;

  //680635b8800477221aa9a677

  return <div>OrderDetails Page with : {id}</div>;
}

export default page;
