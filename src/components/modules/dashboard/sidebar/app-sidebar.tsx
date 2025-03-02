"use client";

import * as React from "react";
import {
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  School,
  Send,
  Shield,
  ShieldUser,
  SquareTerminal,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import Link from "next/link";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: SquareTerminal,
      isActive: true,
    },

    {
      title: "student section",
      url: "",
      icon: ShieldUser,
      items: [
        {
          title: "book sessions",
          url: "/dashboard/student/booksessions",
        },
      ],
    },
    {
      title: "Admin section",
      url: "",
      icon: Shield,
      items: [
        {
          title: "Manage student",
          url: "/dashboard/admin/studentlist",
        },
        {
          title: "Manage Tutor",
          url: "/dashboard/admin/tutorlist",
        },
        {
          title: "Manage Category",
          url: "/dashboard/admin/managecategory",
        },
        {
          title: "Manage Subject",
          url: "/dashboard/admin/managesubject",
        },
      ],
    },
    {
      title: "Tutor section",
      url: "",
      icon: School,
      items: [
        {
          title: "Manage Booking",
          url: "/dashboard/tutor/booking",
        },
        {
          title: "create subject",
          url: "/dashboard/tutor/createsubject",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex items-center justify-center">Logo</div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <h2 className="font-bold text-xl">NextMart</h2>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
