"use client";

import PrimaryButton from "@/components/shared/PrimaryButton";
import { createOrder } from "@/services/Booking";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function PaymentDetails() {
  const router = useRouter();
  const handleBooking = async () => {
    const orderLoading = toast.loading("Order is being placed");
    try {
      const res = await createOrder("");

      if (res.success) {
        toast.success(res.message, { id: orderLoading });
        router.push(res.data.paymentUrl);
      }

      if (!res.success) {
        toast.error(res.message, { id: orderLoading });
      }
    } catch (error: any) {
      toast.error(error.message, { id: orderLoading });
    }
  };

  return (
    <div className="border-2 border-white bg-background brightness-105 rounded-md col-span-4 h-fit p-5">
      <h1 className="text-2xl font-bold">Payment Details</h1>
      <div className="space-y-2 mt-4">
        <div className="flex justify-between">
          <p className="text-gray-500">Subtotal</p>
          <p className="font-semibold">$0.00</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-500">Discount</p>
          <p className="font-semibold">$0.00</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-500">Shipment Cost</p>
          <p className="font-semibold">$0.00</p>
        </div>
      </div>
      <div className="flex justify-between mt-10 mb-5">
        <p className="text-gray-500">Grand Total</p>
        <p className="font-semibold">$0.00</p>
      </div>
      <PrimaryButton
        handler={handleBooking}
        className="w-full text-xl font-semibold py-5"
      >
        Please Payment
      </PrimaryButton>
    </div>
  );
}
