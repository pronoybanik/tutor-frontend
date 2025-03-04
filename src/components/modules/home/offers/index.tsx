import Image from "next/image";
import React from "react";

const OfferData = [
  {
    image:
      "https://templatekits.themewarrior.com/inlingo-new/wp-content/uploads/sites/102/2023/08/55NEEXR.jpg",
    title: "1-on-1 lessons",
    description:
      "Find teachers from all over the world sharing their languages, dialects, and cultures.",
  },
  {
    image:
      "https://templatekits.themewarrior.com/inlingo-new/wp-content/uploads/sites/102/2023/08/JYRVPG6.jpg",
    title: "Group Class",
    description:
      "Find teachers from all over the world sharing their languages, dialects, and cultures.",
  },
  {
    image:
      "https://templatekits.themewarrior.com/inlingo-new/wp-content/uploads/sites/102/2023/08/5G34MSS.jpg",
    title: "Practice for Free",
    description:
      "Find teachers from all over the world sharing their languages, dialects, and cultures.",
  },
];

const Offers = () => {
  return (
    <div className="bg-white py-12 px-6 md:px-12 lg:px-24">
      <div className="text-center mb-12 max-w-2xl mx-auto">
        <h1 className="text-[#1e3799] uppercase font-semibold">offers</h1>
        <h2 className="text-4xl font-semibold my-4 font-mono uppercase">
          The Inligo Difference
        </h2>
        <p className="text-sm text-gray-600 ">
          Our team of experienced and certified instructors is committed to
          helping you achieve fluency and confidence in English.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {OfferData.map((item, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <div className="relative w-full aspect-video mb-4 rounded-lg overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600 text-sm">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Offers;