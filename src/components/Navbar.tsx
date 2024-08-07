"use client";

import { logout } from "@/server-actions/logout.action";
import { Button } from "./ui/button";
import Logo from "./ui/logo";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
      // Optionally, you can show a user-friendly error message here
    }
  };

  return (
    <nav className="border-b max-w-screen">
      <div className="relative flex h-16 items-center justify-between px-4">
        <Link href="/">
          <Logo where="navbar" />
        </Link>
        <span>
          <span className="font-semibold text-2xl">
            {pathname === "/" ? "Overview" : "My Files"}
          </span>
        </span>
        <div className="flex items-center space-x-3">
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      </div>
    </nav>
  );
}
