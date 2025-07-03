/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { 
  Calendar, 
  Clock, 
  DollarSign, 
  User, 
  Mail, 
  GraduationCap, 
  Star, 
  Users, 
  BookOpen,
  Shield,
  Award,
  CheckCircle,
  MessageCircle
} from "lucide-react";

const CourseDetails = ({ id }: { id: string }) => {
  const [course, setCourse] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setIsLoading(true);
        const res = await getSingleSubject(id);
        setCourse(res.data);
      } catch (error) {
        console.error("Error fetching course details:", error);
        toast.error("Failed to load course details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const handleRequest = async () => {
    if (!selectedDate) {
      toast.error("Please select a date before requesting.");
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
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isLoading) {
    return (
      <section>
        <NMContainer>
          <Banner title="Course details" path="Home -> Course" />
        </NMContainer>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-gray-200 rounded-xl h-96 mb-6"></div>
                <div className="space-y-4">
                  <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
              <div className="bg-gray-200 rounded-xl h-96"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!course) {
    return (
      <section>
        <NMContainer>
          <Banner title="Course details" path="Home -> Course" />
        </NMContainer>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h2>
            <p className="text-gray-600">The course you are looking for does not exist or has been removed.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section>
      <NMContainer>
        <Banner title="Course details" path="Home -> Course" />
      </NMContainer>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Course Image */}
            <div className="relative overflow-hidden rounded-2xl shadow-lg mb-8">
              <Image
                width={800}
                height={400}
                src={course.image}
                alt={course.name}
                className="w-full h-96 object-cover"
              />
              <div className="absolute top-6 left-6">
                <div className="bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
                  <div className="flex items-center gap-2 text-lg font-bold text-gray-900">
                    <DollarSign className="w-5 h-5" />
                    {formatPrice(course.hourly)}/hour
                  </div>
                </div>
              </div>
              <div className="absolute top-6 right-6">
                <div className="bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>4.9 (156 reviews)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Course Info */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <div className="mb-6">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{course.name}</h1>
                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" />
                    <span>Grade Level: {course.gradeLevel}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>245 students enrolled</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    <span>12 lessons</span>
                  </div>
                </div>
              </div>

              {/* Course Description */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Course Description</h3>
                <p className="text-gray-700 leading-relaxed">
                  {course.description || "Master the fundamentals and advanced concepts in this comprehensive course. Our expert instructor will guide you through practical exercises and real-world applications to ensure you gain the skills needed to excel in your studies."}
                </p>
              </div>

              {/* What You'll Learn */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">What You all Learn</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    "Master core concepts and principles",
                    "Apply knowledge to real-world scenarios",
                    "Develop problem-solving skills",
                    "Build confidence in the subject",
                    "Prepare for exams and assessments",
                    "Interactive learning experience"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Course Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-gray-900">Certified Tutor</h4>
                  <p className="text-sm text-gray-600">Expert instruction</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <Award className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-gray-900">Achievement</h4>
                  <p className="text-sm text-gray-600">Certificate included</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <MessageCircle className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-gray-900">Support</h4>
                  <p className="text-sm text-gray-600">24/7 assistance</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              {/* Tutor Information */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Meet Your Tutor</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{course.userId.name}</h4>
                      <p className="text-sm text-gray-600 capitalize">{course.userId.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span>{course.userId.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">4.9</span>
                    </div>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-600">156 reviews</span>
                  </div>
                </div>
              </div>

              {/* Booking Section */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Book a Session</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-gray-900">Price per hour</span>
                    </div>
                    <span className="text-2xl font-bold text-green-600">
                      {formatPrice(course.hourly)}
                    </span>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      Select a Date & Time
                    </label>
                    <select
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      onChange={(e) => setSelectedDate(e.target.value)}
                      value={selectedDate}
                    >
                      <option value="">-- Choose a date --</option>
                      {course.dateTimes.map((date: string, index: number) => (
                        <option key={index} value={date}>
                          {formatDateTime(date)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <PrimaryButton 
                    type="submit" 
                    className="w-full mt-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]" 
                    handler={handleRequest}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Clock className="w-5 h-5" />
                      <span>Request Course</span>
                    </div>
                  </PrimaryButton>
                </div>
              </div>

              {/* Additional Info */}
              <div className="bg-blue-50 rounded-2xl p-6">
                <h4 className="font-semibold text-blue-900 mb-2">Need Help?</h4>
                <p className="text-sm text-blue-800 mb-4">
                  Have questions about this course? Contact our support team.
                </p>
                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                  Contact Support →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseDetails;