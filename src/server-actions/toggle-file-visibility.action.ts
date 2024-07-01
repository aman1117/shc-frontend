"use server";

import { api } from "@/lib/api";
import { ShcFile } from "@/types/file.type";

export async function toggleFileVisibility(fileId: string) {
  return (await api.patch(
    `api/files/toggle-visibility/${fileId}`,
    null
  )) as ShcFile;
}
