"use client";

import { useState } from "react";
import { FileIcon, defaultStyles } from "react-file-icon";
import Link from "next/link";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { dayjs } from "@/lib/dayjs";
import { formatBytes } from "@/lib/utils";
import { ShcFile } from "@/types/file.type";
import { toast } from "sonner";
import { toggleFileVisibility } from "@/server-actions/toggle-file-visibility.action";
import { Toggle } from "./ui/toggle";
import { Badge } from "./ui/badge";
import { Copy, Eye, Settings2 } from "lucide-react";

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
    <div>
      <div className="bg-mygrey rounded-lg">
        <div className="flex gap-2 items-center  p-2 rounded-lg ml-1">
          <div className="w-12 bg-dblue  p-2 rounded-lg">
            <FileIcon
              extension={file.extension}
              {...defaultStyles[file.extension]}
            />
          </div>
          <div className="flex items-center justify-between w-full">
            <div className="ml-1">
              <p className="font-medium text-sm ">{file.name}</p>
              <div className="text-xs text-muted-foreground">
                <p>{dayjs(file.updated_at).fromNow()}</p>
                <p>{formatBytes(file.size)}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `${location.origin}/share/${file.id}`
                    );
                    toast.success("Link copied to clipboard!");
                  }}
                >
                  <Badge variant="outline" className="cursor-pointer hover:bg-gray-200 text-gray-800 p-1">
                    <span className="px-1">Copy link</span>
                    <Copy className="ml-1" size={16} />
                  </Badge>
                </button>
              </div>
              <div>
                <Link href={`share/${file.id}`}>
                  <Badge variant="outline" className="cursor-pointer hover:bg-blue-600  p-1 bg-blue-500 ">
                    <span className="px-1 text-white">View</span>
                    <Eye className="ml-1 text-white" size={16} />
                  </Badge>

                </Link>
              </div>
              <div className="flex flex-col items-center space-x-2">
                {/* <Switch
                  disabled={isLoading}
                  checked={isPublic}
                  onCheckedChange={() => {
                    toggleVisibility();
                  }}
                  id={file.id}
                /> */}
                <Label htmlFor={file.id}>
                  {isPublic ? (
                    <Badge variant="public" className="cursor-pointer  mr-2 p-1  hover:bg-red-600" onClick={() => toggleVisibility()}>
                      <span className="px-1">
                        {isLoading ? "Loading... " : "Public "}
                      </span>
                      <div>
                        {!isLoading && <Settings2 className="ml-1" size={16} />}
                      </div>
                    </Badge>

                  ) : (
                    <Badge variant="private" className="cursor-pointer mr-2 p-1 hover:bg-green-600" onClick={() => toggleVisibility()}>
                      <span className="px-1">
                        {isLoading ? "Loading... " : "Private "}
                      </span>
                      {!isLoading && <Settings2 size={16} />}
                    </Badge>
                  )}
                </Label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}
