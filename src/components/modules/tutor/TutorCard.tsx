/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import React from "react";

const TutorCard = ({ data }: { data: any }) => {
  return (
    <div className="border rounded-xl shadow p-4 flex flex-col items-center text-center">
      <Image
        src={
          data.image ||
          "https://cdn-icons-png.flaticon.com/128/9131/9131646.png"
        }
        alt={data.userId.name}
        className="w-24 h-24 rounded-full object-cover mb-3"
        width={200}
        height={200}
      />
      <h3 className="text-lg font-bold">{data.userId.name}</h3>
      <p className="text-sm text-gray-600">{data.subjects.join(", ")}</p>
      <p className="mt-2 font-semibold text-blue-600">
        ${data.rates.hourlyRate}/hr
      </p>
      <p className="text-yellow-500">⭐ {data.ratings}</p>
    </div>
  );
};

export default TutorCard;
