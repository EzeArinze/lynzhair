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

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Product",
    url: "#",
    icon: Database,
  },
  {
    title: "Order",
    url: "#",
    icon: ShoppingBasket,
  },
  {
    title: "User",
    url: "#",
    icon: User2,
  },
];

export function AppSidebar() {
  return (
    <Sidebar variant="inset">
      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarGroupLabel className="mb-8 mt-4 font-bold text-lg">
            LYNZ ADMIN
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={item.url === "/admin"}>
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
