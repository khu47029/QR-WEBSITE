import type { Metadata } from "next";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo/metadata";
import { buildFaqSchema, buildWebPageSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { PublicHeader } from "@/components/layout/public-header";
import { PublicFooter } from "@/components/layout/public-footer";
import {
  HelpCircle,
  ArrowRight,
  Sparkles,
  Search,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Frequently Asked Questions — Dynamic QR & Content Knowledge Base",
  description:
    "Direct answers and technical guides for QRAZEN dynamic QR codes, PDF sharing, multi-file bundles, password protection, and zero-app mobile scanning.",
  path: "/faq",
  keywords: [
    "dynamic QR code FAQ",
    "how dynamic QR works",
    "PDF QR code questions",
    "QR code password protection help",
    "dynamic QR code lifespan",
    "QR content platform documentation",
  ],
});

const ALL_FAQS = [
  {
    category: "Dynamic QR Mechanics",
    items: [
      {
        q: "What is a dynamic QR code?",
        a: "A dynamic QR code encodes a short, unguessable server token pointing to an editable digital payload. Unlike static QR codes that permanently bake URLs into printed ink, a dynamic QR code's destination or attached files can be modified at any time without reprinting the physical code.",
      },
      {
        q: "How does dynamic QR content replacement work without reprinting?",
        a: "Every dynamic QR code generated in QRAZEN maps to an immutable public token. When you replace a PDF, image, or link in your workstation, the server updates the internal pointer to the new content version. The printed QR matrix remains 100% identical and continues resolving to the latest payload.",
      },
      {
        q: "What is the difference between dynamic and static QR codes?",
        a: "Static QR codes encode fixed data directly into the matrix, meaning broken links cannot be fixed and files cannot be updated after printing. Dynamic QR codes route through a secure resolver, unlocking live edits, password protection, expiration schedules, and privacy-preserving scan counts.",
      },
    ],
  },
  {
    category: "File Types & Bundling",
    items: [
      {
        q: "Can a QR code share a PDF?",
        a: "Yes. QRAZEN allows you to upload single or multi-page PDF documents. Scanners view the document directly inside a sandboxed mobile reader with zero app installations required.",
      },
      {
        q: "Can a QR code share multiple files at once?",
        a: "Yes. With QRAZEN Multi-File Bundles, you can consolidate PDFs, photos, ZIP archives, and text notes into a single scannable portal with integrated mobile galleries and file inspection.",
      },
      {
        q: "What file formats are supported?",
        a: "QRAZEN natively supports PDF documents, images (JPEG, PNG, WebP, GIF), plain text notes, destination URLs, and ZIP archives. All uploaded files undergo magic byte verification for client security.",
      },
    ],
  },
  {
    category: "Security & Privacy",
    items: [
      {
        q: "How does password protection work on QR codes?",
        a: "When password protection is enabled on a dynamic gateway, access is gated server-side using Argon2id / Scrypt cryptographic hashing. Content is strictly withheld until the viewer successfully enters the unlock key.",
      },
      {
        q: "Is viewer privacy protected during scans?",
        a: "Yes. QRAZEN adheres to a strict privacy-by-design architecture. We never store raw IP addresses. Repeat visitor analytics and rate-limiting utilize a cryptographic daily-rotating salt hash that cannot be reversed or tracked across days.",
      },
      {
        q: "Can I set an expiration date on a QR code?",
        a: "Yes. You can schedule time-locked expiration timers. Once the threshold is reached, the server resolver immediately ceases serving content and displays an expired status notice.",
      },
    ],
  },
  {
    category: "Viewing Experience",
    items: [
      {
        q: "Do viewers need to install any app to scan or view content?",
        a: "Never. Any native iOS or Android camera app immediately scans the QR code and opens the content cleanly in the default mobile browser.",
      },
      {
        q: "What happens if a QR code is disabled or deleted?",
        a: "If an owner disables a gateway, viewers see a suspended notice and content is withheld. If a gateway is deleted, the token immediately ceases resolution and all attached binary files are permanently purged.",
      },
    ],
  },
];

