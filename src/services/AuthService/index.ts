/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form"

export const registerUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user`, {
      method: "POST",
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(userData)
    })
    const result = await res.json();

    return result;
  } catch (error: any) {
    return Error(error)
  }
};

export const getUserInfoById = async (id: string) => {

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user/${id}`, {
    next: {
      tags: ["User"],
    },
  });

  const data = await res.json();
  return data;

};



export const loginUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const result = await res.json();

    if (result.success) {
      (await cookies()).set("accessToken", result?.data?.accessToken);
      (await cookies()).set("refreshToken", result?.data?.refreshToken);
    }

    return result;
  } catch (error: any) {
    return Error(error);
  }
};


export const getCurrentUser = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value
  let decodeData = null;

  if (accessToken) {
    decodeData = await jwtDecode(accessToken);
    return decodeData;
  } else {
    return null;
  }
};

export const logout = async () => {
  (await cookies()).delete("accessToken");
}