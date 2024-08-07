import Image from "next/image";

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
    <div className="flex items-center">
      <Image
        src="/assets/images/logo.png"
        alt="logo"
        width={100}
        height={100}
      />
      <div className="ml-4">
        <span className="text-4xl text-neutral-800 font-bold block">
          sharecode
        </span>
        <span className="text-2xl text-neutral-800 block">sign in</span>
      </div>
    </div>
  );
};

export default Logo;
