"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const createBlogs = async (data: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blogs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: (await cookies()).get("accessToken")?.value || "",
      },
      body: JSON.stringify(data),
    });
    revalidateTag("Booking");
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};


export const getBlogs = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blogs`, {
            next: {
                tags: ["Booking"],
            },
          
        });
        const data = await res.json();
        return data;
    } catch (error: any) {
        return Error(error.message);
    }
};
