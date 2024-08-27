"use client";

import { useState } from "react";
import { FileIcon, defaultStyles } from "react-file-icon";
import Link from "next/link";

import { dayjs } from "@/lib/dayjs";
import { formatBytes } from "@/lib/utils";
import { ShcFile } from "@/types/file.type";
import { toast } from "sonner";
import { toggleFileVisibility } from "@/server-actions/toggle-file-visibility.action";
import { Copy, Eye, Lock, Unlock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";

export default function FileListItem({
  file,
}: {
  file: Omit<ShcFile, "download_url">;
}) {
  const [isPublic, setIsPublic] = useState<boolean>(file.is_public);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function toggleVisibility() {
    setIsPublic((prev) => !prev);
    try {
      setIsLoading(true);
      await toggleFileVisibility(file.id);
    } catch (error) {
      setIsPublic((prev) => !prev);
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8">
            <FileIcon
              extension={file.extension}
              {...defaultStyles[file.extension]}
            />
          </div>
          <span className="font-medium text-gray-900">{file.name}</span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <p>{dayjs(file.updated_at).fromNow()}</p>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <p>{formatBytes(file.size)}</p>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right">
        <div className="flex justify-end space-x-2">
          <Button
            className="px-3 py-1 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors duration-200 flex items-center text-sm"
            onClick={() => {
              navigator.clipboard.writeText(`${location.origin}/share/${file.id}`);
              toast.success("Link copied to clipboard!");
            }}
            size="shc"
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy link
          </Button>
          <Link href={`share/${file.id}`}>
            <Button className="px-3 py-1 bg-sky-500 text-white rounded-md hover:bg-sky-600 transition-colors duration-200 flex items-center text-sm" size="shc" >
              <Eye className="h-4 w-4 mr-2" />
              View
            </Button>
          </Link>
          <Button
            size="shc"

            className={`px-3 py-1 text-sm flex items-center ${isPublic ? "bg-amber-500 hover:bg-amber-600" : "bg-violet-500 hover:bg-violet-600"
              } text-white transition-colors duration-200 cursor-pointer`}
            onClick={toggleVisibility}
            disabled={isLoading}
          >
            {isPublic ? (
              <>
                <Unlock className="h-4 w-4 mr-1" /> Public
              </>
            ) : (
              <>
                <Lock className="h-4 w-4 mr-1" /> Private
              </>
            )}
          </Button>
        </div>
      </td>
    </tr>
  );
}
