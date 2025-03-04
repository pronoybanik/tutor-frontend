import Image from "next/image";

const CoursesSection = ({ data }) => {
  return (
    <div className="bg-gray-50 py-12 px-6 md:px-12 lg:px-24">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-2">Our Courses</h2>
        <p className="text-lg text-gray-600">
          Our team of experienced and certified instructors is committed to helping you achieve fluency and confidence in English.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {data.map((course) => (
          <div key={course.id} className="bg-white border rounded-lg shadow-md p-6 text-center">
            <Image
              width={500}
              height={500}
              src={course.image}
              alt={course.title}
              className="rounded-lg w-full h-48 object-cover mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
            <p className="text-gray-600 mb-4">{course.description}</p>
            <a
              href="#"
              className="bg-green-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-green-700"
            >
              LEARN MORE
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesSection;