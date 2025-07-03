"use client";

import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import registerImage from "../../../../assets/register-image/Sign up-amico.png";
import { toast } from "sonner";
import { registerUser } from "@/services/AuthService";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

const RegisterForm = ({ className, ...props }: React.ComponentProps<"div">) => {
  const { register, handleSubmit, setValue } = useForm();
  const [selectedRole, setSelectedRole] = useState<"student" | "tutor">("student");
  const { setIsLoading } = useUser();
  const router = useRouter();

  const handleRoleSelect = (role: "student" | "tutor") => {
    setSelectedRole(role);
    setValue("role", role); 
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await registerUser({ ...data, role: selectedRole });
      setIsLoading(true);
      if (res?.success) {
        toast.success(res?.message);
        setTimeout(() => {
          router.push("/login");
        }, 1000);
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome</h1>
                <p className="text-balance text-muted-foreground">
                  Please create an account
                </p>
              </div>

              {/* Role Selection */}
              <div className="grid gap-2">
                <Label>Select Role</Label>
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant={selectedRole === "student" ? "default" : "outline"}
                    onClick={() => handleRoleSelect("student")}
                  >
                    Student
                  </Button>
                  <Button
                    type="button"
                    variant={selectedRole === "tutor" ? "default" : "outline"}
                    onClick={() => handleRoleSelect("tutor")}
                  >
                    Tutor
                  </Button>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Name"
                  required
                  {...register("name")}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@gmail.com"
                  required
                  {...register("email")}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  required
                  {...register("password")}
                />
              </div>

              <Button type="submit" className="w-full">
                Signup
              </Button>

              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="underline underline-offset-4">
                  Sign in
                </Link>
              </div>
            </div>
          </form>

          <div className="relative hidden bg-muted md:block">
            <Image
              src={registerImage || "/placeholder-image.png"}
              alt="Image"
              layout="fill"
              objectFit="contain"
              className="dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>

      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our{" "}
        <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
};

export default RegisterForm;
