
"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";

interface PerspectiveGridProps {
  className?: string;
  gridSize?: number;
  fadeRadius?: number;
}

export default function PerspectiveGrid({
  className,
  gridSize = 30,
  fadeRadius = 72,
}: PerspectiveGridProps) {
  const tiles = useMemo(
    () => Array.from({ length: gridSize * gridSize }, (_, index) => index),
    [gridSize]
  );

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
      style={{ perspective: "1600px" }}
    >
      <div
        className="absolute left-1/2 top-1/2 grid aspect-square w-[75rem] origin-center opacity-70"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
          transform:
            "translate(-50%, -42%) rotateX(58deg) rotateZ(-12deg) scale(1.35)",
          transformStyle: "preserve-3d",
        }}
      >
        {tiles.map((tile) => (
          <span
            key={tile}
            className="aspect-square border border-cyan-400/[0.08] bg-cyan-400/[0.015]"
          />
        ))}
      </div>

      <div
        className="absolute inset-0"
        style={{
          background:
            `radial-gradient(circle at center, transparent 0%, transparent 28%, #020617 ${fadeRadius}%, #020617 100%)`,
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/[0.04] via-transparent to-slate-950/90" />
    </div>
  );
}
