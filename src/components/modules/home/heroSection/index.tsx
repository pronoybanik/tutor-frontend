import PrimaryButton from "@/components/shared/PrimaryButton";
import Image from "next/image";

const HeroSection = () => {
  return (
    <div className="relative">
      {/* Banner Section */}
      <div className="relative lg:h-[700px] h-screen flex items-center justify-center text-white">
        {/* Image with Black Gradient Overlay */}
        <div className="absolute inset-0 z-[-1]">
          <Image
            src="https://images.pexels.com/photos/5538571/pexels-photo-5538571.jpeg?auto=compress&cs=tinysrgb&w=1000"
            alt="Banner Image"
            layout="fill"
            objectFit="cover"
            className="brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="text-center px-6 md:px-8 lg:px-12">
          <div className="p-6 rounded-lg lg:w-6xl">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold">
              Learn English Online with Professional Instructors
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-sm md:text-base">
              Your English progress is what matters the most to us. If you’re
              not satisfied after 12 weeks, you get your money back.
            </p>
            <PrimaryButton className="mt-4 py-6 px-6">start Now</PrimaryButton>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-12 text-white bg-black py-8 px-4">
        <div className="text-center">
          <span className="text-[#1dd1a1] text-3xl font-bold">10</span>
          <p className="mt-2">Years of Excellence</p>
        </div>
        <div className="text-center">
          <span className="text-[#1dd1a1] text-3xl font-bold">96%</span>
          <p className="mt-2">Recommended by Students</p>
        </div>
        <div className="text-center">
          <span className="text-[#1dd1a1] text-3xl font-bold">40K</span>
          <p className="mt-2">Students from 100 Countries</p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
