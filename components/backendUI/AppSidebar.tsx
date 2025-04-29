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
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
// import { useState } from "react";

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
  const { toggleSidebar } = useSidebar();

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
                  <SidebarMenuButton
                    asChild
                    className={`${item.url === pathname ? "bg-muted" : ""}`}
                  >
                    <Link
                      href={item.url}
                      className="py-5 px-4 mb-2"
                      onClick={() => {
                        // Only toggle the sidebar on small screens
                        if (window.innerWidth < 768) {
                          toggleSidebar();
                        }
                      }}
                    >
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
