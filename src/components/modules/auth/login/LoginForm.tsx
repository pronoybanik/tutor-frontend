"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@/context/UserContext";
import { loginUser } from "@/services/AuthService";
import { toast } from "sonner";
import PrimaryButton from "@/components/shared/PrimaryButton";
import Link from "next/link";
import { signIn } from "next-auth/react";

const LoginForm = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm();

  const { setIsLoading } = useUser();
  const router = useRouter();

  const [redirectPath, setRedirectPath] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<
    "admin" | "tutor" | "user" | ""
  >("");

  const credentialsMap = {
    admin: {
      email: "admin1@gmail.com",
      password: "112233",
    },
    tutor: {
      email: "tutor1@gmail.com",
      password: "112233",
    },
    user: {
      email: "student1@gmail.com",
      password: "112233",
    },
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      setRedirectPath(searchParams.get("redirectPath"));
    }
  }, []);

  const handleRoleSelect = (role: "admin" | "tutor" | "user") => {
    setSelectedRole(role);
    const creds = credentialsMap[role];
    setValue("email", creds.email);
    setValue("password", creds.password);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await loginUser(data);
      setIsLoading(true);
      if (res?.success) {
        toast.success(res?.message);
        router.push(redirectPath || "/profile");
      } else {
        toast.error(res?.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login with your Apple or Google account
          </CardDescription>
        </CardHeader>

        {/* Social Logins */}
        <div className="flex flex-col gap-4 px-10">
          <Button
            onClick={() =>
              signIn("github", {
                callbackUrl: "http://localhost:3000/dashboard",
              })
            }
            variant="outline"
            className="w-full"
          >
            Login with Github
          </Button>
          <Button
            onClick={() =>
              signIn("google", {
                callbackUrl: "http://localhost:3000/dashboard",
              })
            }
            variant="outline"
            className="w-full"
          >
            Login with Google
          </Button>
        </div>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-6">
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>

              {/* Section Selector */}
              <p className="text-center text-sm font-semibold">Login Credential</p>
              <div className="flex justify-center gap-4 px-6 pb-2">
                {(["admin", "tutor", "user"] as const).map((role) => (
                  <Button
                    key={role}
                    type="button"
                    variant={selectedRole === role ? "default" : "outline"}
                    onClick={() => handleRoleSelect(role)}
                    className="capitalize"
                  >
                    {role}
                  </Button>
                ))}
              </div>

              {/* Email */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email")}
                />
              </div>

              {/* Password */}
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                />
              </div>

              {/* Submit */}
              <PrimaryButton type="submit" className="w-full">
                {isSubmitting ? "Logging in..." : "Login"}
              </PrimaryButton>

              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="text-center text-xs text-muted-foreground">
        By clicking continue, you agree to our{" "}
        <a href="#" className="underline hover:text-primary">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="underline hover:text-primary">
          Privacy Policy
        </a>
        .
      </div>
    </div>
  );
};

export default LoginForm;
