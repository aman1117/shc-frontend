import { FileJson, SquareDashedBottomCode } from "lucide-react";
import Image from "next/image";
import { string } from "zod";

interface LogoProps {
  where?: "login" | "navbar";
}

const Logo = ({ where }: LogoProps) => {
  if (where === "navbar") {
    return (
      <Image
        src="/assets/images/logo-hori.png"
        alt="logo"
        width={100}
        height={100}
      />
    );
  }
  return (
    <div className="flex justify-center gap-y-4 ">
      <Image
        src="/assets/images/logo.png"
        alt="logo"
        width={100}
        height={100}
      />
      <span className="text-4xl text-neutral-800 font-bold  ml-2 mt-16">
        sharecode
      </span>
    </div>
  );
};

export default Logo;
