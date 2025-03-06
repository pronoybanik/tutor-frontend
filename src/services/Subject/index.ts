/* eslint-disable @typescript-eslint/no-explicit-any */

"use server"

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";


export const createSubject = async (data: any) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/subject`, {
            method: "POST",
            body: data,
            headers: {
                Authorization: (await cookies()).get("accessToken")?.value || "",
            },
        });


        revalidateTag("Subject")
        const result = await res.json();
        return result;
    } catch (error: any) {
        console.error("Error creating subject:", error);
        return new Error(error.message);
    }
};



export const getAllSubject = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/subject`, {
            next: {
                tags: ["Subject"],
            },
        });
        const data = await res.json();
        return data;
    } catch (error: any) {
        return Error(error.message);
    }
};

export const getTutorCreatedSubject = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/subject/findSubject`, {
            next: {
                tags: ["Subject"],
            },
            headers: {
                Authorization: (await cookies()).get("accessToken")?.value || "",
            },
        });
        const data = await res.json();
        return data;
    } catch (error: any) {
        return Error(error.message);
    }
};


export const deleteSubject = async (id: string) => {
    try {
        // Call your API delete function here
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/subject/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: (await cookies()).get("accessToken")?.value || "",
            },
        });
        revalidateTag("Subject")
        const data = await res.json();
        return data;

    } catch (error: any) {
        return Error(error.message);
    }
}

export const getSingleSubject = async (id: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/subject/${id}`, {
            next: {
                tags: ["Subject"],
            },
        });
        const data = await res.json();
        return data;
    } catch (error: any) {
        return Error(error.message);
    }
};