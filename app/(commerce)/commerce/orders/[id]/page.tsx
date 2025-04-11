import OrderDetailsPage from "@/components/OrderUi/OrderDetails";

async function page({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;

  const isId = resolvedParams.id;

  return <OrderDetailsPage orderId={isId} />;
}

export default page;
