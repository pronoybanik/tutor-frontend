"use client";

import PrimaryButton from "@/components/shared/PrimaryButton";
import { NMTable } from "@/components/ui/core/NMTable";
import { deleteSubject } from "@/services/Subject";
import { ISubject } from "@/types";
import { Plus, Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const SubjectManage = ({ subjectData }: { subjectData: ISubject[] }) => {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    const result = await deleteSubject(id);
    if (result.success) {
      toast.success(result.message);
      return true;
    } else {
      toast.error(result.message);
      return false;
    }
  };

  const columns = [
    {
      accessorKey: "name",
      header: "Product Name",
      cell: ({ row }: { row: { original: ISubject } }) => (
        <div className="flex items-center space-x-3">
          <Image
            src={row.original.image || "/placeholder-image.png"}
            alt={row.original.name}
            width={40}
            height={40}
            className="w-8 h-8 rounded-full"
          />
          <span className="truncate">{row.original.name}</span>
        </div>
      ),
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }: { row: { original: ISubject } }) => (
        <span>${row.original.hourly?.toFixed(2)}</span>
      ),
    },
    {
      accessorKey: "gradeLevel",
      header: "Grade Level",
      cell: ({ row }: { row: { original: ISubject } }) => (
        <span>{row.original.gradeLevel}</span>
      ),
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }: { row: { original: ISubject } }) => (
        <button
          className="text-red-500"
          title="Delete"
          onClick={() => handleDelete(row.original._id)}
        >
          <Trash className="w-5 h-5" />
        </button>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Manage subject</h1>
        <div className="flex items-center gap-2">
          {/* <PrimaryButton
            handler={() => router.push("/dashboard/tutor/createsubject")}
          >
            Add Subject <Plus />
          </PrimaryButton> */}

          {/* <DiscountModal
            setSelectedIds={setSelectedIds}
            selectedIds={selectedIds}
          /> */}
        </div>
      </div>
      <NMTable columns={columns} data={subjectData || []} />
      {/* <TablePagination totalPage={meta?.totalPage} /> */}
    </div>
  );
};

export default SubjectManage;
