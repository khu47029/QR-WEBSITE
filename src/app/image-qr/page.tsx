import type { Metadata } from "next";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo/metadata";
import { buildFaqSchema, buildWebPageSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { PublicHeader } from "@/components/layout/public-header";
import { PublicFooter } from "@/components/layout/public-footer";
import {
  Image as ImageIcon,
  Layers,
  Lock,
  ArrowRight,
  Sparkles,
  Camera,
  Smartphone,
  Eye,
} from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Image QR Codes — Share Photo Galleries & Portfolios via Dynamic QR",
  description:
    "Distribute high-resolution photo galleries, artwork, and visual media with a single dynamic QR code. Enjoy zero-app mobile viewing and password security.",
  path: "/image-qr",
  keywords: [
    "image QR code",
    "photo gallery QR code",
    "share images with QR code",
    "dynamic image QR",
    "QR code for pictures",
    "portfolio QR code",
  ],
});

const FAQS = [
  {
    q: "Can I share multiple images through a single QR code?",
    a: "Yes. QRAZEN enables you to upload multiple high-resolution photos (JPEG, PNG, WebP, GIF) behind a single dynamic QR code. Scanners open a unified, responsive image gallery with full-screen previewing.",
  },
  {
    q: "What image formats are supported?",
    a: "QRAZEN natively supports JPEG, JPG, PNG, WebP, and GIF images. Files are verified with magic byte inspection upon upload to prevent malicious file spoofing.",
  },
  {
    q: "Can I replace the images without reprinting the QR code?",
    a: "Yes. Using dynamic content pointer rotation, you can add, remove, or swap photos in your gallery at any time from your workstation without changing the physical QR code.",
  },
  {
    q: "Can I password-protect photo galleries?",
    a: "Yes. You can lock any dynamic image gateway behind an Argon2id cryptographic password gate so only authorized viewers can view your visual assets.",
  },
];

export default function ImageQrPage() {
  const pageSchema = buildWebPageSchema({
    title: "Image QR Codes — Share Photo Galleries & Portfolios via Dynamic QR",
    description:
      "Capability overview for creating dynamic image and photo gallery QR gateways.",
    path: "/image-qr",
  });

  const faqSchema = buildFaqSchema(FAQS);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500/20 selection:text-cyan-200 flex flex-col justify-between">
      <JsonLd schema={[pageSchema, faqSchema]} />
      <PublicHeader currentPath="/image-qr" />

      <main className="flex-1 px-6 py-12">
        <div className="mx-auto max-w-5xl">
          <Breadcrumbs items={[{ name: "Image QR Galleries", href: "/image-qr" }]} />

          {/* Hero Header */}
          <header className="py-8 text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/90 px-3.5 py-1 text-[11px] font-mono font-medium text-slate-300 ring-1 ring-white/[0.04]">
              <ImageIcon className="h-3.5 w-3.5 text-cyan-400" />
              <span className="text-cyan-300">VISUAL ASSET GATEWAY</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Image QR Codes: <br />
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 bg-clip-text text-transparent">
                Photo Galleries Behind One Scannable Code
              </span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Showcase portfolios, event photos, real estate listings, and product photography. Instant responsive gallery rendering on any smartphone.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/signup"
                className="rounded-xl bg-cyan-500 px-6 py-2.5 text-xs font-bold text-slate-950 hover:bg-cyan-400 shadow-md shadow-cyan-500/20 transition-all active:scale-[0.98] inline-flex items-center gap-2"
              >
                Create Image QR <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/multi-file-qr"
                className="rounded-xl border border-slate-800 bg-slate-900/90 px-5 py-2.5 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
              >
                Explore Multi-Asset Bundles
              </Link>
            </div>
          </header>

          {/* Feature Pillars */}
          <section id="features" className="my-14 grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 space-y-3 ring-1 ring-white/[0.02]">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-cyan-400 border border-slate-700/80">
                <Layers className="h-5 w-5" />
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white">Unified Multi-Image Feed</h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Group multiple photos into one cohesive mobile gallery with touch-friendly navigation. For mixed media (photos + PDFs), see{" "}
                <Link href="/multi-file-qr" className="text-cyan-400 hover:underline">multi-file bundles</Link>.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 space-y-3 ring-1 ring-white/[0.02]">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-cyan-400 border border-slate-700/80">
                <Camera className="h-5 w-5" />
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white">High-Res Preservation</h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Maintains crisp visual fidelity without aggressive lossy compression. Update images anytime via{" "}
                <Link href="/dynamic-qr" className="text-cyan-400 hover:underline">dynamic pointer rotation</Link>, and review our{" "}
                <Link href="/learn/qr-code-error-correction" className="text-cyan-400 hover:underline">error correction</Link> and{" "}
                <Link href="/learn/qr-code-print-size-guide" className="text-cyan-400 hover:underline">print sizing guides</Link> for optimal scanning.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 space-y-3 ring-1 ring-white/[0.02]">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-cyan-400 border border-slate-700/80">
                <Eye className="h-5 w-5" />
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white">View-Only Protection</h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Enable view-only mode and enforce{" "}
                <Link href="/security" className="text-cyan-400 hover:underline">Argon2id password gates</Link> to deter unauthorized redistribution of visual assets.
              </p>
            </div>
          </section>

          {/* FAQ Section */}
          <section id="faq" className="my-14 space-y-5">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Frequently Asked Questions About Image QR Codes
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

          {/* CTA Banner */}
          <section className="my-14 rounded-2xl border border-slate-800/90 bg-slate-900/80 p-7 sm:p-10 text-center space-y-3.5 ring-1 ring-white/[0.04]">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Mint Your Dynamic Image QR Code
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm max-w-lg mx-auto">
              Get started with free dynamic image gateways. Update and rotate visual content anytime.
            </p>
            <div className="pt-2">
              <Link
                href="/signup"
                className="rounded-xl bg-cyan-500 px-7 py-3 text-xs font-bold text-slate-950 hover:bg-cyan-400 shadow-md shadow-cyan-500/20 transition-all inline-flex items-center gap-2"
              >
                Create Free Image QR <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </section>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
