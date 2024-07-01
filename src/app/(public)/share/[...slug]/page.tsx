import { Suspense } from "react";

import { dayjs } from "@/lib/dayjs";
import { formatBytes } from "@/lib/utils";
import { getShcFile } from "@/server-actions/get-file.action";

import NotAuthorized from "./_components/NotAuthorized";
import ShcFilePreview from "./_components/ShcFilePreview";
import LoadingPreview from "./_components/LoadingPreview";
import DownloadButton from "@/components/DownloadButton";

export default async function ShcFile({
  params,
}: {
  params: { slug: string[] };
}) {
  const fileId = params.slug[0];
  const { file, error } = await getShcFile(fileId);
  if (error !== undefined || file === undefined) {
    return <NotAuthorized />;
  }

  return (
    <div className="w-full h-full relative">
      <nav className="absolute w-full bg-white z-10">
        <div className="container">
          <div className="py-[18px] flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold leading-tight text-gray-900">
                {file.name}
              </h2>
              <div>
                <p className="text-gray-500 text-sm">
                  Size: {formatBytes(file.size)} | Type: {file.mime_type} |{" "}
                  {dayjs(file.updated_at).fromNow()}
                </p>
              </div>
            </div>

            <div>
              <DownloadButton
                fileId={file.id}
                fileName={file.name}
                fileUrl={file.download_url}
                fileExtension={file.extension}
              />
            </div>
          </div>
        </div>
      </nav>
      <section className="px-4 pb-4 pt-24 bg-slate-200 min-h-full h-full">
        <Suspense fallback={<LoadingPreview />}>
          <ShcFilePreview file={file} />
        </Suspense>
      </section>
    </div>
  );
}
