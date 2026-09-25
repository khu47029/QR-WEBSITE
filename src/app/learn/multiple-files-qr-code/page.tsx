import type { Metadata } from "next";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo/metadata";
import { buildArticleSchema, buildFaqSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { PublicHeader } from "@/components/layout/public-header";
import { PublicFooter } from "@/components/layout/public-footer";
import {
  Layers,
  Zap,
  ArrowRight,
  CheckCircle2,
  FileText,
  Image as ImageIcon,
  FolderArchive,
  Lock,
} from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "How to Share Multiple Files with One QR Code — QRAZEN Learn",
  description:
    "Learn how multi-file dynamic QR codes work: combine PDFs, photo galleries, ZIP files, and notes behind a single mobile gateway without app downloads.",
  path: "/learn/multiple-files-qr-code",
  keywords: [
    "qr code for multiple files",
    "multiple files in one qr code",
    "qr code for pdf and images",
    "share multiple documents with qr code",
    "qr code file sharing",
    "digital bundle qr code",
  ],
});

const FAQS = [
  {
    q: "Can a single QR code hold multiple files?",
    a: "A traditional static QR code cannot physically hold multiple file binaries due to barcode data capacity limits (maximum ~3 KB). However, a dynamic multi-file QR code points to a consolidated cloud gateway containing multiple PDFs, photos, ZIP archives, and notes, displaying them in a unified mobile portal.",
  },
  {
    q: "Do recipients need to install an app to open a multi-file QR code?",
    a: "No. In modern platforms like QRAZEN, viewers scan with their native smartphone camera and immediately open a responsive, sandboxed web portal with built-in document viewing and photo lightboxes.",
  },
  {
    q: "Can I add or remove individual files from a bundle after printing the QR code?",
    a: "Yes. With QRAZEN's dynamic content engine, you can add new PDFs, swap outdated images, or delete files from the bundle at any time from your workstation without changing the physical QR code.",
  },
  {
    q: "Can I password-protect a multi-file QR bundle?",
    a: "Yes. You can lock any multi-asset portal behind an Argon2id cryptographic password gate so only authorized viewers with the access key can view or download the attached files.",
  },
];

