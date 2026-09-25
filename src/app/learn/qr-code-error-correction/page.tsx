import type { Metadata } from "next";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo/metadata";
import { buildArticleSchema, buildFaqSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { PublicHeader } from "@/components/layout/public-header";
import { PublicFooter } from "@/components/layout/public-footer";
import {
  ShieldAlert,
  Zap,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Layers,
} from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "QR Code Error Correction Explained: Levels L, M, Q, and H — QRAZEN Learn",
  description:
    "Understand Reed-Solomon QR error correction: technical recovery percentages for Level L (7%), Level M (15%), Level Q (25%), and Level H (30%), with data density trade-offs.",
  path: "/learn/qr-code-error-correction",
  keywords: [
    "qr code error correction",
    "qr code error correction level",
    "L M Q H qr code",
    "what is QR error correction",
    "qr code damaged still scan",
    "reed solomon qr code",
  ],
});

const FAQS = [
  {
    q: "What is QR code error correction?",
    a: "QR code error correction is a mathematical capability based on the Reed-Solomon algebraic error correction algorithm. It embeds redundant data codewords into the QR matrix, allowing optical barcode scanners and smartphones to reconstruct missing or corrupted data if the QR code is scratched, smudged, torn, or partially covered by a logo.",
  },
  {
    q: "What are the four QR code error correction levels?",
    a: "The standard ISO/IEC 18004 specification defines four error correction levels: Level L (Low) recovers up to ~7% of damaged data, Level M (Medium) recovers ~15%, Level Q (Quartile) recovers ~25%, and Level H (High) recovers ~30% of lost or obscured data codewords.",
  },
  {
    q: "Why shouldn't I always use the highest error correction level (Level H)?",
    a: "Higher error correction requires adding more redundant backup modules into the grid. This increases the total QR version (e.g. going from 21×21 to 33×33 modules), making each individual square smaller and harder to scan from a distance or on low-resolution cameras unless the printed size is significantly increased.",
  },
  {
    q: "Which error correction level is best for general marketing and dynamic QR codes?",
    a: "Level M (15% recovery) is the industry standard default. It provides an optimal balance between robust damage tolerance and low visual grid density, making it fast and effortless to scan across all smartphones.",
  },
];

