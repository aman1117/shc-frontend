import { getFiles } from "@/server-actions/get-files.action";
import FileListItem from "@/components/FileListItem";

export default async function ShcFiles() {
  const files = await getFiles();

  return (
    <div className="container flex flex-col gap-4">
      {files.results.map((file) => (
        <FileListItem key={file.id} file={file} />
      ))}
    </div>
  );
}
