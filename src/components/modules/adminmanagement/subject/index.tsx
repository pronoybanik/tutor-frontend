
"use client"

import PrimaryButton from "@/components/shared/PrimaryButton";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const SubjectManage = () => {
  const router = useRouter();
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Manage subject</h1>
        <div className="flex items-center gap-2">
          <PrimaryButton
            handler={() => router.push("/dashboard/tutor/createsubject")}
          >
            Add Subject <Plus />
          </PrimaryButton>

          {/* <DiscountModal
            setSelectedIds={setSelectedIds}
            selectedIds={selectedIds}
          /> */}
        </div>
      </div>
      {/* <NMTable columns={columns} data={products || []} />
      <TablePagination totalPage={meta?.totalPage} /> */}
    </div>
  );
};

export default SubjectManage;
