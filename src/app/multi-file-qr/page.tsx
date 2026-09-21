import type { Metadata } from "next";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo/metadata";
import { buildFaqSchema, buildWebPageSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { PublicHeader } from "@/components/layout/public-header";
import { PublicFooter } from "@/components/layout/public-footer";
import {
  FolderArchive,
  Layers,
  FileCode,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Package,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Multi-File QR Codes — Share Asset Bundles & ZIP Files via QR",
  description:
    "Combine PDFs, images, notes, and ZIP archives into a single dynamic QR bundle. Viewers explore unified asset hubs without installing external software.",
  path: "/multi-file-qr",
  keywords: [
    "multi file QR code",
    "QR code for multiple files",
    "ZIP QR code",
    "digital bundle QR",
    "share multiple documents with QR",
    "QR file gateway",
  ],
});

const FAQS = [
  {
    q: "Can a QR code share multiple files at once?",
    a: "Yes. QRAZEN's Multi-File Bundle engine allows you to attach multiple PDFs, images, ZIP files, and text notes to a single dynamic QR code. Scanners receive a consolidated mobile portal displaying all files with instant previews.",
  },
  {
    q: "How does QRAZEN handle ZIP archives?",
    a: "When you upload a ZIP archive, QRAZEN parses the central directory to generate an inline file manifest. Viewers can inspect the archive hierarchy in their mobile browser before choosing to download or preview individual files.",
  },
  {
    q: "Can I add or remove individual files from a bundle later?",
    a: "Yes. Using dynamic content replacement, you can modify any file in your bundle, add new attachments, or delete superseded assets without reprinting the physical QR code.",
  },
  {
    q: "Is there a limit on bundle file size?",
    a: "Free accounts include 100MB of total asset storage with support for 2 active dynamic codes. Pro accounts include 50GB of storage with unlimited dynamic codes.",
  },
];

export default function MultiFileQrPage() {
  const pageSchema = buildWebPageSchema({
    title: "Multi-File QR Codes — Share Asset Bundles & ZIP Files via QR",
    description:
      "Overview of QRAZEN multi-asset bundling and ZIP manifest inspection capabilities.",
    path: "/multi-file-qr",
  });

  const faqSchema = buildFaqSchema(FAQS);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500/20 selection:text-cyan-200 flex flex-col justify-between">
      <JsonLd schema={[pageSchema, faqSchema]} />
      <PublicHeader currentPath="/multi-file-qr" />

      <main className="flex-1 px-6 py-12">
        <div className="mx-auto max-w-5xl">
          <Breadcrumbs items={[{ name: "Multi-File Bundles", href: "/multi-file-qr" }]} />

          {/* Hero Header */}
          <header className="py-8 text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-mono font-medium text-cyan-300">
              <FolderArchive className="h-3.5 w-3.5" />
              <span>DIGITAL ASSET BUNDLING</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Multi-File QR Codes: <br />
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">
                Consolidated Digital Asset Portals
              </span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Distribute press kits, onboarding packets, real estate document sets, and creative asset bundles under a single scannable QR gateway.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/signup"
                className="rounded-xl bg-cyan-500 px-6 py-3 text-xs font-bold text-slate-950 hover:bg-cyan-400 shadow-lg shadow-cyan-500/20 transition-all active:scale-[0.98] inline-flex items-center gap-2"
              >
                Create Multi-File Bundle <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/dynamic-qr"
                className="rounded-xl border border-slate-800 bg-slate-900/80 px-5 py-3 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors"
              >
                How Dynamic Gateways Work
              </Link>
            </div>
          </header>

          {/* Core Feature Grid */}
          <section className="my-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Package className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-bold text-white">Unified Asset Portal</h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Combine PDFs, photos, vectors, and notes into an organized, mobile-first gallery with individual item previews.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <FileCode className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-bold text-white">ZIP Manifest Inspection</h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Smart central directory parsing displays archive file lists and metadata directly in the viewer shell.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-bold text-white">Magic Byte Verification</h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Every binary is validated against strict magic byte signatures to prevent malicious mime spoofing.
              </p>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="my-16 space-y-6">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Frequently Asked Questions About Multi-File QR Codes
            </h2>
            <div className="space-y-4">
              {FAQS.map((faq, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-2"
                >
                  <h3 className="text-white font-bold text-sm sm:text-base">{faq.q}</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Banner */}
          <section className="my-16 rounded-3xl border border-cyan-500/30 bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 p-8 sm:p-12 text-center space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Bundle Digital Assets Behind One Code
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm max-w-lg mx-auto">
              Deliver complete document bundles and media kits with QRAZEN.
            </p>
            <div className="pt-2">
              <Link
                href="/signup"
                className="rounded-xl bg-cyan-500 px-8 py-3.5 text-xs font-bold text-slate-950 hover:bg-cyan-400 shadow-xl shadow-cyan-500/25 transition-all inline-flex items-center gap-2"
              >
                Create Digital Bundle <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
