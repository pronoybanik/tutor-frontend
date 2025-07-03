import { ISubject } from "@/types";
import CourseItem from "./CourseItem";
import Link from "next/link";
import PrimaryButton from "@/components/shared/PrimaryButton";

const CoursesSection = ({ data }: { data: ISubject[] }) => {
  // Corrected data type to array
  return (
    <div className="bg-gray-50 py-12  mt-16 px-6 md:px-12 lg:px-24">
      <div className="text-center mb-12 max-w-2xl mx-auto">
        <h1 className="text-[#1dd1a1] uppercase font-semibold">
          --- courses ---
        </h1>
        <h2 className="text-4xl font-semibold my-4 font-mono uppercase">
          our courses
        </h2>
        <p className="text-sm text-gray-600 ">
          Our team of experienced and certified instructors is committed to
          helping you achieve fluency and confidence in English.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto  max-w-7xl">
        {data?.slice(0, 3).map((course) => (
          <CourseItem key={course._id} data={course} />
        ))}
      </div>
      <div className="mt-8 flex justify-center ">
        <Link href={"/course"}>
          <PrimaryButton>view all Course </PrimaryButton>
        </Link>
      </div>
    </div>
  );
};

export default CoursesSection;
