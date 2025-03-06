"use client";

import BookingCard from "@/components/modules/BookingCard/BookingCard";
import { getStudentBooking } from "@/services/Booking";
import { IBooking } from "@/types/booking";
import { useEffect, useState } from "react";

const BookSessionsPage = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getStudentBooking();
      setBookings(data);
    };
    fetchData();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Bookings</h1>
      <div className="grid gap-4">
        {bookings?.length > 0 ? (
          bookings.map((booking: IBooking) => (
            <BookingCard key={booking._id} booking={booking} />
          ))
        ) : (
          <div className="p-6 text-center text-gray-500 bg-white border rounded-lg shadow-md dark:bg-gray-800">
            <h2 className="text-lg font-semibold">No Bookings Found</h2>
            <p className="text-sm">You currently have no bookings available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookSessionsPage;
