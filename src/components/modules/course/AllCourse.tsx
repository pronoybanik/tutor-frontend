"use client";

import { useState, useMemo } from "react";
import { ISubject } from "@/types";
import CourseItem from "../home/ourcourse/CourseItem";
import { Search, Filter, SortAsc, SortDesc } from "lucide-react";

const AllCourse = ({ subject }: { subject: ISubject[] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (value: string) => {
    setSortOrder(value);
    setIsFilterOpen(false);
  };

  const filteredSubjects = useMemo(() => {
    return subject
      .filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (sortOrder === "asc") return a.hourly - b.hourly;
        if (sortOrder === "desc") return b.hourly - a.hourly;
        if (sortOrder === "name") return a.name.localeCompare(b.name);
        return 0;
      });
  }, [subject, searchTerm, sortOrder]);

  const getSortIcon = () => {
    if (sortOrder === "asc") return <SortAsc className="w-4 h-4" />;
    if (sortOrder === "desc") return <SortDesc className="w-4 h-4" />;
    return <Filter className="w-4 h-4" />;
  };

  const getSortLabel = () => {
    switch (sortOrder) {
      case "asc":
        return "Price: Low to High";
      case "desc":
        return "Price: High to Low";
      case "name":
        return "Name: A to Z";
      default:
        return "Sort By";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              All Courses
            </h1>
            <p className="text-gray-600">
              Discover {subject.length} courses tailored to your learning goals
            </p>
          </div>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search courses by name..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors min-w-[200px] justify-between"
            >
              <div className="flex items-center gap-2">
                {getSortIcon()}
                <span className="font-medium text-gray-700">
                  {getSortLabel()}
                </span>
              </div>
              <svg
                className={`w-4 h-4 transition-transform ${
                  isFilterOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isFilterOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <div className="py-2">
                  <button
                    onClick={() => handleSortChange("default")}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Filter className="w-4 h-4" />
                      Default Order
                    </div>
                  </button>
                  <button
                    onClick={() => handleSortChange("name")}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <SortAsc className="w-4 h-4" />
                      Name: A to Z
                    </div>
                  </button>
                  <button
                    onClick={() => handleSortChange("asc")}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <SortAsc className="w-4 h-4" />
                      Price: Low to High
                    </div>
                  </button>
                  <button
                    onClick={() => handleSortChange("desc")}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <SortDesc className="w-4 h-4" />
                      Price: High to Low
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results Counter */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            {filteredSubjects.length === subject.length
              ? `Showing all ${subject.length} courses`
              : `Showing ${filteredSubjects.length} of ${subject.length} courses`}
            {searchTerm && (
              <span className="ml-1">
                for <span className="font-medium">{searchTerm}</span>
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Course Items */}
      {filteredSubjects.length > 0 ? (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
          {filteredSubjects.map((product: ISubject, idx: number) => (
            <div
              key={idx}
              
            >
              <CourseItem data={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No courses found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search terms or filters to find what youre
              looking for.
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clear Search
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllCourse;
