export default async function VideoPreview({ link }: { link: string }) {
  return <video controls src={link} className="w-full h-full rounded-lg" />;
}
