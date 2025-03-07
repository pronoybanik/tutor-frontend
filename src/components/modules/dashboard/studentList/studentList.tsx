"use client";

import { ISubject } from "@/types";

import NMContainer from "@/components/ui/core/NMContainer";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import React, { useState, useEffect } from "react";
import { deleteSubject } from "@/services/Subject";
import Image from "next/image";

const StudentList = ({ data }: { data: ISubject[] }) => {
  const [subjectData, setSubjectData] = useState<ISubject[]>(data);

  useEffect(() => {
    console.log("Subject Data:", subjectData);
  }, [subjectData]);

  const handleDelete = async (id: string) => {
    const result = await deleteSubject(id);
    if (result.success) {
      toast.success("Subject deleted successfully!");
      setSubjectData((prev) => prev.filter((subject) => subject._id !== id));
      return true;
    } else {
      toast.error("Failed to delete subject.");
      return false;
    }
  };

  return (
    <NMContainer>
      <h1 className="text-xl font-bold mb-4">Subject List</h1>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200 shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Grade Level</th>
              <th className="border border-gray-300 px-4 py-2">Hourly Rate</th>
              <th className="border border-gray-300 px-4 py-2">User ID</th>
              <th className="border border-gray-300 px-4 py-2">Image</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subjectData?.map((subject) => (
              <tr key={subject._id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{subject.name || "N/A"}</td>
                <td className="border border-gray-300 px-4 py-2">{subject.gradeLevel || "N/A"}</td>
                <td className="border border-gray-300 px-4 py-2">${subject.hourly || "N/A"}</td>
                <td className="border border-gray-300 px-4 py-2">{subject.userId || "N/A"}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <Image
                    src={subject.image || "/placeholder.jpg"}
                    height={50}
                    width={50}
                    alt="subject"
                    className="w-12 h-12 rounded-lg"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(subject._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </NMContainer>
  );
};

export default StudentList;