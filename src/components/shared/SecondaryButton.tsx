import React from "react";
import { Button } from "../ui/button";

interface SecondaryButton {
  children: React.ReactNode;
  handler?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const SecondaryButton: React.FC<SecondaryButton> = ({
  children,
  handler,
  className = "",
  type = "button",
}) => {
  return (
    <Button
      type={type}
      variant="secondary"
      onClick={handler}
      className={`${className} cursor-pointer`}
    >
      {children}
    </Button>
  );
};

export default SecondaryButton;
