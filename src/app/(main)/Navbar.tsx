"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "@/assests/logo.png";
import { UserButton } from "@clerk/nextjs";
import { CreditCard } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";

const Navbar = () => {
  const { theme } = useTheme();

  return (
    <header className="shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 p-3">
        <Link href="/resumes" className="flex items-center gap-2">
          <Image
            src={logo}
            alt="logo"
            width={35}
            height={35}
            className="rounded-full"
          />
          <span className="text-xl font-bold tracking-tight">
            ProFileBuilder
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <UserButton
            appearance={{
              baseTheme: theme === "dark" ? dark : undefined,
              elements: {
                avatarBox: {
                  height: 35,
                  width: 35,
                },
              },
            }}
          >
            
          </UserButton>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
