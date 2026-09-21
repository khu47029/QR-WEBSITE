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
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-mono font-medium text-cyan-300">
              <HelpCircle className="h-3.5 w-3.5" />
              <span>DIRECT-ANSWER KNOWLEDGE REPOSITORY</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Knowledge Base & <br />
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">
                Frequently Asked Questions
              </span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Clear, technical, and verifiable answers to common questions about dynamic QR pointer mutation, file distribution, and cryptographic gating.
            </p>
          </header>

          {/* Grouped FAQs */}
          <div className="my-12 space-y-12">
            {ALL_FAQS.map((categoryGroup, groupIdx) => (
              <section key={groupIdx} className="space-y-6">
                <h2 className="text-xs font-mono font-semibold uppercase tracking-widest text-cyan-400 border-b border-slate-900 pb-3">
                  {categoryGroup.category}
                </h2>

                <div className="space-y-4">
                  {categoryGroup.items.map((faq, idx) => (
                    <article
                      key={idx}
                      className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-2 hover:border-slate-700 transition-colors"
                    >
                      <h3 className="text-base font-bold text-white flex items-start gap-2">
                        <span className="text-cyan-400 font-mono text-xs mt-1">Q:</span>
                        <span>{faq.q}</span>
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-5 border-l border-cyan-500/30 ml-2 mt-2">
                        {faq.a}
                      </p>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Quick Capability Links */}
          <section className="my-16 rounded-3xl border border-slate-800 bg-slate-900/40 p-8">
            <h2 className="text-xl font-bold text-white mb-6">Explore Detailed Capabilities</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <Link
                href="/dynamic-qr"
                className="rounded-xl border border-slate-800 bg-slate-900/80 p-4 hover:border-cyan-500/40 hover:bg-slate-800/80 transition-all group"
              >
                <span className="text-xs font-bold text-white group-hover:text-cyan-400 block mb-1">
                  Dynamic QR Codes →
                </span>
                <span className="text-[11px] text-slate-400">Pointer mutation mechanics</span>
              </Link>
              <Link
                href="/pdf-qr"
                className="rounded-xl border border-slate-800 bg-slate-900/80 p-4 hover:border-cyan-500/40 hover:bg-slate-800/80 transition-all group"
              >
                <span className="text-xs font-bold text-white group-hover:text-cyan-400 block mb-1">
                  PDF Sharing →
                </span>
                <span className="text-[11px] text-slate-400">Zero-app document viewer</span>
              </Link>
              <Link
                href="/image-qr"
                className="rounded-xl border border-slate-800 bg-slate-900/80 p-4 hover:border-cyan-500/40 hover:bg-slate-800/80 transition-all group"
              >
                <span className="text-xs font-bold text-white group-hover:text-cyan-400 block mb-1">
                  Image Galleries →
                </span>
                <span className="text-[11px] text-slate-400">High-res multi-photo portals</span>
              </Link>
              <Link
                href="/security"
                className="rounded-xl border border-slate-800 bg-slate-900/80 p-4 hover:border-cyan-500/40 hover:bg-slate-800/80 transition-all group"
              >
                <span className="text-xs font-bold text-white group-hover:text-cyan-400 block mb-1">
                  Security & Privacy →
                </span>
                <span className="text-[11px] text-slate-400">Argon2id & zero raw IP</span>
              </Link>
            </div>
          </section>

          {/* CTA Banner */}
          <section className="my-16 rounded-3xl border border-cyan-500/30 bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 p-8 sm:p-12 text-center space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Ready to Create Your Dynamic QR Code?
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm max-w-lg mx-auto">
              Join QRAZEN and experience next-generation dynamic QR infrastructure.
            </p>
            <div className="pt-2">
              <Link
                href="/signup"
                className="rounded-xl bg-cyan-500 px-8 py-3.5 text-xs font-bold text-slate-950 hover:bg-cyan-400 shadow-xl shadow-cyan-500/25 transition-all inline-flex items-center gap-2"
              >
                Get Started Free <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
