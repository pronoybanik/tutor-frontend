import StudentList from "@/components/modules/dashboard/studentList/studentList";
import { getTutorCreatedSubject } from "@/services/Subject";
import React from "react";

const SubjectListPage = async () => {
  const response = await getTutorCreatedSubject();
  const data = response?.data;

  if (!data || !Array.isArray(data) || data.length === 0) {
    return <div>No Subject available.</div>; // Fallback UI
  }

  return (
    <div>
      <StudentList data={data} />
    </div>
  );
};

export default SubjectListPage;
