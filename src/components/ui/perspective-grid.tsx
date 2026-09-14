"use client";

import React, { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

interface PerspectiveGridProps {
  className?: string;
  gridSize?: number;
  showOverlay?: boolean;
  fadeRadius?: number;
}

export function PerspectiveGrid({
  className,
  gridSize = 40,
  showOverlay = true,
  fadeRadius = 80,
}: PerspectiveGridProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const tiles = useMemo(
    () => Array.from({ length: gridSize * gridSize }),
    [gridSize]
  );

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden bg-slate-950",
        className
      )}
      style={{
        perspective: "2000px",
        transformStyle: "preserve-3d",
      }}
    >
      <div
        className="absolute left-1/2 top-1/2 grid aspect-square w-[80rem] origin-center"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${gridSize}, minmax(0, 1fr))`,
          transform:
            "translate(-50%, -50%) rotateX(62deg) rotateZ(-12deg) scale(1.8)",
          transformStyle: "preserve-3d",
          animation: "perspectiveGridMove 14s ease-in-out infinite",
        }}
      >
        {mounted &&
          tiles.map((_, index) => (
            <div
              key={index}
              className="min-h-[1px] min-w-[1px] border border-cyan-400/20 bg-cyan-400/[0.03]"
            />
          ))}
      </div>

      {showOverlay && (
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, transparent 0%, transparent 25%, #020617 ${fadeRadius}%, #020617 100%)`,
          }}
        />
      )}

      <div className="absolute inset-0 z-20 bg-gradient-to-b from-cyan-500/[0.08] via-transparent to-slate-950" />

      <style jsx>{`
        @keyframes perspectiveGridMove {
          0% {
            transform: translate(-50%, -50%) rotateX(62deg)
              rotateZ(-12deg) scale(1.8);
          }

          50% {
            transform: translate(-50%, -43%) rotateX(62deg)
              rotateZ(-12deg) scale(1.9);
          }

          100% {
            transform: translate(-50%, -50%) rotateX(62deg)
              rotateZ(-12deg) scale(1.8);
          }
        }
      `}</style>
    </div>
  );
}

export default PerspectiveGrid;
