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
      <Card className="rounded-none">
        <div className="flex gap-2 items-center bg-mygrey p-2 rounded-lg">
          <div className="w-12 bg-dblue  p-2 rounded-lg">
            <FileIcon
              extension={file.extension}
              {...defaultStyles[file.extension]}
            />
          </div>
          <div className="flex items-center justify-between w-full">
            <div>
              <p>{file.name}</p>
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
                  <span className="font-semibold hover:underline text-sm underline-offset-4">
                    Copy Link
                  </span>
                </button>
              </div>
              <div>
                <Link href={`share/${file.id}`}>
                  <span className="font-semibold hover:underline text-sm underline-offset-4">
                    View
                  </span>
                </Link>
              </div>
              <div className="flex flex-col items-center space-x-2">
                <Switch
                  disabled={isLoading}
                  checked={isPublic}
                  onCheckedChange={() => {
                    toggleVisibility();
                  }}
                  id={file.id}
                />
                <Label htmlFor={file.id}>
                  <div className="mt-2">
                    <span className="font-semibold  mr-2">
                      {isPublic ? "Public" : "Private"}
                    </span>
                  </div>
                </Label>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
