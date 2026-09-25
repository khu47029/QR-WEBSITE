import type { Metadata } from "next";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo/metadata";
import { buildWebPageSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { PublicHeader } from "@/components/layout/public-header";
import { PublicFooter } from "@/components/layout/public-footer";
import {
  BookOpen,
  ArrowRight,
  RefreshCw,
  Maximize2,
  ShieldAlert,
  Layers,
} from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "QR Engineering & Technical Knowledge Hub — QRAZEN Learn",
  description:
    "Authoritative technical guides on QR code engineering: dynamic vs static comparison, print sizing standards, error correction levels (L/M/Q/H), and multi-file distribution.",
  path: "/learn",
  keywords: [
    "QR code engineering",
    "dynamic vs static QR guide",
    "QR code print sizing standards",
    "QR code error correction levels",
    "multi-file QR sharing guide",
    "QRAZEN learn",
  ],
});

const GUIDES = [
  {
    category: "QR Code Architecture & Standards",
    items: [
      {
        slug: "dynamic-vs-static-qr-codes",
        title: "Dynamic QR Codes vs Static QR Codes: The Engineering Difference",
        description:
          "Understand how dynamic pointer mutation decouples printed physical ink from changeable digital payloads, preventing reprint costs.",
        icon: RefreshCw,
        readTime: "6 min read",
      },
      {
        slug: "qr-code-print-size-guide",
        title: "QR Code Print Size & Distance Standards Guide",
        description:
          "Practical formulas, minimum print dimensions, scanning distance ratios (D:S), and quiet zone rules for crisp physical scans.",
        icon: Maximize2,
        readTime: "7 min read",
      },
      {
        slug: "qr-code-error-correction",
        title: "QR Code Error Correction Explained: Levels L, M, Q, and H",
        description:
          "How Reed-Solomon error correction algorithms allow damaged, dirty, or branded QR codes to remain readable by smartphone cameras.",
        icon: ShieldAlert,
        readTime: "5 min read",
      },
    ],
  },
  {
    category: "Digital Content Distribution",
    items: [
      {
        slug: "multiple-files-qr-code",
        title: "How to Share Multiple Files and Digital Bundles with One QR Code",
        description:
          "A complete workflow guide for consolidating PDFs, image galleries, notes, and ZIP archives behind a single dynamic mobile gateway.",
        icon: Layers,
        readTime: "5 min read",
      },
    ],
  },
];

export default function LearnIndexPage() {
  const pageSchema = buildWebPageSchema({
    title: "QR Engineering & Technical Knowledge Hub — QRAZEN Learn",
    description:
      "Authoritative technical guides on QR code engineering: dynamic vs static comparison, print sizing standards, error correction levels, and multi-file distribution.",
    path: "/learn",
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500/20 selection:text-cyan-200 flex flex-col justify-between">
      <JsonLd schema={pageSchema} />
      <PublicHeader currentPath="/learn" />

      <main className="flex-1 px-6 py-12">
        <div className="mx-auto max-w-5xl">
          <Breadcrumbs items={[{ name: "Learn & Knowledge Hub", href: "/learn" }]} />

          {/* Hero Header */}
          <header className="py-8 text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/90 px-3.5 py-1 text-[11px] font-mono font-medium text-slate-300 ring-1 ring-white/[0.04]">
              <BookOpen className="h-3.5 w-3.5 text-cyan-400" />
              <span className="text-cyan-300">TECHNICAL QR ENGINEERING REPOSITORY</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              QR Engineering & <br />
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 bg-clip-text text-transparent">
                Practical Implementation Guides
              </span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Factual, specification-grounded guides on QR code geometry, printing tolerances, Reed-Solomon error correction, and multi-asset dynamic gateways.
            </p>
          </header>

          {/* Guides Categories */}
          <div className="my-10 sm:my-14 space-y-12">
            {GUIDES.map((group, groupIdx) => (
              <section key={groupIdx} className="space-y-5">
                <h2 className="text-xs font-mono font-semibold uppercase tracking-widest text-cyan-400 border-b border-slate-800/80 pb-2.5">
                  {group.category}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {group.items.map((guide) => {
                    const Icon = guide.icon;
                    return (
                      <Link
                        key={guide.slug}
                        href={`/learn/${guide.slug}`}
                        className="group rounded-2xl border border-slate-800/80 bg-slate-900/50 p-6 space-y-3 hover:border-cyan-500/40 hover:bg-slate-900/80 transition-all ring-1 ring-white/[0.02] flex flex-col justify-between"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-cyan-400 border border-slate-700/80 group-hover:border-cyan-500/40 group-hover:text-cyan-300 transition-colors">
                              <Icon className="h-5 w-5" />
                            </div>
                            <span className="text-[11px] font-mono text-slate-500">
                              {guide.readTime}
                            </span>
                          </div>
                          <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-200 transition-colors">
                            {guide.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                            {guide.description}
                          </p>
                        </div>

                        <div className="pt-2 text-xs font-mono text-cyan-400 group-hover:text-cyan-300 inline-flex items-center gap-1.5 font-medium">
                          Read Technical Guide <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>

          {/* Quick Capability Matrix */}
          <section className="my-14 rounded-2xl border border-slate-800/90 bg-slate-900/70 p-6 sm:p-8 ring-1 ring-white/[0.04]">
            <h2 className="text-lg sm:text-xl font-bold text-white mb-2">Explore Platform Capabilities</h2>
            <p className="text-xs sm:text-sm text-slate-400 mb-6">
              Learn how QRAZEN implements these engineering principles into a secure, dynamic content platform.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Link
                href="/dynamic-qr"
                className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-3.5 text-center hover:border-cyan-500/40 hover:bg-slate-900/80 transition-all text-xs font-mono text-slate-300 hover:text-cyan-300"
              >
                Dynamic QR Gateway →
              </Link>
              <Link
                href="/pdf-qr"
                className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-3.5 text-center hover:border-cyan-500/40 hover:bg-slate-900/80 transition-all text-xs font-mono text-slate-300 hover:text-cyan-300"
              >
                PDF Document Sharing →
              </Link>
              <Link
                href="/image-qr"
                className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-3.5 text-center hover:border-cyan-500/40 hover:bg-slate-900/80 transition-all text-xs font-mono text-slate-300 hover:text-cyan-300"
              >
                Image Galleries →
              </Link>
              <Link
                href="/security"
                className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-3.5 text-center hover:border-cyan-500/40 hover:bg-slate-900/80 transition-all text-xs font-mono text-slate-300 hover:text-cyan-300"
              >
                Security & Privacy →
              </Link>
            </div>
          </section>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
