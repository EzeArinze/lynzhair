import getStatusColor from "@/utils/getStatusColor";

export const LIMIT = 10;

export const Shipping = 4000;
export const standard = 4000;
export const express = 6000;
export const overnight = 8000;

export const freeShippingThreshold = 50000;

export const statusOptions = [
  { value: "pending", label: "Pending", color: getStatusColor("pending") },
  {
    value: "Processing",
    label: "Processing",
    color: getStatusColor("Processing"),
  },
  { value: "Shipped", label: "Shipped", color: getStatusColor("Shipped") },
  {
    value: "Completed",
    label: "Completed",
    color: getStatusColor("Completed"),
  },
];
