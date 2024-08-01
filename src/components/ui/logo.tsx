import { FileJson, SquareDashedBottomCode } from "lucide-react";
import Image from "next/image";
import { string } from "zod";

interface LogoProps {
  w: number;
  where?: "login" | "navbar";
}

const Logo = ({ w, where }: LogoProps) => {
  if (where === "navbar") {
    return (
      <div className="flex  items-center justify-center gap-x-1">
        <SquareDashedBottomCode size={w} className="text-green-600" />
        <p className="font-bold  text-slate-900 ">SHARECODE</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center">
      <SquareDashedBottomCode size={w} className="text-green-600" />
      <p className="font-extrabold text-lg text-slate-900 ">SHARECODE</p>
    </div>
  );
};

export default Logo;
