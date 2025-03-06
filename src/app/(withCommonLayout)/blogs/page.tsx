import BlogSection from "@/components/modules/blog/BlogSection";
import Banner from "@/components/shared/banner";
import NMContainer from "@/components/ui/core/NMContainer";
import React from "react";

const BlogsPage = () => {
  return (
    <div className="">
      <NMContainer>
        <Banner title="About" path="Home -> About" />
      </NMContainer>
      <BlogSection />
    </div>
  );
};

export default BlogsPage;
