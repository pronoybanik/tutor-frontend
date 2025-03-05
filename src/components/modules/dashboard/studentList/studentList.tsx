"use client";

import { ISubject } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { NMTable } from "@/components/ui/core/NMTable";
import NMContainer from "@/components/ui/core/NMContainer";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import React, { useState } from "react";
import { deleteSubject } from "@/services/Subject";
import Image from "next/image";

const StudentList = ({ data }: { data: ISubject[] }) => {
  const [subjectData, setSubjectData] = useState<ISubject[]>(data);

  const handleDelete = async (id: string) => {
    const result = await deleteSubject(id);
    if (result.success) {
      toast.success("Subject deleted successfully!");
      setSubjectData((prev) => prev.filter((subject) => subject._id !== id)); // Update state
      return true;
    } else {
      toast.error("Failed to delete subject.");
      return false;
    }
  };

  const columns: ColumnDef<ISubject>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <span>{row.original.name}</span>,
    },
    {
      accessorKey: "gradeLevel",
      header: "Grade Level",
      cell: ({ row }) => <span>{row.original.gradeLevel}</span>,
    },
    {
      accessorKey: "hourly",
      header: "Hourly Rate",
      cell: ({ row }) => <span>${row.original.hourly}</span>,
    },
    {
      accessorKey: "userId",
      header: "User ID",
      cell: ({ row }) => <span>{row.original.userId}</span>,
    },
    {
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => (
        <Image
          src={row.original.image}
          height={100}
          width={100}
          alt="subject"
          className="w-12 h-12 rounded-lg"
        />
      ),
    },
    {
      accessorKey: "action",
      header: "Actions",
      cell: ({ row }) => (
        <Button
          variant="destructive"
          size="sm"
          onClick={() => handleDelete(row.original._id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <NMContainer>
      <h1 className="text-xl font-bold mb-4">Subject List</h1>
      <NMTable columns={columns} data={subjectData} />
    </NMContainer>
  );
};

export default StudentList;
