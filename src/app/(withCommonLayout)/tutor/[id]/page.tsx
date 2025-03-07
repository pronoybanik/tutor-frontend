import TutorSectionDetails from "@/components/modules/tutor/TutorSection";
import Banner from "@/components/shared/banner";
import NMContainer from "@/components/ui/core/NMContainer";
import React from "react";

const TutorDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return (
    <div>
      <NMContainer>
        <Banner title="Tutor" path="Tutor - Details" />
      </NMContainer>
      <div>
        <TutorSectionDetails id={id} />
      </div>
    </div>
  );
};

export default TutorDetailsPage;
