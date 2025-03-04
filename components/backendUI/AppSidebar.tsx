"use client";

import { ShoppingBasket, Database, User2, LayoutDashboard } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Product",
    url: "/admin/product",
    icon: Database,
  },
  {
    title: "Order",
    url: "/admin/order",
    icon: ShoppingBasket,
  },
  {
    title: "User",
    url: "/admin/user",
    icon: User2,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar variant="inset">
      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarGroupLabel className="mb-8 mt-4 font-bold text-lg">
            <Image
              src="/LynzHair-removebg-preview.png"
              alt="Logo"
              height={120}
              width={100}
              priority
              className="object-contain object-center h-32 w-auto"
            />
            {/* LYNZ ADMIN */}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={item.url === pathname}>
                    <Link href={item.url} className="py-5 px-4 mb-2">
                      <item.icon className="w-8 h-8" />
                      <span className="font-medium text-base">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
