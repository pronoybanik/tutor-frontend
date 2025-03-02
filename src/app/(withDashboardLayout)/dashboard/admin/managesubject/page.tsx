import SubjectManage from "@/components/modules/adminmanagement/subject";
import { getAllSubject } from "@/services/Subject";
import React from "react";

const ManageSubjectPage = async () => {
  const { data } = await getAllSubject();

  return (
    <div>
      <SubjectManage subjectData={data} />
    </div>
  );
};

export default ManageSubjectPage;
