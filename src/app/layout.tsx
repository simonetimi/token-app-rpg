import type { Metadata } from 'next';
import { Inter, Pixelify_Sans } from 'next/font/google';

import ThemeSwitcher from './component/ThemeSwitcher';
import { Providers } from './providers';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });
const pixelify = Pixelify_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-pixelify',
});

export const metadata: Metadata = {
  title: 'Koriko Token Bag',
  description: 'Token Bag App for Koriko RPG game',
  icons: [
    { rel: 'icon', url: '/favicon.ico', type: 'image/x-icon' },
    {
      rel: 'icon',
      url: '/android-chrome-192x192.png',
      sizes: '192x192',
      type: 'image/png',
    },
    {
      rel: 'icon',
      url: '/android-chrome-512x512.png',
      sizes: '512x512',
      type: 'image/png',
    },
    { rel: 'apple-touch-icon', url: '/apple-touch-icon.png' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="">
      <body className={`${inter.className} ${pixelify.variable}`}>
        <Providers>
          <main className="h-screen bg-gradient-to-b from-gray-300 to-white dark:bg-gradient-to-b dark:from-gray-800 dark:to-gray-900">
            <nav className="relative mb-12 flex w-screen items-center justify-center border-b-1 border-zinc-300 p-4 dark:border-gray-700">
              <h1 className="font-pixelify p-2 text-5xl text-zinc-800 dark:text-white">
                TOKEN bag
              </h1>
              <ThemeSwitcher className="absolute right-2 pr-4 transition-transform hover:scale-125" />
            </nav>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
