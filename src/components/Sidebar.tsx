"use client";

import React from "react";
import {
  BarChart,
  Info,
  PhoneCall,
  Settings2,
  Users2,
  WalletCards,
  CalendarClock,
  Book,
  File,
  DollarSign,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

const MENUS = {
  main: [
    {
      pathname: "/overview",
      name: "Overview",
      icon: <BarChart className="mr-2 h-4 w-4" />,
    },
    {
      pathname: "/files",
      name: "My Files",
      icon: <File className="mr-2 h-4 w-4" />,
    },
    {
      pathname: "/subscription",
      name: "Subscription",
      icon: <DollarSign className="mr-2 h-4 w-4" />,
    },
  ],
  other: [
    // {
    //   pathname: "/settings",
    //   name: "Settings",
    //   icon: <Settings2 className="mr-2 h-4 w-4" />,
    // },
    // {
    //   pathname: "/payments",
    //   name: "Payments",
    //   icon: <WalletCards className="mr-2 h-4 w-4" />,
    // },
    // {
    //   pathname: "/accounts",
    //   name: "Accounts",
    //   icon: <Users2 className="mr-2 h-4 w-4" />,
    // },
    // {
    //   pathname: "/help",
    //   name: "Help",
    //   icon: <Info className="mr-2 h-4 w-4" />,
    // },
  ],
  intergratins: [
    // {
    //   pathname: "/integrations/calendly",
    //   name: "Calendly",
    //   icon: <CalendarClock className="mr-2 h-4 w-4" />,
    // },
  ],
};

export default function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();

  const ghostVariant = "ghost";
  const secondaryVariant = "secondary";
  const size = "sm";

  return (
    <aside className={cn("pb-12", className, "relative")}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            {MENUS.main.map((menu) => (
              <Link
                key={menu.pathname}
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
                  "w-full justify-start"
                )}
              >
                {menu.icon}
                {menu.name}
              </Link>
            ))}
          </div>
        </div>
        {/* <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Integrations
          </h2>
          <div className="space-y-1">
            {MENUS.intergratins.map((menu) => (
              <Link
                key={menu.pathname}
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
                  "w-full justify-start"
                )}
              >
                {menu.icon}
                {menu.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Others
          </h2>
          <div className="space-y-1">
            {MENUS.other.map((menu) => (
              <Link
                key={menu.pathname}
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
                  "w-full justify-start"
                )}
              >
                {menu.icon}
                {menu.name}
              </Link>
            ))}
          </div>
        </div> */}
      </div>
    </aside>
  );
}
