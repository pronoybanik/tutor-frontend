import Image from "next/image";

const HeroSection = () => {
  return (
    <div className="relative">
      {/* Banner Section */}
      <div className="relative h-screen flex items-center justify-center text-white">
        <Image
          src="https://img.freepik.com/premium-photo/homeschooling-concept-teacher-schoolgirl-lesson-back-school-little-girl-man-against-blackboard-knowledge-day-concept-child-with-teacher-classroom-school-happy-teachers-day_474717-27420.jpg?ga=GA1.1.2049195438.1739283506&semt=ais_hybrid"
          alt="Banner Image"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-[-1]"
        />
        <div className="text-center px-6 md:px-0">
          <h1 className="text-4xl md:text-6xl font-bold">
            Learn English Online with Professional Instructors
          </h1>
          <p className="mt-4 max-w-2xl mx-auto">
            Your English progress is what matters the most to us. If you’re not
            satisfied after 12 weeks, you get your money back.
          </p>
          <button className="mt-6 bg-green-500 text-black py-3 px-6 rounded-full font-semibold hover:bg-green-400">
            Start Now
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="flex justify-center gap-12 text-white bg-black py-8">
        <div className="text-center">
          <span className="text-green-400 text-3xl font-bold">10</span>
          <p>Years of Excellence</p>
        </div>
        <div className="text-center">
          <span className="text-green-400 text-3xl font-bold">96%</span>
          <p>Recommended by Students</p>
        </div>
        <div className="text-center">
          <span className="text-green-400 text-3xl font-bold">40K</span>
          <p>Students from 100 Countries</p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
