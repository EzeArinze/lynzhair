import OrderDetailsPage from "@/components/OrderUi/OrderDetails";

async function page({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;

  const _Id = resolvedParams.id;

  return <OrderDetailsPage orderId={_Id} />;
}

export default page;
