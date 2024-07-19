import "@/app/globals.css";
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // why we write main tag here
  // what does this classname do?
  return <main className="h-screen w-screen">{children}</main>; 
}
