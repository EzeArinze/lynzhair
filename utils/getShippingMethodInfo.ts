const shippingMethodInfo: Record<string, string> = {
  free: "Standard (3-5 business days)",
  standard: "Standard (3-5 business days)",
  express: "Express (2-3 business days)",
  overnight: "Overnight (next business day)",
};

export const getShippingMethodInfo = (method: string) => {
  const info = shippingMethodInfo[method] || "Unknown Shipping Info";
  return info;
};
