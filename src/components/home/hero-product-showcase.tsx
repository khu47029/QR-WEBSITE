import Image from "next/image";
import { ShieldCheck } from "lucide-react";

export function HeroProductShowcase() {
  return (
    <div className="relative mx-auto w-full max-w-5xl px-2 sm:px-4">
      {/* Subtle Ambient Grounding Light */}
      <div
        className="absolute -inset-1 sm:-inset-2 rounded-[2rem] bg-gradient-to-r from-cyan-500/10 via-sky-500/5 to-blue-600/10 blur-2xl opacity-40 pointer-events-none"
        aria-hidden="true"
      />

      {/* Main Precision Hardware Chassis */}
      <div className="relative rounded-2xl sm:rounded-3xl border border-slate-800/90 bg-slate-900/95 p-2.5 sm:p-4 shadow-2xl shadow-slate-950/90 ring-1 ring-white/[0.06] transition-all duration-500 ease-out hover:border-slate-700/80 group">
        {/* Top Precision Status Bar */}
        <div className="mb-2.5 sm:mb-3.5 flex flex-wrap items-center justify-between gap-2.5 border-b border-slate-800/70 pb-2.5 sm:pb-3 px-2 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400"></span>
            </span>
            <span className="font-semibold text-slate-200 tracking-wider uppercase text-[11px] sm:text-xs">
              QRAZEN ARCHITECTURAL GATEWAY
            </span>
            <span className="hidden sm:inline text-slate-700">/</span>
            <span className="hidden sm:inline text-slate-400 font-medium text-[11px]">
              CONTENT-AS-A-PORTAL
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-emerald-400/90 font-mono">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>IMMUTABLE MATRIX VERIFIED</span>
          </div>
        </div>

        {/* Featured Showcase Display Frame */}
        <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-slate-800/80 bg-slate-950 aspect-[1200/630]">
          <Image
            src="/og-image.png"
            alt="QRAZEN Dynamic QR Code and Secure Content Gateway Platform"
            width={1200}
            height={630}
            priority
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.005] motion-reduce:transition-none"
          />

          {/* Precision Vignette Overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent pointer-events-none"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
}
