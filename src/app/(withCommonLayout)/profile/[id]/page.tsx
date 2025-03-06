"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getProfileInfoById, updateProfile } from "@/services/Profile";
import { IProfile } from "@/types";

const ProfileDetails = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState<IProfile | null>(null);
  const [applyForTutor, setApplyForTutor] = useState(false);

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      image: "",
      subjects: "",
      bio: "",
      experience: 0,
      hourlyRate: 0,
      requestRole: "",
    },
  });

  const router = useRouter();

  // Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfileInfoById(id as string);
        if (data.success) {
          setProfile(data.data);
          setValue("requestRole", data.data.requestRole || "student");
        }
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
    const formattedData: Partial<IProfile> = {};

    const imageFile = formData.image[0]; // Extract file from FileList
    if (imageFile) {
      const uploadData = new FormData();
      uploadData.append("file", imageFile);
      uploadData.append("upload_preset", "Book-sell-shop"); // Cloudinary preset
      uploadData.append("cloud_name", "dvcbclqid"); // Cloudinary cloud name

      try {
        const imageResponse = await fetch(
          `https://api.cloudinary.com/v1_1/dvcbclqid/image/upload`,
          {
            method: "POST",
            body: uploadData,
          }
        );

        if (!imageResponse.ok) {
          const errorData = await imageResponse.json();
          alert(`Image upload failed: ${errorData.message || "Unknown error"}`);
          return;
        }

        const imgData = await imageResponse.json();
        formattedData.image = imgData.secure_url; // Save uploaded image URL
      } catch (error) {
        console.error("Image upload error:", error);
        alert("Error uploading image. Please try again.");
        return;
      }
    }

    if (applyForTutor) {
      formattedData.subjects = formData.subjects
        .split(",")
        .map((s: string) => s.trim());
      formattedData.bio = formData.bio;
      formattedData.experience = Number(formData.experience);
      formattedData.rates = { hourlyRate: Number(formData.hourlyRate) };
      formattedData.requestRole = "tutor";
    }

    try {
      const res = await updateProfile(id as string, formattedData);
      if (res.success) {
        alert("Profile updated successfully!");
        setProfile(res.data);
        router.push(`/profile`);
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
          {/* Profile Image */}
          <label className="text-gray-700 dark:text-white">Profile Image</label>
          <Input type="file" accept="image/*" {...register("image")} />

          {/* Apply for Tutor Role */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={applyForTutor}
              onChange={() => setApplyForTutor(!applyForTutor)}
            />
            <label className="text-gray-700 dark:text-white">
              Apply for Tutor Role
            </label>
          </div>

          {/* Additional Fields for Tutor Role */}
          {applyForTutor && (
            <>
              {/* Subjects */}
              <label className="text-gray-700 dark:text-white">
                Your Subjects
              </label>
              <Textarea
                placeholder="Subjects (comma-separated)"
                {...register("subjects")}
              />

              {/* Bio */}
              <label className="text-gray-700 dark:text-white">Details</label>
              <Textarea placeholder="Bio" {...register("bio")} />

              {/* Experience */}
              <label className="text-gray-700 dark:text-white">
                Experience (Years)
              </label>
              <Input
                type="number"
                min="0"
                placeholder="Experience (in years)"
                {...register("experience")}
              />

              {/* Hourly Rate */}
              <label className="text-gray-700 dark:text-white">
                Hourly Payment ($)
              </label>
              <Input
                type="number"
                min="0"
                placeholder="Hourly Rate ($)"
                {...register("hourlyRate")}
              />
            </>
          )}

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
