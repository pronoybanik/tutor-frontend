import AllSubject from "@/components/modules/course/AllCourse";
import Banner from "@/components/shared/banner";
import NMContainer from "@/components/ui/core/NMContainer";
import { getAllSubject } from "@/services/Subject";
import React from "react";

const CoursePage = async () => {
  const { data: subjectData } = await getAllSubject();
  console.log("prient 1", subjectData);

  return (
    <div className="mt-4">
      <NMContainer>
        <Banner path="Home -> Course" title="Course" />

        <AllSubject subject={subjectData} />
      </NMContainer>
    </div>
  );
};

export default CoursePage;
