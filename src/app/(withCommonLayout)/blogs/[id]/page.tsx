
"use client"

import BlogDetailsItem from "@/components/modules/blog/BlogDetails.tsx/BlogDetails";
import Banner from "@/components/shared/banner";
import { useParams } from "next/navigation";
import React from "react";

const BlogsDetailsPage = () => {
  const params = useParams();
  const id = params?.id as string; // Ensure id is a string

  if (!id) {
    return <p className="text-center text-red-500">Invalid Blog ID</p>;
  }

  return (
    <div>
      <Banner title="Blogs" path="Home - Blogs" />
      <BlogDetailsItem id={id} />
    </div>
  );
};

export default BlogsDetailsPage;
