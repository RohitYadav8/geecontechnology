import type { Metadata } from "next";

import {
  Inter,
  Manrope,
  Geist_Mono,
} from "next/font/google";

import { ThemeProvider } from "../../components/theme-provider";
import { ScrollProgress } from "../../components/scroll-progress";
import { SiteFloatingContact } from "../../components/site-floating-contact";

import "./globals.css";

/* =========================================================
   FONTS
========================================================= */

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

/* =========================================================
   METADATA
========================================================= */

export const metadata: Metadata = {
  title: "Geecon Technology",
  description: "Simple solutions engineered for extreme",
};

/* =========================================================
   ROOT LAYOUT
========================================================= */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${manrope.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider>
          <ScrollProgress />

          {children}

          <SiteFloatingContact />
        </ThemeProvider>
      </body>
    </html>
  );
}