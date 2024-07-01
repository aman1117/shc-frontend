import { api } from "@/lib/api";
import { ShcFile } from "@/types/file.type";

type FilesResponse = {
  results: Omit<ShcFile, "download_url">[];
  total_results: number;
  total_pages: number;
  current_page: number;
  next_page: number;
  prev_page: number;
};

export async function getFiles() {
  return (await api.get("api/files")) as FilesResponse;
}
