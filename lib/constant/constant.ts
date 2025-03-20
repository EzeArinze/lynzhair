import getStatusColor from "@/utils/getStatusColor";
import { ContactCard } from "@/utils/types";
import { Facebook, Instagram, MessageCircle } from "lucide-react";

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

export const contactCards: ContactCard[] = [
  {
    id: "whatsapp",
    title: "WhatsApp",
    description: "Quick responses during business hours",
    contact: "+1 (234) 567-890",
    link: "https://wa.me/1234567890",
    icon: MessageCircle,
    bgColor: "bg-green-100",
    textColor: "text-green-600",
    hoverBorderColor: "hover:border-green-300",
  },
  {
    id: "facebook",
    title: "Facebook",
    description: "Message us or join our community",
    contact: "@lynzhair",
    link: "https://facebook.com/lynzhair",
    icon: Facebook,
    bgColor: "bg-blue-100",
    textColor: "text-blue-600",
    hoverBorderColor: "hover:border-blue-300",
  },
  {
    id: "instagram",
    title: "Instagram",
    description: "DM us or explore our latest styles",
    contact: "@lynzhair",
    link: "https://instagram.com/lynzhair",
    icon: Instagram,
    bgColor: "bg-pink-100",
    textColor: "text-pink-600",
    hoverBorderColor: "hover:border-pink-300",
  },
];
