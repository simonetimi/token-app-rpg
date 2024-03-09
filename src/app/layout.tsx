import type { Metadata } from 'next';
import { Grandstander, Inter } from 'next/font/google';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });
const grandstander = Grandstander({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-grandstander',
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
    <html lang="en">
      <body className={`${inter.className} ${grandstander.variable}`}>
        {children}
      </body>
    </html>
  );
}
