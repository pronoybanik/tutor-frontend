import { ISubject } from "@/types";
import CourseItem from "../home/ourcourse/CourseItem";


const AllSubject = ({ subject }: { subject: ISubject[] }) => {
  return (
    <div className="flex gap-8 my-10">
      {/* <div className="w-full max-w-sm">
        <FilterSidebar />
      </div> */}

      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
          {subject?.map((product: ISubject, idx: number) => (
            <CourseItem key={idx} data={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllSubject;
