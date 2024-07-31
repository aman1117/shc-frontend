"use client";
import { Button } from "@/components/ui/button";
import { logout } from "@/server-actions/logout.action";

export default function LogoutButton() {
  console.log("LogoutButton");
  async function onClickLogoutButton() {
    await logout();
  }

  return <Button onClick={onClickLogoutButton}>Logout</Button>;
}
