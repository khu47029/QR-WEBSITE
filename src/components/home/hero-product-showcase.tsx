import Image from "next/image";
import { ShieldCheck } from "lucide-react";

export function HeroProductShowcase() {
  return (
    <div className="relative mx-auto w-full max-w-5xl px-2 sm:px-4">
      {/* Ambient Breathing Backlight Glow */}
      <div
        className="absolute -inset-1 sm:-inset-2 rounded-[2.5rem] bg-gradient-to-r from-cyan-500/20 via-sky-500/15 to-blue-600/20 blur-2xl opacity-60 animate-pulse-glow motion-reduce:animate-none pointer-events-none"
        aria-hidden="true"
      />

      {/* Main Glass Frame with Subtle Floating Animation & Hover Tilt */}
      <div className="relative rounded-3xl border border-cyan-500/30 bg-slate-900/90 p-3 sm:p-5 shadow-2xl shadow-cyan-950/50 backdrop-blur-xl transition-all duration-700 ease-out hover:border-cyan-500/50 hover:shadow-cyan-500/20 animate-float-slow motion-reduce:animate-none group">
        {/* Top Status Bar */}
        <div className="mb-3 sm:mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3 px-2 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75 motion-reduce:animate-none"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-500"></span>
            </span>
            <span className="font-bold text-white tracking-wider uppercase text-[11px] sm:text-xs">
              QRAZEN ARCHITECTURAL GATEWAY
            </span>
            <span className="hidden sm:inline text-slate-700">|</span>
            <span className="hidden sm:inline text-cyan-400 font-semibold text-[11px]">
              CONTENT-AS-A-PORTAL
            </span>
          </div>

          <div className="flex items-center gap-2 text-[10px] sm:text-xs text-emerald-400 font-mono">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>IMMUTABLE MATRIX VERIFIED</span>
          </div>
        </div>

        {/* Featured Showcase Image Container */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950 aspect-[1200/630]">
          <Image
            src="/og-image.png"
            alt="QRAZEN Dynamic QR Code and Secure Content Gateway Platform"
            width={1200}
            height={630}
            priority
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.01] motion-reduce:transition-none"
          />

          {/* Subtle Cyber Ambient Gradient Overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
}
