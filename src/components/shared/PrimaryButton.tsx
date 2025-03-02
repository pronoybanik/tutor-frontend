import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils"; // If you use tailwind-merge or clsx

interface PrimaryButtonProps {
  children: React.ReactNode;
  handler?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  handler,
  className = "",
  type = "button",
}) => {
  return (
    <Button
      type={type}
      onClick={handler}
      className={cn("px-4 py-2", className)}
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;
