import { IBlog } from "@/types";
import Link from "next/link";
import React from "react";

const BlogCard = ({ blog }: { blog: IBlog }) => {
  return (
    <div>
      {" "}
      <div className="border rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition duration-300">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          {blog.title}
        </h2>
        <p className="text-sm text-gray-600 mb-3">
          {blog.content.slice(0, 100)}...
        </p>
        <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
          <span>By {blog.author.name}</span> •
          <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
        </div>
        <Link
          href={`/blogs/${blog._id}`}
          className="text-[#1dd1a1] hover:underline"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
