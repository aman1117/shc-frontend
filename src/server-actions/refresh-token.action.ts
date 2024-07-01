"use server";

import { cookies } from "next/headers";

type RefreshTokenResponse = {
  access_token: string;
  refresh_token: string;
  user: {
    name: string;
    email: string;
    id: string;
  };
};

export async function refreshToken() {
  const refreshToken = cookies().get("__shc_refresh_token")?.value;

  const res = await fetch(
    `${process.env.SHC_BACKEND_API_BASE_URL}/auth/refresh-token`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${refreshToken}`,
      } as HeadersInit,
    },
  );

  if (!res.ok) {
    throw new Error("Failed to refresh token");
  }

  return (await res.json()) as RefreshTokenResponse;
}
