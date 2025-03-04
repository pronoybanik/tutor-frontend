import Image from "next/image";

export default function About() {
  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">About</h1>
        </div>

        {/* About Us Section */}
        <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
          <div>
            <Image
              src="/images/about-us.jpg" // Replace with your image path
              alt="About Us"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">We are Dedicated to the Best of English Course</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Learn lorem ipsum dolor sit amet consectetur. Montes quisque arcu
              malesuada tristique at. Lorem ipsum dolor sit amet consectetur
              adipiscing elit. Lorem ipsum dolor sit amet consectetur adipiscing
              elit.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Sagittis quisque dui id facilisis ut viverra arcu arcu. Lorem ipsum
              dolor sit amet consectetur adipiscing elit.
            </p>
          </div>
        </div>

        {/* Learning Section */}
        <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Teach English in the Best Way</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Learn lorem ipsum dolor sit amet consectetur. Montes quisque arcu
              malesuada tristique at. Lorem ipsum dolor sit amet consectetur
              adipiscing elit. Lorem ipsum dolor sit amet consectetur adipiscing
              elit.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Sagittis quisque dui id facilisis ut viverra arcu arcu. Lorem ipsum
              dolor sit amet consectetur adipiscing elit.
            </p>
            <button className="px-6 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600">
              Learn More
            </button>
          </div>
          <div>
            <Image
              src="/images/learning.jpg" // Replace with your image path
              alt="Learning"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md"
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
              <p className="text-gray-600 text-center">
                Learn from skilled and certified instructors who are experts in
                immersive learning techniques.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}