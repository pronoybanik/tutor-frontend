/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import PrimaryButton from "@/components/shared/PrimaryButton";
import { useUser } from "@/context/UserContext";
import {
  getProfileInfoById,
  updateProfileByFeedBack,
} from "@/services/Profile";
import { formatDate } from "@/types/formatDate";
import { TReviews } from "@/types/reviews";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface TutorDetailsProps {
  id: string;
}

const TutorSectionDetails = ({ id }: TutorDetailsProps) => {
  const { user } = useUser();
  const [tutor, setTutor] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const reviews = tutor?.reviews;
  const displayedReviews =
    reviews?.length > 1 ? [reviews[reviews.length - 1]] : null;

  useEffect(() => {
    const fetchTutor = async () => {
      const result = await getProfileInfoById(id);
      if (result?.data) {
        setTutor(result.data);
      }
      setLoading(false);
    };
    fetchTutor();
  }, [id]);

  const handleSubmitFeedback = async () => {
    if (!comment || rating === 0) {
      alert("Please provide both a comment and rating.");
      return;
    }

    try {
      const updatedData = {
        comment,
        rating,
      };

      const response = await updateProfileByFeedBack(id, updatedData);

      if (response?.success) {
        alert("Feedback submitted!");
        setTutor(response.data);
        setComment("");
        setRating(0);
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  if (loading) {
    return (
      <p className="text-center text-gray-500">Loading tutor details...</p>
    );
  }

  if (!tutor) {
    return (
      <p className="text-center text-gray-500">Tutor details not found.</p>
    );
  }

  const { image, bio, experience, isVerified, rates, ratings, subjects } =
    tutor;

  return (
    <div className="max-w-4xl mx-auto p-6 my-4 bg-white shadow-lg rounded-lg">
      {/* Tutor Image & Info */}
      <div className="flex flex-col md:flex-row items-center gap-6">
        <Image
          width={100}
          height={100}
          src={image || "/placeholder.jpg"}
          alt="Tutor"
          className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-2 border-gray-300"
        />
        <div>
          <p className="text-gray-600 ">{bio || "No bio available."}</p>
          {isVerified && (
            <span className="text-green-600 font-semibold mt-4">
              ✔ Verified Tutor
            </span>
          )}
          <p className="font-semibold">Email:- {tutor?.userId?.email} </p>
        </div>
      </div>

      {/* Details */}
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

      {/* Feedback Button */}
      {user?.role === "student" ? (
        <div className="mt-6 text-center">
          <button onClick={() => setIsModalOpen(true)}>
            <PrimaryButton>Give Feedback</PrimaryButton>
          </button>
        </div>
      ) : null}

      {/* Feedback Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Leave a Review</h3>
            <label className="block mb-2">
              Rating (1-5):
              <input
                type="number"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full border p-2 mt-1"
                min={1}
                max={5}
              />
            </label>
            <label className="block mb-4">
              Comment:
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full border p-2 mt-1"
                rows={4}
              />
            </label>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitFeedback}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* review section */}

      <div className="max-w-2xl mx-auto mt-8 px-4">
        {!displayedReviews ? (
          <div className="text-center p-8 bg-gray-50 rounded-lg">
            <p className="text-gray-500">
              No reviews available for this subject yet.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Student Reviews</h2>
            {displayedReviews.map((review: TReviews) => (
              <div
                key={review._id}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                    {review.studentId.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium">{review.studentId.name}</p>
                    <p className="text-sm">{review.studentId.email}</p>
                    <p className="text-sm text-gray-500">
                      {formatDate(review.createdAt)}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorSectionDetails;
