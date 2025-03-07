import { IBlog } from "@/types";
import Link from "next/link";
import React from "react";

const BlogCard = ({ blog }: { blog: IBlog }) => {
  return (
    <article className="rounded-lg border border-gray-100 bg-white p-4 shadow-xs transition hover:shadow-lg sm:p-6">
      <span className="inline-block rounded-sm bg-[#1dd1a1] p-2 text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path
            d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 14l9-5-9-5-9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
          />
        </svg>
      </span>

      <Link href={`/blogs/${blog._id}`}>
        <h3 className="mt-0.5 text-lg font-medium text-gray-900">
          {blog.title}
        </h3>
      </Link>

      <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
        {blog.content.slice(0, 100)}...
      </p>

      <div className="flex items-center gap-2 text-gray-500 text-sm mt-4">
        <span>By {blog.author?.name}</span> •
        <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
      </div>

      <Link
        href={`/blogs/${blog._id}`}
        className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#1dd1a1]"
      >
        Find out more
        <span
          aria-hidden="true"
          className="block transition-all group-hover:ms-0.5 rtl:rotate-180"
        >
          &rarr;
        </span>
      </Link>
    </article>
  );
};

export default BlogCard;
