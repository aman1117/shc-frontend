"use client";

import { Button } from "./ui/button";
import Logo from "./ui/logo";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
      });

      if (res.ok) {
        window.location.href = "/auth/login";
      } else {
        const errorData = await res.json();
        console.error("Logout failed:", errorData.error);
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
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
