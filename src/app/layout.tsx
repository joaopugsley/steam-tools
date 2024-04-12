import type { Metadata } from "next";
import AeonikPro from "next/font/local";
import "./globals.css";

const aeonik = AeonikPro({
  src: [
    {
      path: '../../public/fonts/AeonikPro-Regular.woff2',
      weight: '400',
      style: "normal",
    },
    {
      path: '../../public/fonts/AeonikPro-Medium.woff2',
      weight: '600',
      style: "normal",
    },
    {
      path: '../../public/fonts/AeonikPro-Black.woff2',
      weight: '900',
      style: "normal",
    },
  ],
})

export const metadata: Metadata = {
  title: "SteamTools",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={aeonik.className}>
      <body>
        <main className="min-h-[calc(100dvh-4rem)] md:min-h[calc(100dvh-5rem)]">
          {children}
        </main>
      </body>
    </html>
  );
}
