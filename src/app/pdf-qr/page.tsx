import type { Metadata } from "next";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo/metadata";
import { buildFaqSchema, buildWebPageSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { PublicHeader } from "@/components/layout/public-header";
import { PublicFooter } from "@/components/layout/public-footer";
import {
  FileText,
  Lock,
  Eye,
  RefreshCw,
  ArrowRight,
  CheckCircle2,
  Zap,
  Shield,
  Smartphone,
  UploadCloud,
} from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "PDF QR Codes — Share, Host & Update Documents via QR Code",
  description:
    "Convert PDF files into dynamic scannable QR codes with instant mobile browser rendering, password gating, view-only modes, and zero-reprint document updates.",
  path: "/pdf-qr",
  keywords: [
    "share PDF with QR code",
    "PDF QR code generator",
    "dynamic PDF QR",
    "password protected PDF QR",
    "how to make a QR code for a PDF",
    "QR code document sharing",
  ],
});

const FAQS = [
  {
    q: "How do I share a PDF using a dynamic QR code?",
    a: "In your QRAZEN workstation, select PDF as your content type, upload your document, configure optional password protection or expiry timers, and generate your dynamic QR code. When scanned, viewers are taken straight to a responsive, sandboxed PDF reader in their mobile browser.",
  },
  {
    q: "Can I update the PDF without changing the printed QR code?",
    a: "Yes. When you publish a new revision of your PDF (e.g., updating a restaurant menu, catalog, or event schedule), you simply upload the new document. QRAZEN points the existing dynamic token to the new version instantly without requiring any reprinting.",
  },
  {
    q: "Do viewers need to install an app or Adobe Acrobat to read the PDF?",
    a: "No. QRAZEN includes an integrated, zero-install web PDF viewer optimized for mobile screens with instant page zooming and paging.",
  },
  {
    q: "Can I restrict viewers from downloading the raw PDF file?",
    a: "Yes. You can enable 'View-Only Sandbox Mode' on any dynamic PDF gateway. This hides direct binary download actions, rendering the document in a sandboxed inline viewer.",
  },
];

export default function PdfQrPage() {
  const pageSchema = buildWebPageSchema({
    title: "PDF QR Codes — Share, Host & Update Documents via QR Code",
    description:
      "Comprehensive guide and platform capability for sharing PDF documents via dynamic QR gateways.",
    path: "/pdf-qr",
  });

  const faqSchema = buildFaqSchema(FAQS);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500/20 selection:text-cyan-200 flex flex-col justify-between">
      <JsonLd schema={[pageSchema, faqSchema]} />
      <PublicHeader currentPath="/pdf-qr" />

      <main className="flex-1 px-6 py-12">
        <div className="mx-auto max-w-5xl">
          <Breadcrumbs items={[{ name: "PDF QR Sharing", href: "/pdf-qr" }]} />

          {/* Hero Header */}
          <header className="py-8 text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/90 px-3.5 py-1 text-[11px] font-mono font-medium text-slate-300 ring-1 ring-white/[0.04]">
              <FileText className="h-3.5 w-3.5 text-cyan-400" />
              <span className="text-cyan-300">DYNAMIC DOCUMENT DISTRIBUTION</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              PDF QR Codes: <br />
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 bg-clip-text text-transparent">
                Instant Mobile Document Access
              </span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Transform menus, technical schematics, contracts, product manuals, and brochures into dynamic scannable QR gateways. Update revisions anytime without reprinting.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/signup"
                className="rounded-xl bg-cyan-500 px-6 py-2.5 text-xs font-bold text-slate-950 hover:bg-cyan-400 shadow-md shadow-cyan-500/20 transition-all active:scale-[0.98] inline-flex items-center gap-2"
              >
                Upload PDF & Generate QR <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/security"
                className="rounded-xl border border-slate-800 bg-slate-900/90 px-5 py-2.5 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
              >
                View Password & Privacy Controls
              </Link>
            </div>
          </header>

          {/* Key Capabilities Grid */}
          <section id="features" className="my-14 grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 space-y-3 ring-1 ring-white/[0.02]">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-cyan-400 border border-slate-700/80">
                <RefreshCw className="h-5 w-5" />
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white">Live PDF Revision Swapping</h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Publish new price lists or corrections in seconds. Powered by QRAZEN&apos;s{" "}
                <Link href="/dynamic-qr" className="text-cyan-400 hover:underline">dynamic QR architecture</Link>, the printed QR matrix remains 100% unchanged on physical media.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 space-y-3 ring-1 ring-white/[0.02]">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-cyan-400 border border-slate-700/80">
                <Smartphone className="h-5 w-5" />
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white">Zero-App Mobile Rendering</h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Viewers scan with their default iOS or Android camera and read documents immediately inside a clean web viewer without downloading external PDF software.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 space-y-3 ring-1 ring-white/[0.02]">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-cyan-400 border border-slate-700/80">
                <Lock className="h-5 w-5" />
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white">Argon2id Password Protection</h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Gate sensitive financial reports, legal memos, or confidential board materials behind cryptographic unlock keys. Explore full{" "}
                <Link href="/security" className="text-cyan-400 hover:underline">security and privacy controls</Link>.
              </p>
            </div>
          </section>

          {/* How-To Step Pipeline */}
          <section id="how-it-works" className="my-14 rounded-2xl border border-slate-800/90 bg-slate-900/70 p-6 sm:p-9 space-y-6 ring-1 ring-white/[0.04]">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              How to Create a Dynamic PDF QR Code in 3 Steps
            </h2>
            <div className="space-y-4">
              <div className="flex gap-4 items-start rounded-xl border border-slate-800/80 bg-slate-950/60 p-4 sm:p-5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500 text-slate-950 font-mono font-bold text-xs flex-shrink-0">
                  01
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Upload Your Document</h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
                    Upload your PDF directly to your secure workstation. Magic bytes are verified automatically on upload. Need to bundle several documents? Read our guide on{" "}
                    <Link href="/learn/multiple-files-qr-code" className="text-cyan-400 hover:underline">linking multiple files to one QR code</Link>{" "}
                    or create a{" "}
                    <Link href="/multi-file-qr" className="text-cyan-400 hover:underline">multi-file bundle</Link>.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start rounded-xl border border-slate-800/80 bg-slate-950/60 p-4 sm:p-5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500 text-slate-950 font-mono font-bold text-xs flex-shrink-0">
                  02
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Configure Access Controls</h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
                    Optionally set a viewer password, enable view-only mode, or configure an automated expiration date with instant server-side revocation.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start rounded-xl border border-slate-800/80 bg-slate-950/60 p-4 sm:p-5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500 text-slate-950 font-mono font-bold text-xs flex-shrink-0">
                  03
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Export & Print Vector Matrix</h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
                    Download crisp PNG/SVG vectors ready for print on signage, packaging, table stands, or product labels. Review our{" "}
                    <Link href="/learn/qr-code-print-size-guide" className="text-cyan-400 hover:underline">QR code minimum print size guide</Link>{" "}
                    and{" "}
                    <Link href="/learn/qr-code-error-correction" className="text-cyan-400 hover:underline">error correction standards</Link>{" "}
                    for optimal physical scanning reliability.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section id="faq" className="my-14 space-y-5">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Frequently Asked Questions About PDF QR Codes
            </h2>
            <div className="space-y-3.5">
              {FAQS.map((faq, index) => (
                <div
                  key={index}
                  className="rounded-xl sm:rounded-2xl border border-slate-800/80 bg-slate-900/50 p-5 sm:p-6 space-y-2"
                >
                  <h3 className="text-white font-bold text-sm sm:text-base">{faq.q}</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
