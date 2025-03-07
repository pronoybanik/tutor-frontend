"use client";

import React, { useState } from "react";
import CreateCategoryModal from "./CreateCategoryModal";
import { ICategory } from "@/types";
import { NMTable } from "@/components/ui/core/NMTable";
import { Trash } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import DeleteConfirmationModal from "@/components/ui/core/NMModal/DeleteConfirmationModal";
import { deleteCategory } from "@/services/Category";
import { toast } from "sonner";

const ManageCategory = ({ category }: { category: ICategory[] }) => {

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleDelete = (data: ICategory) => {
    setSelectedId(data?._id);
    setSelectedItem(data?.name);
    setModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (selectedId) {
        const res: { success: boolean; message?: string } =
          await deleteCategory(selectedId);
        if (res.success) {
          toast.success(res.message || "Category deleted successfully!");
          setModalOpen(false);
        } else {
          toast.error(res.message || "Failed to delete category");
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while deleting the category.");
    }
  };

  const columns: ColumnDef<ICategory>[] = [
    {
      id: "category_name",
      accessorKey: "name",
      header: () => <div>Category Name</div>,
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <span className="truncate">{row.original.name || "N/A"}</span>
        </div>
      ),
    },
    {
      id: "action",
      accessorKey: "action",
      header: () => <div>Action</div>,
      cell: ({ row }) => (
        <button
          className="text-red-500"
          title="Delete"
          onClick={() => handleDelete(row.original)}
        >
          <Trash className="w-5 h-5" />
        </button>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Manage Category</h1>
        <div className="flex items-center gap-2">
          <CreateCategoryModal />
        </div>
      </div>
      <NMTable columns={columns} data={category || []} />

      <DeleteConfirmationModal
        name={selectedItem}
        isOpen={isModalOpen}
        onOpenChange={setModalOpen}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default ManageCategory;
