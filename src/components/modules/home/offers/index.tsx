import Image from "next/image";
import React from "react";

const Offers = () => {
  return (
    <div className="bg-white py-12 px-6 md:px-12 lg:px-24">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">The Inligo Difference</h2>
        <p className="text-lg text-gray-600">
          Our team of experienced and certified instructors is committed to
          helping you achieve fluency and confidence in English.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* 1-on-1 Lessons */}
        <div className="text-center border rounded-lg shadow-md p-6">
          <Image
            width={400}
            height={400}
            src="https://templatekits.themewarrior.com/inlingo-new/wp-content/uploads/sites/102/2023/08/JYRVPG6.jpg"
            alt="1-on-1 lessons"
            className="rounded-lg w-full h-48 object-cover mb-4"
          />
          <h3 className="text-xl font-semibold mb-2">1-on-1 lessons</h3>
          <p className="text-gray-600 mb-4">
            Find teachers from all over the world sharing their languages,
            dialects, and cultures.
          </p>
          <a href="#" className="text-blue-600 font-semibold hover:underline">
            FIND MY TEACHER &rarr;
          </a>
        </div>

        {/* Group Class */}
        <div className="text-center border rounded-lg shadow-md p-6">
          <img
            src="/images/group-class.jpg"
            alt="Group Class"
            className="rounded-lg w-full h-48 object-cover mb-4"
          />
          <h3 className="text-xl font-semibold mb-2">Group Class</h3>
          <p className="text-gray-600 mb-4">
            Find teachers from all over the world sharing their languages,
            dialects, and cultures.
          </p>
          <a href="#" className="text-blue-600 font-semibold hover:underline">
            FIND MY TEACHER &rarr;
          </a>
        </div>

        {/* Practice for Free */}
        <div className="text-center border rounded-lg shadow-md p-6">
          <img
            src="/images/practice-free.jpg"
            alt="Practice for Free"
            className="rounded-lg w-full h-48 object-cover mb-4"
          />
          <h3 className="text-xl font-semibold mb-2">Practice for Free</h3>
          <p className="text-gray-600 mb-4">
            Find teachers from all over the world sharing their languages,
            dialects, and cultures.
          </p>
          <a href="#" className="text-blue-600 font-semibold hover:underline">
            FIND MY TEACHER &rarr;
          </a>
        </div>
      </div>
    </div>
  );
};

export default Offers;
