"use server";
import { cookies } from "next/headers";
import { permanentRedirect } from "next/navigation";

export async function logout() {
  console.log("logout");
  const refreshToken = cookies().get("__shc_refresh_token")?.value;

  const res = await fetch(
    `${process.env.SHC_BACKEND_API_BASE_URL}/auth/logout`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${refreshToken}`,
      } as HeadersInit,
      method: "DELETE",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to refresh token");
  }
  cookies().delete("__shc_access_token");
  cookies().delete("__shc_refresh_token");
  permanentRedirect("/auth/login");
}
