import "@/app/globals.css";
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="h-screen w-screen">{children}</main>; 
}
