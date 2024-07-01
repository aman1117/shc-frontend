const ExtensionToLanguageMap = {
  // Languages with rich IntelliSense and validation
  ".ts": "typescript",
  ".js": "javascript",
  ".css": "css",
  ".less": "less",
  ".scss": "scss",
  ".json": "json",
  ".html": "html",

  // Languages with only basic syntax colorization
  ".xml": "xml",
  ".php": "php",
  ".cs": "csharp",
  ".cpp": "cpp",
  ".c": "c",
  ".java": "java",
  ".vb": "vb",
  ".coffee": "coffeescript",
  ".hbs": "handlebars",
  ".sh": "shell",
  ".pug": "pug",
  ".fs": "fsharp",
  ".lua": "lua",
  ".ps1": "powershell",
  ".py": "python",
  ".rb": "ruby",
  ".sass": "sass",
  ".r": "r",
  ".m": "objective-c",
  ".md": "markdown",
  ".diff": "diff",
  ".rs": "rust",
  ".go": "go",

  // plain text
  ".txt": "plaintext",
  ".csv": "plaintext",
  ".tsv": "plaintext",
  ".sql": "plaintext",
  ".ics": "plaintext",
} as const;

export default ExtensionToLanguageMap;

export function getLanguageFromShcFileExtension(extension: string): string {
  // Remove dot prefix if present
  const normalizedExtension = extension.startsWith(".")
    ? extension.slice(1)
    : extension;

  if (
    ExtensionToLanguageMap[normalizedExtension] ||
    ExtensionToLanguageMap["." + normalizedExtension]
  ) {
    return (
      ExtensionToLanguageMap[normalizedExtension] ||
      ExtensionToLanguageMap["." + normalizedExtension]
    );
  } else {
    return "plaintext";
  }
}
