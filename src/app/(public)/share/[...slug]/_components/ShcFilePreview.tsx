import { isLang } from "@/lib/shiki";
import { ShcFile } from "@/types/file.type";

import NoPreview from "./NoPreview";
import CodePreview from "./CodePreview";
import AudioPreview from "./AudioPreview";
import ImagePreview from "./ImagePreview";
import VideoPreview from "./VideoPreview";

export default async function ShcFilePreview({ file }: { file: ShcFile }) {
  const link = file.download_url;

  if (file.size > 5 * 1000 * 1000) {
    return <NoPreview fileSizeLimitExceeded />;
  }

  if (isLang(file.extension)) {
    if (file.size > 500 * 1000) {
      return <NoPreview fileSizeLimitExceeded />;
    }
    return <CodePreview fileId={file.id} link={link} lang={file.extension} />;
  }

  if (
    file.mime_type.startsWith("text") ||
    file.name.split(".").filter((ele) => ele).length === 1
  ) {
    return <CodePreview fileId={file.id} link={link} lang={"markdown"} />;
  }

  if (file.mime_type.startsWith("audio")) {
    return (
      <AudioPreview
        className="w-[200px]"
        link={link}
        title={file.name}
        subtile={`${file.size / 1024} KB`}
      />
    );
  }

  if (file.mime_type.startsWith("image")) {
    return <ImagePreview name={file.name} link={link} />;
  }

  if (file.mime_type.startsWith("video")) {
    return <VideoPreview link={link} />;
  }

  return <NoPreview />;
}
