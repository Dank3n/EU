import type { Metadata } from "next";
import { IBM_Plex_Mono, Newsreader, Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin", "latin-ext"],
  variable: "--font-outfit",
  display: "swap",
});

const serif = Newsreader({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-newsreader",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nica Daniel — Web Developer",
  description:
    "Portofoliu interactiv al lui Nica Daniel, web developer. Interfețe moderne, performante și ușor de folosit.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro" data-mode="pro" className={`${outfit.variable} ${serif.variable} ${mono.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
