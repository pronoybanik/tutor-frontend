"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StarIcon, UserCircleIcon } from "lucide-react";
import Image from "next/image";
import { useUser } from "@/context/UserContext";
import { getProfileInfo, updateProfile } from "@/services/Profile";
import { useRouter } from "next/navigation";

const TutorProfile = () => {
  const { user } = useUser();
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);
  const routes = useRouter();
  // Fetch profile data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      const data = await getProfileInfo();

      if (data.success) {
        setProfile(data.data);
      } else {
        console.error("Failed to fetch profile:", data.error);
      }
    };

    fetchProfile();
  }, []);

  const handleEdit = (id: string) => {
    routes.push(`/profile/${id}`);
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Profile Image */}
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-blue-500">
            {profile?.image ? (
              <Image
                width={100}
                height={100}
                src={profile?.image}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <UserCircleIcon className="w-full h-full text-gray-400" />
            )}
          </div>

          {/* Profile Info */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {user?.name}
            </h2>
            <h4 className="text-2xl font-bold text-gray-900 dark:text-white">
              {user?.email}
            </h4>
            <Badge className="mt-2">{user?.role}</Badge>
          </div>
        </div>

        {/* Profile Details */}
        {user?.role === "tutor" ? (
          <div className="mt-6 border-t border-gray-300 dark:border-gray-600 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Experience
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {profile?.experience} years of teaching experience
            </p>

            <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
              Subjects
            </h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {profile?.subjects?.map((subject, index) => (
                <Badge key={index} className="bg-blue-500 text-white">
                  {subject}
                </Badge>
              ))}
            </div>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              {profile?.bio}
            </p>
          </div>
        ) : (
          <h1 className="text-center text-lg font-semibold text-gray-900 dark:text-white">
            You want to apply as a tutor
          </h1>
        )}

        {/* Edit Button */}
        <div className="mt-6 text-center">
          <Button
            onClick={() => handleEdit(profile?._id)}
            className="bg-blue-600 text-white"
          >
            Edit Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TutorProfile;
