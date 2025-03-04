"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getProfileInfoById, updateProfile } from "@/services/Profile";
import { IProfile } from "@/types";

const ProfileDetails = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      subjects: "",
      bio: "",
      experience: 0,
      requestRole: "",
    },
  });

  const routes = useRouter();

  // Fetch profile data based on ID
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfileInfoById(id as string);

        if (data.success) {
          setProfile(data.data);
        }

        // Set form values
        setValue("subjects", data.data.subjects?.join(", ") || "");
        setValue("bio", data.data.bio || "");
        setValue("experience", data.data.experience || 0);
        setValue("requestRole", data.data.requestRole || "");
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    if (id) {
      fetchProfile();
    }
  }, [id, setValue]);

  // Handle form submission
  const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
    const formattedData = {
      subjects: formData.subjects.split(",").map((s: any) => s.trim()), // Convert subjects to array
      bio: formData.bio,
      experience: Number(formData.experience), // Ensure experience is a number
      requestRole: formData.requestRole,
    };

    try {
      const res = await updateProfile(id as string, formattedData as IProfile);
      console.log("updateProfile Response:", res);

      if (res.success) {
        alert("Profile updated successfully!");
        setProfile(res.data);
        routes.push(`/profile`);
      } else {
        alert("Failed to update profile: " + res.error);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Edit Profile
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
          {/* Subjects */}
          <Textarea
            placeholder="Subjects (comma-separated)"
            {...register("subjects")}
          />

          {/* Bio */}
          <Textarea placeholder="Bio" {...register("bio")} />

          {/* Experience */}
          <input
            type="number"
            min="0"
            className="w-full p-2 border rounded-lg"
            placeholder="Experience (in years)"
            {...register("experience")}
          />

          {/* Role */}
          <Select
            onValueChange={(value) => setValue("requestRole", value)}
            value={watch("requestRole")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="student">Student</SelectItem>
              <SelectItem value="tutor">Tutor</SelectItem>
            </SelectContent>
          </Select>

          {/* Update Button */}
          <Button type="submit" className="w-full bg-blue-600 text-white">
            Update Profile
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ProfileDetails;
