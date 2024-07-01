export default async function NoPreview({
  fileSizeLimitExceeded,
}: {
  fileSizeLimitExceeded?: boolean;
}) {
  if (fileSizeLimitExceeded) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-4xl font-bold text-red-500">
          File too large to preview
        </p>
      </div>
    );
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-4xl font-bold">
        No preview available. Please download the file to view it.
      </p>
    </div>
  );
}
