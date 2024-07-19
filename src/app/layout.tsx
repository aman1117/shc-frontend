import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ShareCode online",
  description: "in development",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // {/* what does lang= "en" do? */}
    <html lang="en">
      {/* why does we use curly braces in the below classname? */}
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
