"use client";
import BlogCard from "@/components/modules/blog/BlogCard";
import { useGetBlogsQuery } from "@/redux/api/Blog/blogApi";
import { IBlog } from "@/types";
import React from "react";

const BlogsPage = () => {
  const { data, error, isLoading } = useGetBlogsQuery();

  // Extract blogs data safely
  const blogs = data?.data as IBlog[] | undefined;

  return (
    <div className="bg-gray-50  p-6 mt-16 py-16">
      <div className="text-center mb-12 max-w-2xl mx-auto">
        <h1 className="text-[#1e3799] uppercase font-semibold">--- blogs ---</h1>
        <h2 className="text-4xl font-semibold my-4 font-mono uppercase">
          Our blogs 
        </h2>
        <p className="text-sm text-gray-600 ">
          Our team of experienced and certified instructors is committed to
          helping you achieve fluency and confidence in English.
        </p>
      </div>

      {isLoading && (
        <p className="text-center text-gray-500">Loading blogs...</p>
      )}

      {/* Show error message if request fails */}
      {error && (
        <p className="text-center text-red-500">Failed to load blogs!</p>
      )}

      {/* Render blogs when available */}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 w-full max-w-7xl mx-auto">
        {blogs && blogs.length > 0
          ? blogs.map((blog: IBlog) => <BlogCard key={blog._id} blog={blog} />)
          : !isLoading && (
              <p className="text-center text-gray-500">No blogs available.</p>
            )}
      </div>
    </div>
  );
};

export default BlogsPage;
