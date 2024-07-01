"use server";

import { api } from "@/lib/api";
import { cookies } from "next/headers";
import { permanentRedirect } from "next/navigation";

export async function submitLoginForm(data: {
  name: string;
  email: string;
  otp: string;
}) {
  const user = (await api.post("auth/login", data)) as {
    access_token: string;
    refresh_token: string;
    id: string;
    name: string;
    email: string;
  };

  cookies().set({
    name: "__shc_access_token",
    value: user.access_token,
    path: "/",
    httpOnly: true,
  });
  cookies().set({
    name: "__shc_refresh_token",
    value: user.refresh_token,
    path: "/",
    httpOnly: true,
  });
  permanentRedirect("/");
}
