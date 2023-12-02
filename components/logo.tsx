import Image from "next/image";

interface Props {
  size: number;
}

export function Logo({ size }: Props) {
  return (
    <Image
      src="logo-hot-tiffin.svg"
      alt="Hot Tiffin logo"
      width={size}
      height={size}
    />
  );
}
