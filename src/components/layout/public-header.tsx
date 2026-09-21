import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/seo/site";

interface PublicHeaderProps {
  currentPath?: string;
}

export function PublicHeader({ currentPath }: PublicHeaderProps) {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md px-6 py-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        {/* Brand Logo & Slogan */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-slate-950 font-black text-sm shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            QR
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-white tracking-tight text-base leading-none">
              {SITE_CONFIG.name}
            </span>
            <span className="text-[10px] font-mono text-cyan-400 tracking-wider">
              ACCESS GATEWAY
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-5 text-xs font-mono text-slate-400">
          {SITE_CONFIG.navLinks.map((link) => {
            const isActive = currentPath === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors hover:text-cyan-400 ${
                  isActive ? "text-cyan-400 font-semibold" : "text-slate-400"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* User CTA Links */}
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-xs font-mono font-medium text-slate-300 hover:text-white transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="inline-flex items-center gap-1.5 rounded-xl bg-cyan-500 px-4 py-2 text-xs font-bold text-slate-950 shadow-lg shadow-cyan-500/20 hover:bg-cyan-400 transition-all active:scale-[0.98]"
          >
            Mint Free QR <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
