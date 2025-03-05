"use client";
import PrimaryButton from "@/components/shared/PrimaryButton";
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const BlogPage = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit : SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    // reset(); // Clear form after submission
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-black mb-6">
        📖 Our Blog
      </h1>

      {/* Input Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mb-6 p-4 border border-gray-300 rounded-lg shadow-sm"
      >
        <input
          type="text"
          placeholder="Blog Title"
          {...register("title", { required: true })}
          className="w-full p-2 border rounded mb-2 focus:outline-[#1e3799]"
        />
        <textarea
          placeholder="Blog Content"
          {...register("content", { required: true })}
          className="w-full p-2 border rounded mb-2 focus:outline-[#1e3799]"
          rows={3}
        />
        <PrimaryButton
          type="submit"
        >
          Add Blog
        </PrimaryButton>
      </form>

      {/* Blog List */}
      {/* <div className="grid gap-6">
        {blogs.map((blog, index) => (
          <div
            key={index}
            className="p-6 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"
            onClick={() => console.log("Blog Clicked:", blog)}
          >
            <h2 className="text-xl font-semibold text-[#34495e] mb-2">{blog.title}</h2>
            <p className="text-gray-600 line-clamp-3">{blog.content}</p>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default BlogPage;
