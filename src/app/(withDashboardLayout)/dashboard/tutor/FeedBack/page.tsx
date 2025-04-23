import { getProfileInfo } from "@/services/Profile";
import { formatDate } from "@/types/formatDate";
import { TReviews } from "@/types/reviews";
import React from "react";


const Feedback = async () => {
  const result = await getProfileInfo();
  const reviews = result?.data?.reviews;

  return (
    <div className="max-w-2xl mx-auto mt-8 px-4">
      <h2 className="text-2xl font-bold mb-6">Student Reviews</h2>

      {reviews.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">
            No reviews available for this subject yet.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {reviews.map((review: TReviews) => (
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
  );
};

export default Feedback;
