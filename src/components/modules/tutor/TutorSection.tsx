import { getProfileInfoById } from "@/services/Profile";
import Image from "next/image";
import React from "react";

const TutorSectionDetails = async ({ id }: { id: string }) => {

  const result = await getProfileInfoById(id);

  if (!result) {
    return (
      <p className="text-center text-gray-500">Tutor details not found.</p>
    );
  }

  const { image, bio, experience, isVerified, rates, ratings, subjects } =
    result.data;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Tutor Image & Basic Info */}
      <div className="flex flex-col md:flex-row items-center gap-6">
        <Image
          width={100}
          height={100}
          src={image}
          alt="Tutor"
          className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-2 border-gray-300"
        />
        <div>
          {/* <h2 className="text-2xl font-bold text-gray-800">Tutor Profile</h2> */}
          <p className="text-gray-600">{bio || "No bio available."}</p>
          {isVerified && (
            <span className="text-green-600 font-semibold">
              ✔ Verified Tutor
            </span>
          )}
        </div>
      </div>

      {/* Details Section */}
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-semibold">Experience</h3>
          <p className="text-gray-700">{experience} years</p>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-semibold">Hourly Rate</h3>
          <p className="text-gray-700">${rates?.hourlyRate}/hr</p>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-semibold">Ratings</h3>
          <p className="text-gray-700">{ratings} ⭐</p>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-semibold">Subjects</h3>
          <p className="text-gray-700">
            {subjects?.join(", ") || "Not specified"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TutorSectionDetails;
