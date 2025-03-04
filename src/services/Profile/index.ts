"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getProfileInfo = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/profile/me`, {
      next: {
        tags: ["Profile"],
      },
      headers: {
        Authorization: (await cookies()).get("accessToken")?.value || "",
      },
    });

    if (!res.ok) {
      throw new Error(`Error fetching profile: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching profile:", error);
  }
};

export const getAllUserProfileInfo = async () => {

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/profile`, {
    next: {
      tags: ["Profile"],
    },
  })

  const data = await res.json();
  return data;
};

export const getProfileInfoById = async (id: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/profile/${id}`, {
      next: {
        tags: ["Profile"],
      },
      // headers: {
      //   Authorization: (await cookies()).get("accessToken")?.value || "",
      // },
    });

    if (!res.ok) {
      throw new Error(`Error fetching profile: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching profile:", error);
  }
};

export const updateProfile = async (id: string, data: any) => {

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/profile/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("accessToken")?.value || "",
        },
        body: JSON.stringify(data),
      }
    );

    if (!res.ok) {
      throw new Error(`Error updating profile: ${res.statusText}`);
    }

    revalidateTag("Profile");
    return await res.json();
  } catch (error) {
    console.error("Error updating profile:", error);
  }
};

