"use client";

import { ColumnDef } from "@tanstack/react-table";
import { NMTable } from "@/components/ui/core/NMTable";
import NMContainer from "@/components/ui/core/NMContainer";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Trash, Info } from "lucide-react";
import Image from "next/image";
import { deleteBooking, updateBooking } from "@/services/Booking";
import { IBooking } from "@/types/booking";
import { useState } from "react";

const BookingTable = ({ bookingData }: { bookingData: IBooking[] }) => {
  const [loading, setLoading] = useState(false);

  // Delete Booking
  const handleDelete = async (id: string) => {
    setLoading(true);
    const result = await deleteBooking(id);
    setLoading(false);
    if (result?.success) {
      toast.success("Booking deleted successfully!");
    } else {
      toast.error("Failed to delete booking.");
    }
  };

  // Update Booking Status
  const handleUpdateStatus = async (id: string, newStatus: string) => {
    setLoading(true);
    const result = await updateBooking(id, { status: newStatus });
    setLoading(false);
    if (result?.success) {
      toast.success(`Booking marked as ${newStatus}!`);
    } else {
      toast.error("Failed to update booking status.");
    }
  };

  // Get ID & Data
  const handleGetData = (row: IBooking) => {
   
    toast.info(`Booking ID: ${row._id}`);
  };

  const columns: ColumnDef<IBooking>[] = [
    {
      accessorKey: "subjectId.image",
      header: "Image",
      cell: ({ row }) => {
        console.log("row.original", row.original);
        
        return (
          <Image
            src={row.original.subjectId.image || "/placeholder.jpg"} // Provide a fallback image
            height={50}
            width={50}
            alt="subject"
            className="w-12 h-12 rounded-lg"
          />
        );
      },
    },
    
    {
      accessorKey: "subjectId.name",
      header: "Subject",
      cell: ({ row }) => <span>{row.original.subjectId?.name || "N/A"}</span>,
    },
    {
      accessorKey: "studentId.name",
      header: "Student",
      cell: ({ row }) => <span>{row.original.studentId.name || "N/A"}</span>,
    },
    {
      accessorKey: "tutorId.name",
      header: "Tutor",
      cell: ({ row }) => <span>{row.original.tutorId.name || "N/A"}</span>,
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => (
        <span>{new Date(row.original.date).toLocaleDateString()}</span>
      ),
    },
    {
      accessorKey: "duration",
      header: "Duration",
      cell: ({ row }) => <span>{row.original.duration || "N/A"} hrs</span>,
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => <span>${row.original.price || "N/A"}</span>,
    },
    {
      accessorKey: "status_display", 
      header: "Status",
      cell: ({ row }) => (
        <span
          className={`px-2 py-1 text-sm font-medium rounded-md ${
            row.original.status === "completed"
              ? "bg-green-100 text-green-600"
              : "bg-yellow-100 text-yellow-600"
          }`}
        >
          {row.original.status}
        </span>
      ),
    },
    {
      accessorKey: "status_update", // ✅ Renamed for uniqueness
      header: "Update Status",
      cell: ({ row }) => (
        <select
          className="px-2 py-1 text-sm font-medium rounded-md border border-gray-300"
          value={row.original.status}
          onChange={(e) => handleUpdateStatus(row.original._id, e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="canceled">Cancelled</option>
        </select>
      ),
    },
    {
      accessorKey: "action",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button
            className="bg-blue-600 text-white px-3 py-1 rounded-md flex items-center gap-2"
            onClick={() => handleGetData(row.original)}
          >
            <Info size={16} />
            Get ID & Data
          </Button>
  
          <Button
            className="bg-red-600 text-white px-3 py-1 rounded-md flex items-center gap-2"
            onClick={() => handleDelete(row.original._id)}
            disabled={loading}
          >
            <Trash size={16} />
            Delete
          </Button>
        </div>
      ),
    },
  ];
  

  return (
    <NMContainer>
      <h1 className="text-xl font-bold mb-4">Booking List</h1>
      <NMTable columns={columns} data={bookingData} />
    </NMContainer>
  );
};

export default BookingTable;
