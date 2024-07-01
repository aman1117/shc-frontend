import AudioPlayer from "@/components/AudioPlayer";

export default async function AudioPreview({
  link,
  title,
  subtile,
  className,
}: {
  link: string;
  title: string;
  subtile: string;
  className?: string;
}) {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <AudioPlayer
        title={title}
        subtitle={subtile}
        audioLink={link}
        showProgress
      />
    </div>
  );
}
