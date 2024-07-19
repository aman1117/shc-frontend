import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

//  not understood meaning why we write {
//   children,
// }: {
//   children: React.ReactNode;
// }
export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // why we write section tag here
    <section className="w-screen h-screen">
      <Navbar />
      {/* what does this classname do? */}
      <div className="relative grid grid-cols-12">
    {/* why we write ScrollArea what is this component. What is scrollarea component */}
        <ScrollArea
          className={cn(
            // what does this classname do? 
            "h-[calc(100vh-81px)] col-span-2 border-r border-r-border scroll-smooth"
          )}
        >
          {/* why i cant comment using "//"  here */}
          {/* check the sidebar  component */}
          <Sidebar />
        </ScrollArea>
        <ScrollArea
        // what does this classname do? 
          className={cn("col-span-10 h-[calc(100vh-81px)] scroll-smooth")}
        >
          {children}
        </ScrollArea>
      </div>
    </section>
  );
}
