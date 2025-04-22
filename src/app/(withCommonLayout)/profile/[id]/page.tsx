"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getProfileInfoById, updateProfile } from "@/services/Profile";
import { IProfile } from "@/types";
import { useUser } from "@/context/UserContext";

const ProfileDetails = () => {
  const { user } = useUser();
  const { id } = useParams();
  const router = useRouter();

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

  const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
    const formattedData: Partial<IProfile> = {};

    const imageFile = formData.image[0];
    if (imageFile) {
      const uploadData = new FormData();
      uploadData.append("file", imageFile);
      uploadData.append("upload_preset", "Book-sell-shop");
      uploadData.append("cloud_name", "dvcbclqid");

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
        formattedData.image = imgData.secure_url;
      } catch (error) {
        console.error("Image upload error:", error);
        alert("Error uploading image. Please try again.");
        return;
      }
    }

    formattedData.bio = formData.bio;

    if (user?.role === "tutor" || applyForTutor) {
      formattedData.subjects = formData.subjects
        .split(",")
        .map((s: string) => s.trim());
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

          {/* Bio - visible for both roles */}
          <label className="text-gray-700 dark:text-white">Bio</label>
          <Textarea placeholder="Write something about yourself" {...register("bio")} />

          {/* Student Only: Apply for Tutor */}
          {user?.role === "student" && (
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
          )}

          {/* Tutor or Applying Student: Show extra fields */}
          {(user?.role === "tutor" || applyForTutor) && (
            <>
              {/* Subjects */}
              <label className="text-gray-700 dark:text-white">Subjects</label>
              <Textarea
                placeholder="Subjects (comma-separated)"
                {...register("subjects")}
              />

              {/* Experience */}
              <label className="text-gray-700 dark:text-white">
                Experience (Years)
              </label>
              <Input
                type="number"
                min="0"
                placeholder="Experience in years"
                {...register("experience")}
              />

              {/* Hourly Rate */}
              <label className="text-gray-700 dark:text-white">
                Hourly Rate ($)
              </label>
              <Input
                type="number"
                min="0"
                placeholder="Hourly rate"
                {...register("hourlyRate")}
              />
            </>
          )}

          {/* Submit */}
          <Button type="submit" className="w-full bg-blue-600 text-white">
            Update Profile
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ProfileDetails;
