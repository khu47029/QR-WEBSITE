import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "QR Content Gateway — Content Becomes Access",
    template: "%s | QR Content Gateway",
  },
  description:
    "Enterprise-grade dynamic QR infrastructure. Transform files, documents, bundles, and URLs into immutable, password-gated, and editable access portals.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%230284c7'><path d='M3 3h8v8H3zm10 0h8v8h-8zM3 13h8v8H3zm13 3h2v2h-2zm-3-3h2v2h-2zm3 3h2v2h-2zm3-3h2v2h-2zm-3 3h2v2h-2z'/></svg>",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-slate-950 text-slate-100`}>
        {children}
      </body>
    </html>
  );
}
