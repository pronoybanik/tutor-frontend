import { ISubject } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Clock, Star, Users, ArrowRight, Calendar, DollarSign } from "lucide-react";

const CourseItem = ({ data: course }: { data: ISubject }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="group relative bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl hover:border-gray-300 transition-all duration-300 transform hover:-translate-y-1">
      {/* Course Image Container */}
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <Image
          src={course?.image || "/placeholder-image.png"}
          alt={course.name || "Course Image"}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          width={500}
          height={300}
        />
        
        {/* Price Badge */}
        <div className="absolute top-4 right-4">
          <div className="bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 shadow-sm">
            <div className="flex items-center gap-1 text-sm font-semibold text-gray-900">
              <DollarSign className="w-3 h-3" />
              {formatPrice(course?.hourly || 0)}/hr
            </div>
          </div>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-4 left-4">
          <div className="bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 shadow-sm">
            <div className="flex items-center gap-1 text-sm font-medium text-gray-900">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span>4.8</span>
            </div>
          </div>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Course Content */}
      <div className="p-6">
        {/* Course Meta Info */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Calendar className="w-3 h-3" />
            <span>{formatDate(course?.createdAt || new Date().toISOString())}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Users className="w-3 h-3" />
            <span>124 students</span>
          </div>
        </div>

        {/* Course Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {course?.name || "Untitled Course"}
        </h3>

        {/* Course Description */}
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
          {course?.desriptions || "Discover comprehensive learning materials and expert guidance in this carefully crafted course designed to help you master new skills and advance your career."}
        </p>

        {/* Course Stats */}
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>8 weeks</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>Beginner</span>
          </div>
        </div>

        {/* Action Button */}
        <Link
          href={`/course/${course?._id}`}
          className="group/btn w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <span>Enroll Now</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
        </Link>
      </div>

      {/* Hover Border Effect */}
      <div className="absolute inset-0 rounded-2xl border-2 border-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
};

export default CourseItem;