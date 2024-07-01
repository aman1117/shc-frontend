import { api } from "@/lib/api";
import { ShcFile } from "@/types/file.type";

export async function getShcFile(
  fileId: string
): Promise<{ file?: ShcFile; error?: string }> {
  try {
    const file = await api.get(`api/files/${fileId}`);
    return {
      file: file as ShcFile,
    };
  } catch (error: any) {
    console.error(error);
    return {
      error: error.message as string,
    };
  }
}
