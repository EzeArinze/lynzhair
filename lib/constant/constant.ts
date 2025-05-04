import getStatusColor from "@/utils/getStatusColor";
import { ContactCard } from "@/utils/types";
import { Facebook, Instagram, MessageCircle } from "lucide-react";

export const LIMIT = 10;

export const free = 0;
export const Shipping = 4000;
export const standard = 4000;
export const express = 6000;
export const overnight = 8000;

export const freeShippingThreshold = 50000;

export const RecentOrderLimit = 6;

export const statusOptions = [
  {
    value: "paid",
    label: "Paid",
    color: getStatusColor("paid"),
  },
  { value: "pending", label: "Pending", color: getStatusColor("pending") },
  { value: "shipped", label: "Shipped", color: getStatusColor("shipped") },
  {
    value: "delivered",
    label: "delivered",
    color: getStatusColor("delivered"),
  },
  {
    value: "cancelled",
    label: "Cancelled",
    color: getStatusColor("cancelled"),
  },
];

export const contactCards: ContactCard[] = [
  {
    id: "whatsapp",
    title: "WhatsApp",
    description: "Quick responses during business hours",
    contact: "+1 (234) 567-890",
    link: "https://wa.me/08066912768",
    icon: MessageCircle,
    bgColor: "bg-green-100",
    textColor: "text-green-600",
    hoverBorderColor: "hover:border-green-300",
  },
  {
    id: "facebook",
    title: "Facebook",
    description: "Message us or join our community",
    contact: "@Lynnhairz",
    link: "https://facebook.com/Lynnhairz",
    icon: Facebook,
    bgColor: "bg-blue-100",
    textColor: "text-blue-600",
    hoverBorderColor: "hover:border-blue-300",
  },
  {
    id: "instagram",
    title: "Instagram",
    description: "DM us or explore our latest styles",
    contact: "@Lynnhairz",
    link: "https://instagram.com/Lynnhairz",
    icon: Instagram,
    bgColor: "bg-pink-100",
    textColor: "text-pink-600",
    hoverBorderColor: "hover:border-pink-300",
  },
];

export const SocialContact = [
  {
    href: "https://wa.me/08066912768",
    target: "_blank",
    icon: MessageCircle,
    rel: "noopener noreferrer",
    label: "Quick responses during business hours",
    platform: "WhatsApp",
    className: "hover:bg-green-50 hover:border-green-200",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    href: "https://facebook.com/Lynnhairz",
    target: "_blank",
    icon: Facebook,
    rel: "noopener noreferrer",
    label: "Message us or join our community",
    platform: "Facebook",
    className: "hover:bg-blue-50 hover:border-blue-200",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    href: "https://instagram.com/Lynnhairz",
    target: "_blank",
    icon: Instagram,
    rel: "noopener noreferrer",
    label: "DM us or explore our latest styles",
    platform: "Instagram",
    className: "hover:bg-pink-50 hover:border-pink-200",
    iconBg: "bg-pink-100",
    iconColor: "text-pink-600",
  },
];
