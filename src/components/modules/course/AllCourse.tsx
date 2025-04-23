"use client";

import { useState } from "react";
import { ISubject } from "@/types";
import CourseItem from "../home/ourcourse/CourseItem";

const AllSubject = ({ subject }: { subject: ISubject[] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("default");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSortOrder(value);
    console.log("Sort Order:", value);
  };

  const filteredSubjects = subject
    .filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "asc") return a.hourly - b.hourly;
      if (sortOrder === "desc") return b.hourly - a.hourly;
      return 0;
    });

  return (
    <div className="flex flex-col gap-6 my-10 ">
      {/* Search & Sort Controls */}
      <div className="flex flex-col md:flex-row gap-4 w">
        <input
          type="text"
          placeholder="Search by subject name..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="px-4 py-2 border rounded-lg w-full md:w-1/3"
        />

        <select
          value={sortOrder}
          onChange={handleSortChange}
          className="px-4 py-2 border rounded-lg w-full md:w-1/4"
        >
          <option value="default">Sort By</option>
          <option value="asc">Hourly Rate: Low to High</option>
          <option value="desc">Hourly Rate: High to Low</option>
        </select>
      </div>

      {/* Course Items */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredSubjects.map((product: ISubject, idx: number) => (
          <CourseItem key={idx} data={product} />
        ))}
      </div>
    </div>
  );
};

export default AllSubject;
