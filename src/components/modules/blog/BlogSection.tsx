"use client";

import { useGetBlogsQuery } from "@/redux/api/Blog/blogApi";
import { IBlog } from "@/types";
import React from "react";
import BlogCard from "./BlogCard";

const BlogSection = () => {
  const { data, error, isLoading } = useGetBlogsQuery();


  const blogs = data?.data as IBlog[] | undefined;

  return (
    <div className="bg-gray-50 py-16">
      <div className="text-center mb-12 max-w-2xl mx-auto">
        <h1 className="text-[#1dd1a1] uppercase font-semibold">
          --- blogs ---
        </h1>
        <h2 className="text-4xl font-semibold my-4 font-mono uppercase">
          Our Blogs
        </h2>
        <p className="text-sm text-gray-600">
          Our team of experienced and certified instructors is committed to
          helping you achieve fluency and confidence in English.
        </p>
      </div>
      {isLoading && (
        <p className="text-center text-gray-500">Loading blogs...</p>
      )}

      {error && (
        <p className="text-center text-red-500">Failed to load blogs!</p>
      )}

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 w-full max-w-7xl mx-auto">
        {blogs && blogs.length > 0
          ? blogs
              .slice(0, 3)
              .map((blog) => <BlogCard key={blog._id} blog={blog} />)
          : !isLoading && (
              <p className="text-center text-gray-500">No blogs available.</p>
            )}
      </div>
    </div>
  );
};

export default BlogSection;
