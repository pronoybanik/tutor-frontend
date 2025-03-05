import CourseDetails from "@/components/modules/course/CourseDetails";

const CourseDetailsPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  return <CourseDetails id={id} />;
};

export default CourseDetailsPage;
