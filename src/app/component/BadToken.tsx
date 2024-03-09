import Image from 'next/image';

export default function BadToken() {
  return (
    <Image
      className="dark:invert"
      alt="Bad Token"
      width={26}
      height={26}
      src="./bad.svg"
    />
  );
}
