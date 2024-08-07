"use client";

import React from "react";
import { BarChart, DollarSign, File } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

const MENUS = {
  main: [
    {
      pathname: "/",
      name: "Overview",
      icon: <BarChart className="mr-2 h-5 w-5  " />, // Increased icon size
    },
    {
      pathname: "/files",
      name: "My Files",
      icon: <File className="mr-2 h-5 w-5" />, // Increased icon size
    },
    {
      pathname: "/subscription",
      name: "Subscription",
      icon: <DollarSign className="mr-2 h-5 w-5" />, // Increased icon size
    },
  ],
  // other and integrations menus can be added here if needed
};

export default function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();

  const ghostVariant = "ghost";
  const secondaryVariant = "secondary";
  const size = "lg"; // Increased button size

  return (
    <aside className={cn("pb-12", className, "relative")}>
      <div className="space-y-4 py-4">
        <div className="px-3 ">
          <div className="space-y-1">
            {MENUS.main.map((menu, index) => (
              <React.Fragment key={menu.pathname}>
                <Link
                  href={menu.pathname}
                  className={cn(
                    buttonVariants({
                      variant:
                        pathname === menu.pathname
                          ? secondaryVariant
                          : ghostVariant,
                      size,
                      className,
                    }),
                    "w-full justify-start py-3" // Added padding to make components bigger
                  )}
                >
                  <div className="flex justify-center items-center">
                    {menu.icon}
                    <span className="font-semibold">{menu.name}</span>
                  </div>
                </Link>
                {index < MENUS.main.length - 1 && (
                  <hr className="border-gray-200 my-2" /> // Horizontal line
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
