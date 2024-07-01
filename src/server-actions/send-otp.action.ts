"use server";

import { api } from "@/lib/api";

export async function sendOtp(name: string, email: string) {
  (await api.post("auth/otp", {
    name,
    email,
  })) as {
    message: string;
  };
}
