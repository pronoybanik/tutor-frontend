

import { IBlog, IBlogResponse } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const BlogApi = createApi({
  reducerPath: "BlogApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_BASE_API}` }), 
  endpoints: (builder) => ({
    getBlogs: builder.query<IBlogResponse, void>({
      query: () => "/blogs",     
    }),
    
    getBlogById: builder.query<IBlogResponse, string>({
      query: (id) => `/blogs/${id}`,
      
    }),
    createBlog: builder.mutation<IBlog, Partial<IBlog>>({
      query: (Blog) => ({
        url: "/blogs",
        method: "POST",
        body: Blog,
      }),
    }),
  }),
});

export const { useGetBlogsQuery, useCreateBlogMutation , useGetBlogByIdQuery } = BlogApi;
export default BlogApi;
