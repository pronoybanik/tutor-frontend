"use client";

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { IBooking } from "@/types/booking";
import Image from "next/image";
import PaymentDetails from "./payment";
import { deleteBooking } from "@/services/Booking";
import { toast } from "sonner";

const BookingCard = ({ booking }: { booking: IBooking }) => {
  const handleDelete = async () => {
    const result = await deleteBooking(booking._id);
    if (result?.success) {
      toast.success("Booking deleted successfully!");
    } else {
      toast.error("Failed to delete booking.");
    }

    console.log("Deleting booking ID:", booking._id);
  };

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white dark:bg-gray-800">
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4">
        {/* Image Section */}
        <Image
          width={200}
          height={200}
          src={booking.subjectId.image}
          alt={booking.subjectId.name}
          className="w-full md:w-24 md:h-24 object-cover rounded-md"
        />

        {/* Booking Details Section */}
        <div className="flex-1 text-center justify-center md:text-left">
          <h2 className="text-lg font-semibold">{booking.subjectId.name}</h2>
          <p className="text-sm text-gray-500">
            {booking.studentId.name} → {booking.tutorId.name}
          </p>
          <p className="text-sm text-gray-500">
            Date: {new Date(booking.date).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-500">
            Duration: {booking.duration} hrs
          </p>
          <p className="text-sm text-gray-500">Price: ${booking.price}</p>
          <p
            className={`text-sm font-medium mt-1 ${
              booking.status === "completed"
                ? "text-green-600"
                : "text-yellow-600"
            }`}
          >
            Status: {booking.status}
          </p>
        </div>

        {/* Payment Details Section */}

        {booking.status === "completed" ? (
          <div className="w-full md:w-auto">
            <PaymentDetails />
          </div>
        ) : null}
      </div>

      {/* Buttons Section */}
      <div className="mt-4 flex flex-col md:flex-row gap-2">
        <Button
          className="bg-red-600 text-white px-4 py-2 rounded-md flex items-center gap-2 justify-center"
          onClick={handleDelete}
        >
          <Trash size={16} />
          {/* {loading ? "Deleting..." : "Delete"} */}
          delete
        </Button>
      </div>
    </div>
  );
};

export default BookingCard;
