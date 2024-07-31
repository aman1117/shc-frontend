import Image from "next/image";

interface LogoProps {
  w: number;
  h: number;
}

const Logo = ({ w, h }: LogoProps) => {
  return (
    <div>
      <Image src="/logo.png" alt="Logo" width={w} height={h} />
    </div>
  );
};

export default Logo;
