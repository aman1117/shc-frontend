"use server";

import { api } from "@/lib/api";

export async function incrementDownloadCount(fileId: string) {
  try {
    await api.patch(`api/files/increment-download-count/${fileId}`, null);
  } catch (error) {
    console.error(error);
  }
}
