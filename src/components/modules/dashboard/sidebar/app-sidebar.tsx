"use client";

import * as React from "react";
import Link from "next/link";
import {
  School,
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
import Logo from "@/components/shared/Logo";
import { useUser } from "@/context/UserContext";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser();

  // Define full menu
  const navMain = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: SquareTerminal,
    },
    {
      title: "student section",
      url: "",
      icon: ShieldUser,
      role: "student",
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
      role: "admin",
      items: [
        {
          title: "Manage student and tutor",
          url: "/dashboard/admin/studentlist",
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
      role: "tutor",
      items: [
        {
          title: "Manage Booking",
          url: "/dashboard/tutor/booking",
        },
        {
          title: "create subject",
          url: "/dashboard/tutor/createsubject",
        },
        {
          title: "subject list",
          url: "/dashboard/tutor/subjectList",
        },
        {
          title: "create blog",
          url: "/dashboard/tutor/createBlog",
        },
        {
          title: "FeedBack",
          url: "/dashboard/tutor/FeedBack",
        },
      ],
    },
  ];

  const filteredNavMain = navMain.filter(
    (item) =>
      !item.role || 
      item.role === user?.role
  );

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="grid bg-gray-500 rounded-2xl py-4 flex-1 text-left text-sm leading-tight">
                  <Logo />
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={filteredNavMain} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
