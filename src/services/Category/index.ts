/* eslint-disable @typescript-eslint/no-explicit-any */

"use server"

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form"


export const createCategory = async (data: FieldValues) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/category`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: (await cookies()).get("accessToken")!.value
            },
            body: JSON.stringify(data)
        })
        const result = await res.json()
        revalidateTag("Category");
        return result;
    } catch (error: any) {
        return Error(error)
    }
};

export const getAllCategory = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/category`, {
            next: {
                tags: ["Category"],
            },
            headers: {
                Authorization: (await cookies()).get("accessToken")!.value
            },
        });
        const data = await res.json();
        return data;
    } catch (error: any) {
        return Error(error.message);
    }
};

export const deleteCategory = async (id: string): Promise<any> => {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")!.value;

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/category/${id}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: token,
                },
            }
        );
        revalidateTag("Category");
        return res.json();
    } catch (error: any) {
        return Error(error);
    }
};

