import FAQ from "@/components/modules/home/FAQ/FAQ";
import HeroSection from "@/components/modules/home/heroSection";
import Offers from "@/components/modules/home/offers";
import CoursesSection from "@/components/modules/home/ourcourse";
import TutorSection from "@/components/modules/home/ourtutor";
import { getAllTutorProfileInfo } from "@/services/Profile";
import { getAllSubject } from "@/services/Subject";
import React from "react";
import BlogSection from "@/components/modules/blog/BlogSection";

const HomePage = async () => {
  const courseData = await getAllSubject();
  const tutorData = await getAllTutorProfileInfo();

  return (
    <div>
      <HeroSection />
      <Offers />
      <CoursesSection data={courseData?.data} />
      <TutorSection data={tutorData?.data} />
      <BlogSection />
      <FAQ />
    </div>
  );
};

export default HomePage;
