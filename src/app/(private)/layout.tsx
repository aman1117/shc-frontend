import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="w-screen h-screen">
      <Navbar />
      <div className="relative grid grid-cols-12">
        <ScrollArea
          className={cn(
            "h-[calc(100vh-81px)] col-span-2 border-r border-r-border scroll-smooth"
          )}
        >
          <Sidebar />
        </ScrollArea>
        <ScrollArea
          className={cn("col-span-10 h-[calc(100vh-81px)] scroll-smooth")}
        >
          {children}
        </ScrollArea>
      </div>
    </section>
  );
}
