"use client";
import Banner from "@/components/shared/banner";
import PrimaryButton from "@/components/shared/PrimaryButton";
import NMContainer from "@/components/ui/core/NMContainer";
import { useUser } from "@/context/UserContext";
import { createBooking } from "@/services/Booking";
import { getSingleSubject } from "@/services/Subject";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const CourseDetails = ({ id }: { id: string }) => {
  const [course, setCourse] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await getSingleSubject(id);
        console.log("subjectdata", res.data);

        setCourse(res.data);
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };

    fetchCourse();
  }, [id]);

  const handleRequest = async () => {
    if (!selectedDate) {
      alert("Please select a date before requesting.");
      return;
    }
    const data = {
      studentId: user?.userId,
      tutorId: course?.userId?._id,
      subjectId: id,
      date: selectedDate,
      price: parseInt(course?.hourly),
    };

    try {
      const res = await createBooking(data);

      if (res.success) {
        toast.success(res.message);
        router.push("/dashboard/student/booksessions");
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }

    console.log("Requested Course:", data);
  };

  if (!course) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <section>
      <NMContainer>
        <Banner title="Course details" path="Home -> Course" />
      </NMContainer>
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg my-10">
        <Image
          width={300}
          height={300}
          src={course.image}
          alt={course.name}
          className="w-full h-64 object-cover rounded-md"
        />
        <h1 className="text-3xl font-bold mt-4">{course.name}</h1>
        <p className="text-gray-600 mt-2">Grade Level: {course.gradeLevel}</p>
        <p className="text-gray-600">Hourly Rate: ${course.hourly}</p>
        <p className="text-gray-600">Email: {course.userId.email}</p>
        <p className="text-gray-600">Name: {course.userId.name}</p>
        <p className="text-gray-600">Role: {course.userId.role}</p>

        <div className="mt-4">
          <label className="block font-semibold text-gray-700 mb-2">
            Select a Date:
          </label>
          <select
            className="w-full p-2 border rounded-md"
            onChange={(e) => setSelectedDate(e.target.value)}
            value={selectedDate}
          >
            <option value="">-- Choose a date --</option>
            {course.dateTimes.map((date: string, index: number) => (
              <option key={index} value={date}>
                {new Date(date).toLocaleString()}
              </option>
            ))}
          </select>
        </div>

        <PrimaryButton type="submit" className="mt-4" handler={handleRequest}>
          Request Course
        </PrimaryButton>
      </div>
    </section>
  );
};

export default CourseDetails;