export default function MultipleFilesQrArticle() {
  const articleSchema = buildArticleSchema({
    headline: "How to Share Multiple Files with One QR Code",
    description:
      "A complete guide to distributing multi-asset bundles, PDFs, galleries, and archives through a single dynamic QR gateway.",
    path: "/learn/multiple-files-qr-code",
  });

  const faqSchema = buildFaqSchema(FAQS);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500/20 selection:text-cyan-200 flex flex-col justify-between">
      <JsonLd schema={[articleSchema, faqSchema]} />
      <PublicHeader currentPath="/learn" />

      <main className="flex-1 px-6 py-12">
        <div className="mx-auto max-w-4xl">
          <Breadcrumbs
            items={[
              { name: "Learn", href: "/learn" },
              { name: "Multi-File QR Sharing", href: "/learn/multiple-files-qr-code" },
            ]}
          />

          {/* Article Header */}
          <header className="py-8 space-y-4 border-b border-slate-800/80">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/90 px-3.5 py-1 text-[11px] font-mono font-medium text-slate-300 ring-1 ring-white/[0.04]">
              <Layers className="h-3.5 w-3.5 text-cyan-400" />
              <span className="text-cyan-300">DIGITAL ASSET BUNDLING & MULTI-MEDIA GATEWAYS</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              How to Share Multiple Files with One QR Code
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Consolidate PDFs, image galleries, presentation decks, and ZIP archives behind a single scannable QR code with instant zero-install mobile previewing.
            </p>
          </header>

          {/* Direct Answer Panel (AEO) */}
          <section className="my-10 rounded-2xl border border-slate-800/90 bg-slate-900/80 p-6 sm:p-8 ring-1 ring-white/[0.04]">
            <div className="flex items-center gap-2 text-[11px] font-mono text-cyan-400 uppercase tracking-widest font-semibold mb-2">
              <Zap className="h-3.5 w-3.5" />
              <span>DIRECT ANSWER SUMMARY</span>
            </div>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              To share multiple files through a single QR code, you use a <strong>dynamic multi-file QR code</strong>. Instead of attempting to store large file binaries inside the physical barcode itself, the QR code encodes a secure resolver token that routes scanners to a responsive web portal displaying all attached <Link href="/pdf-qr" className="text-cyan-400 hover:underline">PDF documents</Link>, <Link href="/image-qr" className="text-cyan-400 hover:underline">high-resolution images</Link>, and ZIP archives with individual file previews.
            </p>
          </section>

          {/* Article Content */}
          <article className="space-y-12 text-slate-300 text-sm sm:text-base leading-relaxed">
            {/* Section 1: The Multi-File Challenge */}
            <section id="why-multi-file-qr" className="space-y-4">
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Why Static QR Codes Cannot Hold Multiple Files
              </h2>
              <p>
                The standard QR barcode specification (ISO/IEC 18004) has a maximum theoretical capacity of roughly 3,000 bytes (3 KB) of data. A single PDF brochure or high-resolution photograph is typically several megabytes — thousands of times larger than the physical matrix limit.
              </p>
              <p>
                Traditional approaches forced creators to print multiple separate QR codes for each document. A <Link href="/multi-file-qr" className="text-cyan-400 hover:underline font-medium">dynamic multi-file bundle</Link> solves this by decoupling the physical scan token from cloud-hosted asset storage.
              </p>
            </section>

            {/* Section 2: How Multi-File QR Works */}
            <section id="how-multi-file-works" className="space-y-4">
              <h2 className="text-2xl font-bold text-white tracking-tight">
                How Multiple-File QR Sharing Works: The 5-Step Workflow
              </h2>
              <div className="space-y-3 font-mono text-xs sm:text-sm">
                <div className="flex items-start gap-3 rounded-xl border border-slate-800/80 bg-slate-900/40 p-4">
                  <span className="text-cyan-400 font-bold">01.</span>
                  <div>
                    <strong className="text-white block font-sans">Upload Asset Bundle:</strong>
                    <span className="text-slate-400 font-sans">Upload PDFs, image sets, ZIP archives, or text notes to your workstation.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-xl border border-slate-800/80 bg-slate-900/40 p-4">
                  <span className="text-cyan-400 font-bold">02.</span>
                  <div>
                    <strong className="text-white block font-sans">Configure Governance:</strong>
                    <span className="text-slate-400 font-sans">Optionally set an <Link href="/security" className="text-cyan-400 hover:underline">Argon2id password gate</Link>, view-only mode, or expiration timer.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-xl border border-slate-800/80 bg-slate-900/40 p-4">
                  <span className="text-cyan-400 font-bold">03.</span>
                  <div>
                    <strong className="text-white block font-sans">Generate Dynamic Token:</strong>
                    <span className="text-slate-400 font-sans">Download clean vector (SVG/PNG) QR codes ready for print.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-xl border border-slate-800/80 bg-slate-900/40 p-4">
                  <span className="text-cyan-400 font-bold">04.</span>
                  <div>
                    <strong className="text-white block font-sans">Camera Scans & Resolves:</strong>
                    <span className="text-slate-400 font-sans">Mobile viewers scan with native camera and open the unified portal in under 50ms.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-xl border border-slate-800/80 bg-slate-900/40 p-4">
                  <span className="text-cyan-400 font-bold">05.</span>
                  <div>
                    <strong className="text-white block font-sans">Mutate Anytime:</strong>
                    <span className="text-slate-400 font-sans">Add, remove, or swap files anytime without reprinting the physical code.</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3: Supported File Formats */}
            <section id="supported-formats" className="space-y-4">
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Supported File Formats in QRAZEN Multi-File Bundles
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-5 space-y-2">
                  <FileText className="h-6 w-6 text-cyan-400" />
                  <h3 className="text-white font-bold text-sm">PDF Documents</h3>
                  <p className="text-xs text-slate-400">
                    Brochures, whitepapers, contracts, schematics, and menus with sandboxed inline reading.
                  </p>
                </div>
                <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-5 space-y-2">
                  <ImageIcon className="h-6 w-6 text-cyan-400" />
                  <h3 className="text-white font-bold text-sm">High-Res Images</h3>
                  <p className="text-xs text-slate-400">
                    PNG, JPEG, WebP, and GIF photo galleries with full-screen lightbox previewing.
                  </p>
                </div>
                <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-5 space-y-2">
                  <FolderArchive className="h-6 w-6 text-cyan-400" />
                  <h3 className="text-white font-bold text-sm">ZIP Archives</h3>
                  <p className="text-xs text-slate-400">
                    Compressed archives with central directory parsing and individual file manifest inspection.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4: Use Cases */}
            <section id="use-cases" className="space-y-4">
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Real-World Multi-Asset Use Cases
              </h2>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Event & Conference Kits:</strong> Combine the daily agenda PDF, speaker slide decks, and venue maps under one badge QR code.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Real Estate Property Packets:</strong> Bundle floor plan PDFs, high-res photo galleries, and inspection reports into a single table tent.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Corporate Press & Media Kits:</strong> Distribute executive bios, brand logos (SVG/PNG), and press release PDFs under a single scannable code.</span>
                </li>
              </ul>
            </section>

            {/* Section 5: Comparison Single vs Multiple */}
            <section id="comparison" className="space-y-4">
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Multiple QR Codes vs. Single Multi-File Gateway
              </h2>
              <div className="overflow-x-auto rounded-2xl border border-slate-800/90 ring-1 ring-white/[0.04]">
                <table className="w-full border-collapse text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-slate-800/90 bg-slate-900/90 font-mono text-slate-300">
                      <th className="p-4 font-semibold">Aspect</th>
                      <th className="p-4 text-rose-400 font-semibold">Printing Multiple Separate Codes</th>
                      <th className="p-4 text-cyan-300 font-semibold">QRAZEN Multi-File Bundle</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/70 font-mono text-xs">
                    <tr className="bg-slate-950/60">
                      <td className="p-4 font-bold text-slate-200">Print Space</td>
                      <td className="p-4 text-slate-400">Cluttered layout with 3–5 QR codes</td>
                      <td className="p-4 text-cyan-300">Clean, elegant single QR code</td>
                    </tr>
                    <tr className="bg-slate-900/30">
                      <td className="p-4 font-bold text-slate-200">User Friction</td>
                      <td className="p-4 text-slate-400">Viewer must scan repeatedly</td>
                      <td className="p-4 text-cyan-300">Single scan unlocks full file portal</td>
                    </tr>
                    <tr className="bg-slate-950/60">
                      <td className="p-4 font-bold text-slate-200">Maintenance</td>
                      <td className="p-4 text-slate-400">Updating 1 document requires reprinting that code</td>
                      <td className="p-4 text-cyan-300">Update any individual file online instantly</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 6: FAQ */}
            <section id="faqs" className="space-y-5 pt-4">
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Frequently Asked Questions
              </h2>
              <div className="space-y-3.5">
                {FAQS.map((faq, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-slate-800/80 bg-slate-900/50 p-5 sm:p-6 space-y-2"
                  >
                    <h3 className="text-white font-bold text-sm sm:text-base">{faq.q}</h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA Section */}
            <section className="my-10 rounded-2xl border border-slate-800/90 bg-slate-900/80 p-7 sm:p-10 text-center space-y-4 ring-1 ring-white/[0.04]">
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Create Your Multi-File QR Bundle
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm max-w-lg mx-auto">
                Consolidate PDFs, images, and archives behind a dynamic, password-protected gateway.
              </p>
              <div className="pt-2">
                <Link
                  href="/signup"
                  className="rounded-xl bg-cyan-500 px-7 py-3 text-xs font-bold text-slate-950 hover:bg-cyan-400 shadow-md shadow-cyan-500/20 transition-all inline-flex items-center gap-2"
                >
                  Create Multi-File QR <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </section>
          </article>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
