import type { Metadata, Viewport } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { constructMetadata } from "@/lib/seo/metadata";
import { SITE_CONFIG } from "@/lib/seo/site";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });
const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: SITE_CONFIG.themeColor,
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = constructMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("scroll-smooth", "font-sans", geist.variable)} suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-slate-950 text-slate-100`}>
        {children}
      </body>
    </html>
  );
}
