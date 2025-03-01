import React from "react";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className="min-h-screen">{children}</main>
    </>
  );
};

export default CommonLayout;
