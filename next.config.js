/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "files.shc.ajaysharma.dev",
      },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ["shiki", "vscode-oniguruma"],
  },
};

module.exports = nextConfig;
