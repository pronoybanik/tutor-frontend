
"use server"

import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";

export const createSubject = async (data: FieldValues) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/subject`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        const result = await res.json()
        revalidateTag("Subject")
        return result;
    } catch (error: any) {
        return Error(error)
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