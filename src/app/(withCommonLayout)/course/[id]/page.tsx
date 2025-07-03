
"use client"

import CourseDetails from "@/components/modules/course/CourseDetails";
import { useParams } from "next/navigation";

const CourseDetailsPage = () => {
  const params = useParams();
  const id = params?.id as string; 

  if (!id) {
    return <p className="text-center text-red-500">Invalid Blog ID</p>;
  }

  return <CourseDetails id={id} />;
};

export default CourseDetailsPage;
