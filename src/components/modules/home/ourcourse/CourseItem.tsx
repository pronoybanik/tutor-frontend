import { ISubject } from "@/types";
import Image from "next/image";
import Link from "next/link";

const CourseItem = ({ data: course }: { data: ISubject }) => {
  console.log(course);

  return (
    <Link
      href={`/course/${course?._id}`}
      className="relative overflow-hidden rounded-lg shadow-sm transition hover:shadow-lg"
    >
      {/* Course Image */}
      <Image
        src={course?.image || "/placeholder-image.png"}
        alt={course.name || "Course Image"}
        className="absolute inset-0 h-full w-full object-cover"
        width={500}
        height={300}
      />

      {/* Overlay with Course Info */}
      <div className="relative bg-gradient-to-t from-gray-900/50 to-gray-900/25 pt-32 sm:pt-48 lg:pt-64">
        <div className="p-4 sm:p-6">
          {/* Course Date */}
          <time
            dateTime={course?.createdAt || new Date().toISOString()}
            className="block text-xs text-white/90"
          >
            {new Date(course.createdAt).toLocaleDateString()}
          </time>

          {/* Course Name */}
          <h3 className="mt-0.5 text-lg text-white font-semibold">
            {course.name || "Untitled"}
          </h3>

          {/* Course Description */}
          <p className="mt-2 line-clamp-3 text-sm/relaxed text-white/95">
            {/* {course.description || "No description available for this course."} */}
            {"No description available for this course."}
          </p>

          {/* Learn More Button */}
          <Link
            href={`/course/${course?._id}`}
            className="group mt-4 inline-flex items-center  gap-1 text-sm font-medium text-[#1dd1a1]"
          >
            Find out more
            <span
              aria-hidden="true"
              className="block transition-all group-hover:ms-0.5 rtl:rotate-180"
            >
              &rarr;
            </span>
          </Link>
        </div>
      </div>
    </Link>
  );
};

export default CourseItem;
