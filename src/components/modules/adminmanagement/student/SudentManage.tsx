"use client";

import { NMTable } from "@/components/ui/core/NMTable";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateProfile } from "@/services/Profile";
import { IProfile } from "@/types";
import { toast } from "sonner";

interface StudentManageProps {
  ProfileData: IProfile[];
}

const StudentManage: React.FC<StudentManageProps> = ({ ProfileData }) => {
  const handleRoleChange = async (id: string, role: string) => {
    const updatedData: Partial<IProfile> = { role };

    try {
      const res = await updateProfile(id, updatedData);
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  const columns: ColumnDef<IProfile>[] = [
    {
      accessorKey: "_id",
      header: "ID",
      cell: ({ row }) => <span>{row.original._id}</span>,
    },
    {
      accessorKey: "userId",
      header: "User ID",
      cell: ({ row }) => <span>{row.original.userId}</span>,
    },
    {
      accessorKey: "Role",
      header: " Role",
      cell: ({ row }) => <span>{row.original.role}</span>,
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => (
        <Select
          defaultValue={row.original.role}
          onValueChange={(value) => handleRoleChange(row.original._id, value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="student">Student</SelectItem>
            <SelectItem value="tutor">Tutor</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
          </SelectContent>
        </Select>
      ),
    },
    {
      accessorKey: "requestRole",
      header: "Requested Role",
      cell: ({ row }) => <span>{row.original.requestRole}</span>,
    },
    {
      accessorKey: "ratings",
      header: "Ratings",
      cell: ({ row }) => <span>{row.original.ratings}</span>,
    },
    {
      accessorKey: "isVerified",
      header: "Verified",
      cell: ({ row }) => <span>{row.original.isVerified ? "Yes" : "No"}</span>,
    },
    {
      accessorKey: "experience",
      header: "Experience (Years)",
      cell: ({ row }) => <span>{row.original.experience}</span>,
    },
    {
      accessorKey: "bio",
      header: "Bio",
      cell: ({ row }) => <span>{row.original.bio}</span>,
    },
    // {
    //   accessorKey: "createdAt",
    //   header: "Created At",
    //   cell: ({ row }) => (
    //     <span>{new Date(row.original.createdAt).toLocaleString()}</span>
    //   ),
    // },
    // {
    //   accessorKey: "updatedAt",
    //   header: "Updated At",
    //   cell: ({ row }) => (
    //     <span>{new Date(row.original.updatedAt).toLocaleString()}</span>
    //   ),
    // },
  ];

  return (
    <div>
      <h1 className="text-xl font-bold">Manage Users</h1>
      <NMTable columns={columns} data={ProfileData || []} />
    </div>
  );
};

export default StudentManage;
