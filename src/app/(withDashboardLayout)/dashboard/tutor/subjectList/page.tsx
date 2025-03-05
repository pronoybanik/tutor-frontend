import StudentList from "@/components/modules/dashboard/studentList/studentList";
import { getTutorCreatedSubject } from "@/services/Subject";
import React from "react";

const SubjectListPage = async () => {
  const data = await getTutorCreatedSubject();

  return (
    <div>
      <StudentList data={data.data} />
    </div>
  );
};

export default SubjectListPage;