export default function QrErrorCorrectionArticle() {
  const articleSchema = buildArticleSchema({
    headline: "QR Code Error Correction Explained: Levels L, M, Q, and H",
    description:
      "A technical explanation of Reed-Solomon error correction in QR codes, recovery rates, and grid density trade-offs.",
    path: "/learn/qr-code-error-correction",
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
              { name: "QR Error Correction", href: "/learn/qr-code-error-correction" },
            ]}
          />

          {/* Article Header */}
          <header className="py-8 space-y-4 border-b border-slate-800/80">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/90 px-3.5 py-1 text-[11px] font-mono font-medium text-slate-300 ring-1 ring-white/[0.04]">
              <ShieldAlert className="h-3.5 w-3.5 text-cyan-400" />
              <span className="text-cyan-300">ALGORITHMIC REDUNDANCY & REED-SOLOMON CODEC</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              QR Code Error Correction Explained: Levels L, M, Q, and H
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              How mathematical redundancy enables damaged, weathered, or logo-customized QR codes to scan flawlessly, and how to select the right level for your use case.
            </p>
          </header>

          {/* Direct Answer Panel (AEO) */}
          <section className="my-10 rounded-2xl border border-slate-800/90 bg-slate-900/80 p-6 sm:p-8 ring-1 ring-white/[0.04]">
            <div className="flex items-center gap-2 text-[11px] font-mono text-cyan-400 uppercase tracking-widest font-semibold mb-2">
              <Zap className="h-3.5 w-3.5" />
              <span>DIRECT ANSWER SUMMARY</span>
            </div>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              <strong>QR code error correction</strong> is a mathematical mechanism that allows a barcode scanner to completely recover data even if part of the QR code is unreadable, dirty, or torn. Standardized under <strong>ISO/IEC 18004</strong>, QR codes use <strong>Reed-Solomon error correction</strong> divided into four levels: <strong>Level L (~7%)</strong>, <strong>Level M (~15%)</strong>, <strong>Level Q (~25%)</strong>, and <strong>Level H (~30%)</strong> data recovery capacity.
            </p>
          </section>

          {/* Article Content */}
          <article className="space-y-12 text-slate-300 text-sm sm:text-base leading-relaxed">
            {/* Section 1: How it works */}
            <section id="how-error-correction-works" className="space-y-4">
              <h2 className="text-2xl font-bold text-white tracking-tight">
                How Reed-Solomon Error Correction Works in 2D Barcodes
              </h2>
              <p>
                When a QR matrix is generated, the generator encodes the primary payload into 8-bit data codewords. It then runs those bytes through a <strong>Reed-Solomon polynomial generator</strong> to produce supplementary error correction codewords.
              </p>
              <p>
                These backup codewords are interleaved throughout the matrix. When a camera reads the code, the decoder uses linear algebra to detect errors and solve for missing data modules — allowing instant reading even if a physical sticker is torn or smudged.
              </p>
            </section>

            {/* Section 2: Four Error Correction Levels Table */}
            <section id="error-correction-table" className="space-y-4">
              <h2 className="text-2xl font-bold text-white tracking-tight">
                The Four Standard Error Correction Levels
              </h2>
              <p className="text-slate-400 text-sm">
                Standard ISO/IEC recovery capacities and operational trade-offs:
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-800/90 ring-1 ring-white/[0.04]">
                <table className="w-full border-collapse text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-slate-800/90 bg-slate-900/90 font-mono text-slate-300">
                      <th className="p-4 font-semibold">Level</th>
                      <th className="p-4 text-cyan-300 font-semibold">Data Recovery Capacity</th>
                      <th className="p-4 font-semibold">Matrix Density Impact</th>
                      <th className="p-4 font-semibold">Typical Application</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/70 font-mono text-xs">
                    <tr className="bg-slate-950/60">
                      <td className="p-4 font-bold text-slate-200">Level L (Low)</td>
                      <td className="p-4 text-cyan-300">~7% of codewords</td>
                      <td className="p-4 text-emerald-400">Lowest (Fastest / Cleanest)</td>
                      <td className="p-4 text-slate-400">Indoor, clean screens, high-volume data</td>
                    </tr>
                    <tr className="bg-slate-900/30">
                      <td className="p-4 font-bold text-slate-200">Level M (Medium)</td>
                      <td className="p-4 text-cyan-300">~15% of codewords</td>
                      <td className="p-4 text-emerald-300">Standard / Balanced (Recommended)</td>
                      <td className="p-4 text-slate-400">Default for marketing, packaging, menus</td>
                    </tr>
                    <tr className="bg-slate-950/60">
                      <td className="p-4 font-bold text-slate-200">Level Q (Quartile)</td>
                      <td className="p-4 text-cyan-300">~25% of codewords</td>
                      <td className="p-4 text-amber-400">Higher (Moderate density)</td>
                      <td className="p-4 text-slate-400">Industrial, factory floors, moderate wear</td>
                    </tr>
                    <tr className="bg-slate-900/30">
                      <td className="p-4 font-bold text-slate-200">Level H (High)</td>
                      <td className="p-4 text-cyan-300">~30% of codewords</td>
                      <td className="p-4 text-rose-400">Highest (Dense grid)</td>
                      <td className="p-4 text-slate-400">Center-logo overlays, harsh outdoor weather</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 3: Trade-off - Density vs Redundancy */}
            <section id="density-tradeoff" className="space-y-4">
              <h2 className="text-2xl font-bold text-white tracking-tight">
                The Density Trade-Off: Why Level H Isn&apos;t Always Better
              </h2>
              <p>
                A common misconception is that choosing <strong>Level H (30%)</strong> is always superior. However, error correction obeys a strict engineering trade-off:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-5 space-y-2">
                  <h3 className="text-white font-bold text-sm">More Redundancy = Denser Grid</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Adding 30% redundant data forces the generator to step up to higher QR versions (e.g. from Version 2 [25×25] to Version 4 [33×33]). Each module becomes physically smaller in the same print area, demanding higher camera resolution.
                  </p>
                </div>
                <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-5 space-y-2">
                  <h3 className="text-white font-bold text-sm">Dynamic Tokens Solve Density</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    By using <Link href="/dynamic-qr" className="text-cyan-400 hover:underline">dynamic QR codes</Link>, the base payload string is minimal. Even with robust Level M or Q error correction, the matrix remains clean, crisp, and exceptionally easy to scan.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4: Logos and Visual Customization */}
            <section id="custom-logos" className="space-y-4">
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Error Correction for QR Codes with Embedded Logos
              </h2>
              <p>
                When a brand places an icon or logo in the center of a QR code, the barcode decoder views that graphic as <strong>damaged/corrupted data modules</strong>.
              </p>
              <p>
                To maintain scan reliability with center graphics:
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-400 list-disc pl-5">
                <li>Generate the code using <strong>Level Q (25%)</strong> or <strong>Level H (30%)</strong> error correction.</li>
                <li>Ensure the logo covers no more than <strong>15–20%</strong> of the total matrix area.</li>
                <li>Never obscure the three corner <strong>Position Detection Patterns</strong> (the large locator squares).</li>
              </ul>
            </section>

            {/* Section 5: Testing Guide */}
            <section id="testing-checklist" className="rounded-2xl border border-cyan-500/30 bg-slate-900/60 p-6 sm:p-8 space-y-4 ring-1 ring-cyan-500/20">
              <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-cyan-400" />
                Error Correction Verification Checklist
              </h2>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">✓</span>
                  <span><strong>Default to Level M (15%):</strong> Optimal for 90% of business cards, flyers, and dynamic portals.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">✓</span>
                  <span><strong>Select Level Q or H for Logos:</strong> Guarantees adequate mathematical headroom when center graphics are applied.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">✓</span>
                  <span><strong>Stress-Test on Budget Hardware:</strong> Verify decoding on older smartphones with entry-level camera sensors.</span>
                </li>
              </ul>
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
          </article>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
