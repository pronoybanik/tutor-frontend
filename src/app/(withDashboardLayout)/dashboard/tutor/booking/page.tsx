import BookingTable from "@/components/modules/BookingCard/BookingTable";
import { getTutorBooking } from "@/services/Booking";

const BookingPage = async () => {
  const { data } = await getTutorBooking();

  return (
    <div>
      <BookingTable bookingData={data} />
    </div>
  );
};

export default BookingPage;
