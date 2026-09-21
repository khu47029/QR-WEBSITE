import { cn } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/seo/site";

interface QrazenLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  subtitle?: string;
  className?: string;
  animate?: boolean;
}

export function QrazenIconMark({
  size = "md",
  className,
  animate = true,
}: {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  animate?: boolean;
}) {
  const sizeClasses = {
    sm: "h-7 w-7 rounded-lg",
    md: "h-9 w-9 rounded-xl",
    lg: "h-10 w-10 rounded-xl",
    xl: "h-12 w-12 rounded-2xl",
  };

  const svgSizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-5.5 w-5.5",
    xl: "h-7 w-7",
  };

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden flex-shrink-0",
        "bg-gradient-to-br from-cyan-400 via-sky-500 to-blue-600",
        "shadow-md shadow-cyan-500/25 border border-cyan-300/30",
        "group-hover:scale-105 group-hover:shadow-cyan-500/40 group-hover:border-cyan-300/60",
        "transition-all duration-500 ease-out",
        sizeClasses[size],
        className
      )}
    >
      {/* Ambient Breathing Cyan Glow */}
      {animate && (
        <div
          className="absolute -inset-1 rounded-xl bg-cyan-400/20 blur-sm opacity-50 animate-pulse-glow motion-reduce:animate-none pointer-events-none"
          aria-hidden="true"
        />
      )}

      {/* Futuristic Light Sweep / Shimmer Across the Logo Badge */}
      {animate && (
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none motion-reduce:hidden"
          aria-hidden="true"
        />
      )}

      {/* The Exact Geometric Favicon/Site-Icon Mark */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={cn(
          "relative z-10 text-slate-950 drop-shadow-sm transition-transform duration-500 group-hover:scale-105",
          svgSizes[size]
        )}
        aria-hidden="true"
      >
        <path d="M3 3h8v8H3zm10 0h8v8h-8zM3 13h8v8H3zm13 3h2v2h-2zm-3-3h2v2h-2zm3 3h2v2h-2zm3-3h2v2h-2zm-3 3h2v2h-2z" />
      </svg>
    </div>
  );
}

export function QrazenLogo({
  size = "md",
  showText = true,
  subtitle = "ACCESS GATEWAY",
  className,
  animate = true,
}: QrazenLogoProps) {
  return (
    <div className={cn("inline-flex items-center gap-2.5 group select-none", className)}>
      <QrazenIconMark size={size} animate={animate} />

      {showText && (
        <div className="flex flex-col text-left">
          <span className="font-bold text-white tracking-tight text-base leading-none group-hover:text-cyan-100 transition-colors">
            {SITE_CONFIG.name}
          </span>
          {subtitle && (
            <span className="text-[10px] font-mono text-cyan-400 tracking-wider transition-colors group-hover:text-cyan-300 mt-1">
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
