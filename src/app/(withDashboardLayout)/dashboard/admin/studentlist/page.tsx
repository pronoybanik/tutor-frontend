"use server";

import StudentManage from "@/components/modules/adminmanagement/student/SudentManage";
import { getAllUserProfileInfo } from "@/services/Profile";
import React from "react";

const StudentListPage = async () => {
  const data = await getAllUserProfileInfo();


  return (
    <div>
      <StudentManage ProfileData={data?.data}  />
    </div>
  );
};

export default StudentListPage;
