import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Line Dancer · Find your next floor favorite",
  description: "Keep your favorite line dances close. Discover a new dance, learn the steps, and build your own dance collection.",
  icons: { icon: "/favicon.svg" },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><head><meta name="theme-color" content="#faf8f3"/><link rel="preconnect" href="https://fonts.googleapis.com"/><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/><link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;450;500;550;600;650;700&family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet"/></head><body>{children}</body></html>;
}
