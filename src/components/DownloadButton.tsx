"use client";
import { Progress } from "@/components/ui/progress";
import { FileIcon, defaultStyles } from "react-file-icon";
import { Button } from "./ui/button";
import useDownloader from "react-use-downloader";
import { cn, formatBytes } from "@/lib/utils";
import { Trash2, X } from "lucide-react";
import { useState } from "react";
import { dayjs } from "@/lib/dayjs";
import { incrementDownloadCount } from "@/server-actions/increment-download-count";

type DownloadingToastStatus =
  | "downloading"
  | "completed"
  | "cancelled"
  | "error"
  | "idle";

export default function DownloadButton({
  fileId,
  fileName,
  fileUrl,
  fileExtension,
}: {
  fileId: string;
  fileName: string;
  fileUrl: string;
  fileExtension: string;
}) {
  const { size, elapsed, percentage, download, cancel, error, isInProgress } =
    useDownloader();

  const [downloadingStatus, setDownloadingStatus] =
    useState<DownloadingToastStatus>("idle");

  const speed = (size * percentage) / 100 / elapsed;
  const downloadedBytes = (size * percentage) / 100 || 0;
  const timeLeft = (size - downloadedBytes) / speed || 0;

  const downloadFile = async () => {
    setDownloadingStatus("downloading");
    await download(fileUrl, fileName);
    if (error) {
      if (error?.errorMessage.includes("cancel")) {
        setDownloadingStatus("cancelled");
        return;
      }
      setDownloadingStatus("error");
      return;
    }
    await incrementDownloadCount(fileId);
    setDownloadingStatus("completed");
  };

  return (
    <>
      <div
        className={cn(
          "fixed bottom-8 left-8 bg-card bg-opacity-80 z-100 shadow-md rounded-md overflow-clip",
          downloadingStatus !== "idle" ? "block" : "hidden"
        )}
      >
        <div className="flex p-1 gap-2 items-center">
          <div className="w-8 p-0.5 rounded-full">
            <FileIcon
              extension={fileExtension}
              {...defaultStyles[fileExtension]}
            />
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="flex gap-2 w-52 text-xs">
              {downloadingStatus === "downloading" ? (
                <p className="">
                  {`${dayjs
                    .duration(timeLeft, "seconds")
                    .humanize()} remaining`}
                </p>
              ) : (
                <p className="text-xs truncate">{fileName}</p>
              )}
            </div>

            {downloadingStatus === "downloading" && (
              <div className="text-muted-foreground leading-3 flex flex-col">
                <div className="flex items-center justify-between  text-[12px]">
                  <p className="flex items-center">
                    <span className="w-12">{formatBytes(downloadedBytes)}</span>
                    <span className="mx-1">of</span>
                    <span>{formatBytes(size)}</span>
                  </p>
                  <p>{formatBytes(speed)}/s</p>
                </div>
              </div>
            )}
            {downloadingStatus === "completed" && (
              <div className="text-[12px] text-green-500">
                Download completed
              </div>
            )}
            {downloadingStatus === "cancelled" && (
              <div className="text-[12px] text-yellow-500">
                Download cancelled
              </div>
            )}
            {downloadingStatus === "error" && (
              <div className="text-[12px] text-red-500">Download error</div>
            )}
          </div>
          <div className="flex flex-col h-[42px]">
            {downloadingStatus === "downloading" ? (
              <Button onClick={cancel} variant="ghost" size="icon">
                <Trash2 className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={() => {
                  setDownloadingStatus("idle");
                }}
                variant="ghost"
                size="icon"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
        {downloadingStatus === "completed" && (
          <Progress className="bg-green-500 h-1.5 rounded-none" value={0} />
        )}
        {downloadingStatus === "cancelled" && (
          <Progress
            className="bg-orange-300 h-1.5 rounded-none"
            value={percentage}
          />
        )}
        {downloadingStatus === "error" && (
          <Progress
            className="bg-red-400 h-1.5 rounded-none"
            value={percentage}
          />
        )}
        {downloadingStatus === "downloading" && (
          <Progress className="bg-card h-1.5 rounded-none" value={percentage} />
        )}
      </div>

      <Button
        disabled={isInProgress}
        onClick={downloadFile}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Download
      </Button>
    </>
  );
}
