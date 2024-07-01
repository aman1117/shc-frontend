import { highlight } from "@/lib/shiki";
import { Lang } from "shiki";
import { KV } from "@/lib/kv";

type HighlightedHtml = {
  html: string;
  lineCount: number;
};

export default async function CodePreview({
  link,
  lang,
  fileId,
  start = 1,
}: {
  link: string;
  fileId: string;
  lang: Lang;
  start?: number;
}) {
  let highlightedHtml = (await KV.get("html_of_" + fileId)) as
    | HighlightedHtml
    | undefined;

  if (!highlightedHtml) {
    const response = await fetch(link, { cache: "no-cache" });
    const text = await response.text();
    highlightedHtml = await highlight(text, "dark-plus", lang);

    const { html, lineCount } = highlightedHtml;
    await KV.set("html_of_" + fileId, { html, lineCount });
  }

  const { html, lineCount } = highlightedHtml;

  return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
      className="bg-slate-800 rounded-lg"
      style={{
        fontSize: "1rem",
        //@ts-expect-error
        "--start": start,
        "--line-count": lineCount,
        "--line-number-width": lineCount
          ? `${Math.abs(lineCount + start - 1).toString().length + 1}rem`
          : "8rem",
      }}
    />
  );
}
