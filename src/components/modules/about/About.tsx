import Banner from "@/components/shared/banner";
import PrimaryButton from "@/components/shared/PrimaryButton";
import Image from "next/image";
import React from "react";

const About = () => {
  return (
    <section>
      <Banner title="About" path="Home - About" />
      <div className="container mx-auto px-4 lg:px-8 py-8">
        {/* About Us Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16 ">
          <div className="flex justify-center">
            <Image
              src="https://templatekits.themewarrior.com/inlingo-new/wp-content/uploads/sites/102/2023/08/YLZ8PNG.jpg"
              alt="About Us"
              width={600}
              height={400}
              className="rounded-lg shadow-lg w-full max-w-md md:max-w-none"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              We are Dedicated to the Best of English Course
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Learn lorem ipsum dolor sit amet consectetur. Montes quisque arcu
              malesuada tristique at. Lorem ipsum dolor sit amet consectetur
              adipiscing elit.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Sagittis quisque dui id facilisis ut viverra arcu arcu. Lorem
              ipsum dolor sit amet consectetur adipiscing elit.
            </p>
          </div>
        </div>

        {/* Learning Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Teach English in the Best Way
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Learn lorem ipsum dolor sit amet consectetur. Montes quisque arcu
              malesuada tristique at. Lorem ipsum dolor sit amet consectetur
              adipiscing elit.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Sagittis quisque dui id facilisis ut viverra arcu arcu. Lorem
              ipsum dolor sit amet consectetur adipiscing elit.
            </p>
            <PrimaryButton>Learn More</PrimaryButton>
          </div>
          <div className="flex justify-center">
            <Image
              src="https://templatekits.themewarrior.com/inlingo-new/wp-content/uploads/sites/102/2023/08/6RA8AG3-about.jpg" // Replace with your image path
              alt="Learning"
              width={600}
              height={400}
              className="rounded-lg shadow-lg w-full max-w-md md:max-w-none"
            />
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md text-center"
            >
              <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-4">
                {/* Add an icon here */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 20h9M12 4h9M4 9h16M4 15h16"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Experienced Instructors
              </h3>
              <p className="text-gray-600">
                Learn from skilled and certified instructors who are experts in
                immersive learning techniques.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
