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
import { updateProfileByRole } from "@/services/Profile";
import { IProfile } from "@/types";
import { toast } from "sonner";
import NMContainer from "@/components/ui/core/NMContainer";

interface StudentManageProps {
  ProfileData: IProfile[];
}

const StudentManage: React.FC<StudentManageProps> = ({ ProfileData }) => {
  const handleRoleChange = async (id: string, role: string) => {
    try {
      const res = await updateProfileByRole(id, role);
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
      accessorKey: "userId",
      header: "User ID",
      cell: ({ row }) => <span>{row.original.userId}</span>,
    },
    {
      accessorKey: "role",
      header: "Profile Role",
      cell: ({ row }) => (
        <span className="bg-[#1dd1a1] flex justify-center text-xs text-black font-semibold p-2 rounded-xl">
          {row.original.role}
        </span>
      ),
    },
    {
      accessorKey: "requestRole",
      header: "Requested Role",
      cell: ({ row }) => (
        <div>
          {row.original.requestRole ? (
            <span className="bg-blue-500 flex justify-center text-xs text-white font-semibold p-2 rounded-xl text-center">
              {row.original.requestRole}
            </span>
          ) : (
            <h1 className="bg-red-400 text-xs text-white font-semibold p-2 rounded-xl text-center">
              Not Requested
            </h1>
          )}
        </div>
      ),
    },
    {
      accessorKey: "experience",
      header: "Experience (Years)",
      cell: ({ row }) => <span>{row.original.experience}</span>,
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
      accessorKey: "roleSelection",
      header: "Change Role",
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
  ];

  return (
    <div>
      <NMContainer>
        <h1 className="text-xl font-bold">Manage Users</h1>
        <NMTable columns={columns} data={ProfileData} />
      </NMContainer>
    </div>
  );
};

export default StudentManage;
