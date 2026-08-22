import type { Metadata } from "next";

import { Inter, Geist_Mono } from "next/font/google";

import { ThemeProvider } from "../../components/theme-provider";
import { ScrollProgress } from "../../components/scroll-progress";
import { SiteFloatingContact } from "../../components/site-floating-contact";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Geecon Technology",
  description: "Simple solutions engineered for extreme",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <ScrollProgress />

          {children}

          <SiteFloatingContact />
        </ThemeProvider>
      </body>
    </html>
  );
}