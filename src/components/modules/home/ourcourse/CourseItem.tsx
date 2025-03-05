import { ISubject } from "@/types";
import Image from "next/image";
import React from "react";

const CourseItem = ({ data: course }: { data: ISubject }) => {
console.log(course);
  
    return (
      <div className="bg-white border rounded-lg shadow-md p-6 text-center">
        <div className="relative w-full h-48 mb-4">
          <Image
            src={course?.image || "/placeholder-image.png"}
            alt={course.name || "Course Image"}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        <h3 className="text-xl font-semibold mb-2">{course.name || "Untitled"}</h3>
        <a
          href="#"
          className="bg-green-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-green-700"
        >
          LEARN MORE
        </a>
      </div>
    );
  };
  

export default CourseItem;
