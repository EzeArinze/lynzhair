export type DeliveryType = "free" | "standard" | "express" | "overnight";

export function getEstimatedDeliveryTime(
  type: DeliveryType,
  orderDate: string
): string {
  let daysToAdd: number;

  switch (type) {
    case "free":
    case "standard":
      daysToAdd = 4;
      break;
    case "express":
      daysToAdd = 2;
      break;
    case "overnight":
      daysToAdd = 1;
      break;
    default:
      return "Unknown Delivery Type";
  }

  const orderDateObj = new Date(orderDate);
  if (isNaN(orderDateObj.getTime())) {
    return "Invalid Order Date";
  }

  const estimatedDate = new Date(
    orderDateObj.getTime() + daysToAdd * 24 * 60 * 60 * 1000
  );

  return estimatedDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
