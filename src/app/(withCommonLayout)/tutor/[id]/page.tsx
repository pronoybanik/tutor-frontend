import TutorSectionDetails from "@/components/modules/tutor/TutorSection";
import React from "react";

const TutorDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return (
    <div>
      <h1>
        <TutorSectionDetails id={id} />
      </h1>
    </div>
  );
};

export default TutorDetailsPage;
