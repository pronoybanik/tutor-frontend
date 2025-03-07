import ManageCategory from "@/components/modules/adminmanagement/category";
import { getAllCategory } from "@/services/Category";
import React from "react";

const ManageCategoryPage = async () => {
  const { data } = await getAllCategory();
  
  return (
    <div>
      <ManageCategory category={data} />
    </div>
  );
};

export default ManageCategoryPage;
