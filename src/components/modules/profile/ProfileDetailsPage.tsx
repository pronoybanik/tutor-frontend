"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserCircleIcon } from "lucide-react";
import Image from "next/image";
import { useUser } from "@/context/UserContext";
import { getProfileInfo } from "@/services/Profile";
import { useRouter } from "next/navigation";
import { getUserInfoById } from "@/services/AuthService";
import { IProfile } from "@/types";

const TutorProfile = () => {
  const { user } = useUser();
  const [profile, setProfile] = useState<IProfile | null>(null);
  const [userData, setUserData] = useState<{ name: string; email: string; role: string } | null>(null);
  const routes = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getProfileInfo();
        if (!profileData.success) {
          console.error("Failed to fetch profile:", profileData.error);
          return;
        }
        setProfile(profileData.data);

        if (user?.userId) {
          const userInfo = await getUserInfoById(user.userId);
          setUserData(userInfo.data);
        } else {
          console.error("User ID is not available");
        }
      } catch (error) {
        console.error("An error occurred while fetching data:", error);
      }
    };

    fetchProfile();
  }, [user]);

  const handleEdit = (id: string | undefined) => {
    if (!id) return;
    routes.push(`/profile/${id}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center gap-6 pb-4">
          {/* Profile Image */}
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-blue-500">
            {profile?.image ? (
              <Image
                width={100}
                height={100}
                src={profile.image}
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
              {userData?.name || "Loading..."}
            </h2>
            <h4 className="text-2xl font-bold text-gray-900 dark:text-white">
              {userData?.email || "No email provided"}
            </h4>
            <Badge className="mt-2">{userData?.role || "Unknown"}</Badge>
          </div>
        </div>

        {/* Verification Status */}
        {profile?.role === "tutor" ? (
          profile.isVerified ? (
            <div className="rounded-sm border-l-4 border-green-500 bg-green-100 p-4">
              <strong className="block font-medium text-green-800">
                You Are a Verified Teacher
              </strong>
            </div>
          ) : (
            <div className="rounded-sm border-l-4 border-yellow-500 bg-yellow-100 p-4">
              <strong className="block font-medium text-yellow-800">
                You Are Not Verified as a Teacher Yet
              </strong>
            </div>
          )
        ) : (
          <div className="rounded-sm border-l-4 border-blue-500 bg-blue-100 p-4">
            <strong className="block font-medium text-blue-800">
              You Are a Verified Student
            </strong>
          </div>
        )}

        {/* Request Role Alert */}
        {profile?.requestRole === "tutor" && (
          <div className="rounded-sm border-s-4 border-red-500 bg-red-50 p-4">
            <strong className="block font-medium text-red-800">
              Your Request Sent. Please wait for our email.
            </strong>
            <p className="mt-2 text-sm text-red-700">
              Your tutor request is under review. Please check your email for further updates.
            </p>
          </div>
        )}

        {/* Profile Details */}
        {userData?.role === "tutor" ? (
          <div className="mt-6 border-t border-gray-300 dark:border-gray-600 pt-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Experience
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {profile?.experience ? `${profile.experience} years of teaching experience` : "No experience listed"}
            </p>

            <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
              Subjects
            </h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {profile?.subjects && profile.subjects.length > 0 ? (
                profile.subjects.map((subject, index) => (
                  <Badge key={index} className="bg-blue-500 text-white">
                    {subject}
                  </Badge>
                ))
              ) : (
                <p className="text-gray-600 dark:text-gray-300">No subjects listed</p>
              )}
            </div>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              {profile?.bio || "No bio available"}
            </p>
          </div>
        ) : (
          <h1 className="text-center text-lg font-semibold uppercase text-red-300 dark:text-white">
            Want to apply as a tutor? Click the Edit button below.
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
