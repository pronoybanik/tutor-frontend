import Image from 'next/image';
import React from 'react';

const CoursesSection = () => {
  return (
    <div className="bg-gray-50 py-12 px-6 md:px-12 lg:px-24">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-2">Our Courses</h2>
        <p className="text-lg text-gray-600">
          Our team of experienced and certified instructors is committed to helping you
          achieve fluency and confidence in English.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* General English */}
        <div className="bg-white border rounded-lg shadow-md p-6 text-center">
          <Image
          width={500}
          height={500}
            src="https://templatekits.themewarrior.com/inlingo-new/wp-content/uploads/sites/102/2023/08/JYRVPG6.jpg"
            alt="General English"
            className="rounded-lg w-full h-48 object-cover mb-4"
          />
          <h3 className="text-xl font-semibold mb-2">General English</h3>
          <p className="text-gray-600 mb-4">
            Build a strong foundation in reading, writing, listening, and speaking skills.
          </p>
          <a
            href="#"
            className="bg-green-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-green-700">
            LEARN MORE
          </a>
        </div>

        {/* Business English */}
        <div className="bg-white border rounded-lg shadow-md p-6 text-center">
          <img
            src="/images/business-english.jpg"
            alt="Business English"
            className="rounded-lg w-full h-48 object-cover mb-4"
          />
          <h3 className="text-xl font-semibold mb-2">Business English</h3>
          <p className="text-gray-600 mb-4">
            Build a strong foundation in reading, writing, listening, and speaking skills.
          </p>
          <a
            href="#"
            className="bg-green-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-green-700">
            LEARN MORE
          </a>
        </div>

        {/* Exam Preparation */}
        <div className="bg-white border rounded-lg shadow-md p-6 text-center">
          <img
            src="/images/exam-preparation.jpg"
            alt="Exam Preparation"
            className="rounded-lg w-full h-48 object-cover mb-4"
          />
          <h3 className="text-xl font-semibold mb-2">Exam Preparation</h3>
          <p className="text-gray-600 mb-4">
            Build a strong foundation in reading, writing, listening, and speaking skills.
          </p>
          <a
            href="#"
            className="bg-green-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-green-700">
            LEARN MORE
          </a>
        </div>
      </div>
    </div>
  );
};

export default CoursesSection;
