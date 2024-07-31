"use client";

import { logout } from "@/server-actions/logout.action";
import { Button } from "./ui/button";
import Logo from "./ui/logo";

export default function Navbar() {
  return (
    <nav className="border-b max-w-screen">
      <div className="relative flex h-16 items-center justify-between px-4">
        <Logo w={50} h={50} />
        <div className="flex items-center space-x-3">
          <Button onClick={logout}>Logout</Button>
        </div>
      </div>
    </nav>
  );
}
