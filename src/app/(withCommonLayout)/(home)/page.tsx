import HeroSection from "@/components/modules/home/heroSection";
import Offers from "@/components/modules/home/offers";
import CoursesSection from "@/components/modules/home/ourcourse";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <Offers />
      <CoursesSection />
    </div>
  );
};

export default HomePage;
