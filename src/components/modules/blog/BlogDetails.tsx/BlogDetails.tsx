"use client";

import { useGetBlogByIdQuery } from "@/redux/api/Blog/blogApi";
import React from "react";

const BlogDetailsItem = ({ id }: { id: string }) => {
  const { data, error, isLoading } = useGetBlogByIdQuery(id);

  const blog = data?.data;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Loading State */}
      {isLoading && <p className="text-center text-gray-500">Loading...</p>}

      {/* Error State */}
      {error && (
        <p className="text-center text-red-500">Failed to load blog.</p>
      )}

      {/* Blog Content */}
      {blog && (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {blog.title}
          </h1>
          <p className="text-gray-600 text-sm mb-2">
            Published on: {new Date(blog.createdAt).toDateString()}
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            {blog.content}
          </p>

          {/* Author Info */}
          <div className="mt-6 border-t pt-4">
            <h2 className="text-xl font-semibold text-gray-800">Author</h2>
            <div className="flex items-center gap-4 mt-2">
              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-lg font-bold text-gray-600">
                {blog.author.name[0]}
              </div>
              <div>
                <p className="text-gray-900 font-medium">{blog.author.name}</p>
                <p className="text-gray-600 text-sm">{blog.author.email}</p>
                <span className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full">
                  {blog.author.role}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDetailsItem;
