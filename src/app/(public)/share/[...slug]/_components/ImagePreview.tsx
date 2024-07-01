export default async function ImagePreview({
  link,
  name,
}: {
  link: string;
  name: string;
}) {
  return <img alt={name} src={link} className="w-full h-full rounded-lg" />;
}
