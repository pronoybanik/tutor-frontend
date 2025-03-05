import BlogDetailsItem from "@/components/modules/blog/BlogDetails.tsx/BlogDetails";
import Banner from "@/components/shared/banner";
import React from "react";

const BlogsDetailsPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  return (
    <div>
            <Banner title="Blogs" path="Home - Blogs" />

      <BlogDetailsItem id={id} />
    </div>
  );
};

export default BlogsDetailsPage;
