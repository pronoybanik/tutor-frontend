"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";
import { useUser } from "@/context/UserContext";
import { logout } from "@/services/AuthService";
import Logo from "./Logo";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, setIsLoading } = useUser();

  const handleLogout = () => {
    logout();
    setIsLoading(true);
  };

  return (
    <div className=" relative">
      {/* Navbar */}
      <nav className="fixed px w-full backdrop-blur-lg bg-black/60 text-white py-4 px-6 md:px-12 flex justify-between items-center z-50">
        <div className="flex items-center gap-2">
          <Logo />
        </div>

        <div className="hidden md:flex gap-6">
          <Link
            href="/"
            className="hover:text-[#1dd1a1] font-bold transition duration-300"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="hover:text-[#1dd1a1] font-bold transition duration-300"
          >
            About
          </Link>
          <Link
            href="#"
            className="hover:text-[#1dd1a1] font-bold transition duration-300"
          >
            Courses
          </Link>
         
          <Link
            href="/blogs"
            className="hover:text-[#1dd1a1] font-bold transition duration-300"
          >
            Blog
          </Link>
          <Link
            href="/contact"
            className="hover:text-[#1dd1a1] font-bold transition duration-300"
          >
            Contact
          </Link>
        </div>
        {user ? (
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>User</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href="/profile">
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                </Link>
                <Link href="/dashboard">
                  <DropdownMenuItem>Dashboard</DropdownMenuItem>
                </Link>

                <DropdownMenuItem>My Shop</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="bg-red-500 cursor-pointer"
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="flex gap-4 px-4">
            <Link href="register">
              <PrimaryButton>sign-up</PrimaryButton>
            </Link>
            <Link href="login">
              <SecondaryButton>sign-in</SecondaryButton>
            </Link>
          </div>
        )}

        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed top-16 z-10 left-0  w-full backdrop-blur-lg bg-black/90 text-white flex flex-col items-center gap-4 py-6 md:hidden">
          <Link
            href="#"
            className="hover:text-[#1dd1a1] font-bold  transition duration-300"
          >
            Home
          </Link>
          <Link
            href="#"
            className="hover:text-[#1dd1a1] font-bold transition duration-300"
          >
            About
          </Link>
          <Link
            href="#"
            className="hover:text-[#1dd1a1] font-bold transition duration-300"
          >
            Courses
          </Link>
          <Link
            href="#"
            className="hover:text-[#1dd1a1] font-bold transition duration-300"
          >
            Pricing
          </Link>
          <Link
            href="#"
            className="hover:text-[#1dd1a1] font-bold transition duration-300"
          >
            Blog
          </Link>
          <Link
            href="#"
            className="hover:text-[#1dd1a1] font-bold transition duration-300"
          >
            Contact
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavBar;
