"use client";
import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { ShcFile } from "@/types/file.type";
import { getLanguageFromShcFileExtension } from "@/data/consts";

type MonacoEditorProps = {
  file: ShcFile;
};

export function MonacoEditor({ file }: MonacoEditorProps) {
  const [initialShcFileContent, setInitialShcFileContent] = useState<
    string | undefined
  >(undefined);

  async function setInitialShcFileContentHelper(r2_path: string) {
    const fileContent = await (
      await fetch("https://files.shc.ajaysharma.dev/" + r2_path)
    ).text();

    setInitialShcFileContent(fileContent);
  }

  useEffect(() => {
    setInitialShcFileContentHelper(file.download_url);
  }, [file.download_url]);

  return (
    <>
      {initialShcFileContent === undefined && <div>Loading...</div>}
      {initialShcFileContent && (
        <Editor
          height="100dvh"
          width="100dvw"
          theme="vs-dark"
          defaultLanguage={getLanguageFromShcFileExtension(file.extension)}
          defaultValue={initialShcFileContent}
          options={{
            codeLens: false,
            fontSize: 20,
            renderValidationDecorations: "off",
          }}
        />
      )}
    </>
  );
}
