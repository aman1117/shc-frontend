import { getFiles } from "@/server-actions/get-files.action";
import FileListItem from "@/components/FileListItem";
import React from "react";

export default async function ShcFiles() {
  const files = await getFiles();

  return (
    <div className="container mx-auto py-4">
      <table className="min-w-full divide-y divide-gray-200">
        {/* Table Header */}
        <thead >
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[300px] sticky top-0 bg-white z-10">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 bg-white uppercase tracking-wider sticky top-0  z-10">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky top-0 bg-white z-10">
              Size
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider sticky top-0 bg-white z-10">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {files.results.map((file, index) => (
            <React.Fragment key={file.id}>
              <FileListItem file={file} />
              {/* Divider Row */}
              {index < files.results.length - 1 && (
                <tr>
                  <td colSpan={4}>
                    <hr className="my-2 border-gray-200" />
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
