"use server";

import StudentManage from "@/components/modules/adminmanagement/student/SudentManage";
import { getAllUserProfileInfo } from "@/services/Profile";
import React from "react";

const StudentListPage = async () => {
  const data = await getAllUserProfileInfo();
  console.log(data);

  // const onChangeRole = async (id, role) => {
  //   const res = await updateProfile(id, role);
  //   console.log("res one", res);
  // };

  return (
    <div>
      <StudentManage ProfileData={data?.data}  />
    </div>
  );
};

export default StudentListPage;
