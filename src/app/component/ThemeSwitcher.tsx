'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';

export default function ThemeSwitcher({ className }: { className: string }) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className={className}>
      {theme === 'dark' ? (
        <button onClick={() => setTheme('light')}>
          <Image
            className="dark:invert"
            alt="Light Mode"
            width={26}
            height={26}
            src="./light.svg"
          />
        </button>
      ) : (
        <button onClick={() => setTheme('dark')}>
          <Image
            className="dark:invert"
            alt="Dark Mode"
            width={26}
            height={26}
            src="./dark.svg"
          />
        </button>
      )}
    </div>
  );
}
