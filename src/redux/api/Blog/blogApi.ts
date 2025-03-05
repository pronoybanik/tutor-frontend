

import { IBlog } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const BlogApi = createApi({
  reducerPath: "BlogApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/v1" }), // Update with actual API URL
  endpoints: (builder) => ({
    getBlogs: builder.query<IBlog[], void>({
      query: () => "/Blogs",
    }),
    getBlogById: builder.query<IBlog, string>({
      query: (id) => `/blogs/${id}`,
    }),
    createBlog: builder.mutation<IBlog, Partial<IBlog>>({
      query: (Blog) => ({
        url: "/Blogs",
        method: "POST",
        body: Blog,
      }),
    }),
  }),
});

export const { useGetBlogsQuery, useCreateBlogMutation , useGetBlogByIdQuery } = BlogApi;
export default BlogApi;