const FLATTENED_FAQS = ALL_FAQS.flatMap((cat) => cat.items);

export default function FaqPage() {
  const pageSchema = buildWebPageSchema({
    title: "Frequently Asked Questions — Dynamic QR & Content Knowledge Base",
    description:
      "Comprehensive knowledge base and direct answers regarding QRAZEN dynamic QR capabilities.",
    path: "/faq",
  });

  const faqSchema = buildFaqSchema(FLATTENED_FAQS);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500/20 selection:text-cyan-200 flex flex-col justify-between">
      <JsonLd schema={[pageSchema, faqSchema]} />
      <PublicHeader currentPath="/faq" />

      <main className="flex-1 px-6 py-12">
        <div className="mx-auto max-w-5xl">
          <Breadcrumbs items={[{ name: "Knowledge & FAQ", href: "/faq" }]} />

          {/* Hero Header */}
          <header className="py-8 text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/90 px-3.5 py-1 text-[11px] font-mono font-medium text-slate-300 ring-1 ring-white/[0.04]">
              <HelpCircle className="h-3.5 w-3.5 text-cyan-400" />
              <span className="text-cyan-300">DIRECT-ANSWER KNOWLEDGE REPOSITORY</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Knowledge Base & <br />
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 bg-clip-text text-transparent">
                Frequently Asked Questions
              </span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Clear, technical, and verifiable answers to common questions about dynamic QR pointer mutation, file distribution, and cryptographic gating.
            </p>
          </header>

          {/* Grouped FAQs */}
          <div id="faq-categories" className="my-10 sm:my-14 space-y-10 sm:space-y-12">
            {ALL_FAQS.map((categoryGroup, groupIdx) => {
              const categoryId = categoryGroup.category.toLowerCase().replace(/[^a-z0-9]+/g, "-");
              return (
                <section key={groupIdx} id={categoryId} className="space-y-4 sm:space-y-5">
                  <h2 className="text-xs font-mono font-semibold uppercase tracking-widest text-cyan-400 border-b border-slate-800/80 pb-2.5">
                    {categoryGroup.category}
                  </h2>

                  <div className="space-y-3.5">
                    {categoryGroup.items.map((faq, idx) => (
                      <article
                        key={idx}
                        className="rounded-xl sm:rounded-2xl border border-slate-800/80 bg-slate-900/50 p-5 sm:p-6 space-y-2 hover:border-slate-700/80 transition-colors ring-1 ring-white/[0.02]"
                      >
                        <h3 className="text-sm sm:text-base font-bold text-white flex items-start gap-2">
                          <span className="text-cyan-400 font-mono text-xs mt-0.5 font-bold">Q:</span>
                          <span>{faq.q}</span>
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-4 border-l border-cyan-500/30 ml-1.5 mt-2">
                          {faq.a}
                        </p>
                      </article>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>

          {/* Quick Capability Links */}
          <section id="capabilities" className="my-14 rounded-2xl border border-slate-800/90 bg-slate-900/70 p-6 sm:p-8 ring-1 ring-white/[0.04]">
            <h2 className="text-lg sm:text-xl font-bold text-white mb-5">Explore Detailed Capabilities</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3.5 sm:gap-4">
              <Link
                href="/dynamic-qr"
                className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-4 hover:border-cyan-500/40 hover:bg-slate-900/80 transition-all group"
              >
                <span className="text-xs font-bold text-white group-hover:text-cyan-300 block mb-1">
                  Dynamic QR Codes →
                </span>
                <span className="text-[11px] text-slate-400">Pointer mutation mechanics</span>
              </Link>
              <Link
                href="/pdf-qr"
                className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-4 hover:border-cyan-500/40 hover:bg-slate-900/80 transition-all group"
              >
                <span className="text-xs font-bold text-white group-hover:text-cyan-300 block mb-1">
                  PDF Sharing →
                </span>
                <span className="text-[11px] text-slate-400">Zero-app document viewer</span>
              </Link>
              <Link
                href="/image-qr"
                className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-4 hover:border-cyan-500/40 hover:bg-slate-900/80 transition-all group"
              >
                <span className="text-xs font-bold text-white group-hover:text-cyan-300 block mb-1">
                  Image Galleries →
                </span>
                <span className="text-[11px] text-slate-400">High-res photo portals</span>
              </Link>
              <Link
                href="/multi-file-qr"
                className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-4 hover:border-cyan-500/40 hover:bg-slate-900/80 transition-all group"
              >
                <span className="text-xs font-bold text-white group-hover:text-cyan-300 block mb-1">
                  Multi-File Bundles →
                </span>
                <span className="text-[11px] text-slate-400">ZIP & mixed asset hubs</span>
              </Link>
              <Link
                href="/security"
                className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-4 hover:border-cyan-500/40 hover:bg-slate-900/80 transition-all group"
              >
                <span className="text-xs font-bold text-white group-hover:text-cyan-300 block mb-1">
                  Security & Privacy →
                </span>
                <span className="text-[11px] text-slate-400">Argon2id & zero raw IP</span>
              </Link>
            </div>
          </section>

          {/* Engineering & Technical Guides */}
          <section id="guides" className="my-14 rounded-2xl border border-slate-800/90 bg-slate-900/70 p-6 sm:p-8 ring-1 ring-white/[0.04]">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg sm:text-xl font-bold text-white">Engineering & Technical Guides</h2>
              <Link href="/learn" className="text-xs font-mono text-cyan-400 hover:underline">
                View Knowledge Hub →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4">
              <Link
                href="/learn/dynamic-vs-static-qr-codes"
                className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-4 hover:border-cyan-500/40 hover:bg-slate-900/80 transition-all group"
              >
                <span className="text-xs font-bold text-white group-hover:text-cyan-300 block mb-1">
                  Dynamic vs Static →
                </span>
                <span className="text-[11px] text-slate-400">Deep architectural comparison</span>
              </Link>
              <Link
                href="/learn/qr-code-print-size-guide"
                className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-4 hover:border-cyan-500/40 hover:bg-slate-900/80 transition-all group"
              >
                <span className="text-xs font-bold text-white group-hover:text-cyan-300 block mb-1">
                  Print Sizing Guide →
                </span>
                <span className="text-[11px] text-slate-400">Scan distance calculation</span>
              </Link>
              <Link
                href="/learn/qr-code-error-correction"
                className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-4 hover:border-cyan-500/40 hover:bg-slate-900/80 transition-all group"
              >
                <span className="text-xs font-bold text-white group-hover:text-cyan-300 block mb-1">
                  Error Correction →
                </span>
                <span className="text-[11px] text-slate-400">Reed-Solomon recovery levels</span>
              </Link>
              <Link
                href="/learn/multiple-files-qr-code"
                className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-4 hover:border-cyan-500/40 hover:bg-slate-900/80 transition-all group"
              >
                <span className="text-xs font-bold text-white group-hover:text-cyan-300 block mb-1">
                  Multi-File Linking →
                </span>
                <span className="text-[11px] text-slate-400">Consolidated bundle methods</span>
              </Link>
            </div>
          </section>

          {/* CTA Banner */}
          <section className="my-14 rounded-2xl border border-slate-800/90 bg-slate-900/80 p-7 sm:p-10 text-center space-y-3.5 ring-1 ring-white/[0.04]">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Ready to Create Your Dynamic QR Code?
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm max-w-lg mx-auto">
              Join QRAZEN and experience next-generation dynamic QR infrastructure.
            </p>
            <div className="pt-2">
              <Link
                href="/signup"
                className="rounded-xl bg-cyan-500 px-7 py-3 text-xs font-bold text-slate-950 hover:bg-cyan-400 shadow-md shadow-cyan-500/20 transition-all inline-flex items-center gap-2"
              >
                Get Started Free <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </section>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
