import BookingTable from "@/components/modules/BookingCard/BookingTable";
import { getTutorBooking } from "@/services/Booking";

const BookingPage = async () => {
  try {
    const response = await getTutorBooking();
    const data = response?.data;

    
    if (!data || !Array.isArray(data) || data.length === 0) {
      return <div>No bookings available.</div>; // Fallback UI
    }

    return (
      <div>
        <BookingTable bookingData={data} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return <div>Failed to load bookings. Please try again later.</div>; // Error message
  }
};

export default BookingPage;
