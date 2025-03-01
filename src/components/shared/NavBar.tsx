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

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative">
      {/* Navbar */}
      <nav className="fixed w-full bg-black bg-opacity-80 text-white py-4 px-6 md:px-12 flex justify-between items-center z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-500 rounded-full"></div>
          <span className="text-xl font-bold">Inlingo</span>
        </div>

        <div className="hidden md:flex gap-6">
          <Link href="#" className="hover:text-green-400">
            Home
          </Link>
          <Link href="#" className="hover:text-green-400">
            About
          </Link>
          <Link href="#" className="hover:text-green-400">
            Courses
          </Link>
          <Link href="#" className="hover:text-green-400">
            Pricing
          </Link>
          <Link href="#" className="hover:text-green-400">
            Blog
          </Link>
          <Link href="#" className="hover:text-green-400">
            Contact
          </Link>
        </div>

        <div >
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
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <Link href="/user/dashboard">
                <DropdownMenuItem>Dashboard</DropdownMenuItem>
              </Link>

              <DropdownMenuItem>My Shop</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="bg-red-500 cursor-pointer">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed top-16 left-0 w-full bg-black bg-opacity-90 text-white flex flex-col items-center gap-4 py-6 md:hidden">
          <Link href="#">Home</Link>
          <Link href="#">About</Link>
          <Link href="#">Courses</Link>
          <Link href="#">Pricing</Link>
          <Link href="#">Blog</Link>
          <Link href="#">Contact</Link>
        </div>
      )}
    </div>
  );
};

export default NavBar;
