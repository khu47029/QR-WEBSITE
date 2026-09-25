import type { Metadata } from "next";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo/metadata";
import { buildArticleSchema, buildFaqSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { PublicHeader } from "@/components/layout/public-header";
import { PublicFooter } from "@/components/layout/public-footer";
import {
  Maximize2,
  Zap,
  ArrowRight,
  CheckSquare,
  AlertTriangle,
  Info,
  Ruler,
} from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "QR Code Print Size & Distance Standards Guide — QRAZEN Learn",
  description:
    "An engineering guide to QR code printing sizes, minimum dimensions for business cards and billboards, scanning distance ratios (10:1), and quiet zone requirements.",
  path: "/learn/qr-code-print-size-guide",
  keywords: [
    "qr code print size",
    "minimum qr code size",
    "how big should a qr code be",
    "qr code printing size",
    "qr code scan distance ratio",
    "qr code poster size",
    "qr quiet zone",
  ],
});

const FAQS = [
  {
    q: "What is the absolute minimum print size for a standard QR code?",
    a: "For standard close-up scanning (such as on business cards or product labels at 10–15 cm distance), the recommended minimum physical size is 2.0 × 2.0 cm (0.8 × 0.8 inches). For high-density QR codes with extensive characters, 2.5 × 2.5 cm is recommended to ensure older smartphone cameras can focus reliably.",
  },
  {
    q: "What is the QR code scanning distance-to-size ratio rule of thumb?",
    a: "A practical engineering guideline is the 10:1 Distance-to-Size ratio (D:S). The minimum width of the printed QR code should be approximately 1/10th of the intended scanning distance (e.g., if viewers scan from 1 meter away, the QR code width should be at least 10 cm).",
  },
  {
    q: "What is a QR code quiet zone and why is it necessary?",
    a: "The quiet zone is the clear, unprinted border surrounding the QR matrix. According to ISO/IEC 18004 standards, the quiet zone must be at least 4 modules wide on all four sides. Without this blank margin, camera image sensors cannot distinguish the QR position patterns from surrounding graphics or text.",
  },
  {
    q: "Why do dynamic QR codes print better at small sizes than static QR codes?",
    a: "Dynamic QR codes encode short, fixed-length server tokens rather than long full URLs. This keeps the total matrix grid small (e.g. 21×21 or 25×25 modules), meaning each individual pixel is physically larger and much easier for cameras to resolve when printed at compact dimensions.",
  },
];

export default function QrPrintSizeArticle() {
  const articleSchema = buildArticleSchema({
    headline: "QR Code Print Size & Distance Standards Guide",
    description:
      "A technical reference for calculating QR code print dimensions, distance ratios, and margin requirements.",
    path: "/learn/qr-code-print-size-guide",
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
              { name: "QR Print Size Guide", href: "/learn/qr-code-print-size-guide" },
            ]}
          />

          {/* Article Header */}
          <header className="py-8 space-y-4 border-b border-slate-800/80">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/90 px-3.5 py-1 text-[11px] font-mono font-medium text-slate-300 ring-1 ring-white/[0.04]">
              <Ruler className="h-3.5 w-3.5 text-cyan-400" />
              <span className="text-cyan-300">PRINT ENGINEERING & OPTICAL GEOMETRY</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              QR Code Print Size & Distance Standards Guide
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              How to size, space, and print QR codes across physical mediums — from compact business cards to outdoor billboards — while guaranteeing 100% scan reliability.
            </p>
          </header>

          {/* Direct Answer Panel (AEO) */}
          <section className="my-10 rounded-2xl border border-slate-800/90 bg-slate-900/80 p-6 sm:p-8 ring-1 ring-white/[0.04]">
            <div className="flex items-center gap-2 text-[11px] font-mono text-cyan-400 uppercase tracking-widest font-semibold mb-2">
              <Zap className="h-3.5 w-3.5" />
              <span>DIRECT ANSWER SUMMARY</span>
            </div>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              When printing a QR code, its physical size must scale with the <strong>expected scanning distance</strong> and <strong>data density</strong>. For handheld items (business cards, menus, flyers), the standard minimum size is <strong>2.0 × 2.0 cm (0.8 × 0.8 inches)</strong>. For larger distances, apply the <strong>10:1 scanning ratio rule of thumb</strong>: <em>QR Width = Scan Distance ÷ 10</em>. In all cases, maintain an unobstructed <strong>4-module quiet zone</strong> border around the perimeter.
            </p>
          </section>

          {/* Article Content */}
          <article className="space-y-12 text-slate-300 text-sm sm:text-base leading-relaxed">
            {/* Section 1: Why Size Matters */}
            <section id="why-size-matters" className="space-y-4">
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Why QR Code Sizing Matters in Print Production
              </h2>
              <p>
                Unlike on-screen digital displays where users can pinch-to-zoom, physical print is fixed in resolution and optical focal distance. If a QR code is printed too small, smartphone camera sensors cannot resolve individual module pixels, resulting in focus hunting and scan failures.
              </p>
              <p>
                Furthermore, using <Link href="/dynamic-qr" className="text-cyan-400 hover:underline font-medium">dynamic QR codes</Link> drastically simplifies print sizing: because dynamic codes encode a concise, short redirect URL, the total grid module count remains low (e.g. 21×21 or 25×25 squares), ensuring each printed square is significantly larger than in a dense static QR code holding hundreds of characters.
              </p>
            </section>

            {/* Section 2: Distance to Size Ratio */}
            <section id="distance-ratio-table" className="space-y-4">
              <h2 className="text-2xl font-bold text-white tracking-tight">
                The 10:1 Scan Distance Ratio Guideline
              </h2>
              <p>
                The practical industry standard for optical recognition is the <strong>10:1 Distance-to-Size (D:S) ratio</strong>. This provides a robust safety margin across diverse smartphone lenses, sensor resolutions, and ambient lighting conditions.
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-800/90 ring-1 ring-white/[0.04]">
                <table className="w-full border-collapse text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-slate-800/90 bg-slate-900/90 font-mono text-slate-300">
                      <th className="p-4 font-semibold">Physical Medium</th>
                      <th className="p-4 font-semibold">Expected Scan Distance</th>
                      <th className="p-4 text-cyan-300 font-semibold">Recommended QR Size</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/70 font-mono text-xs">
                    <tr className="bg-slate-950/60">
                      <td className="p-4 font-bold text-slate-200">Business Cards / Badges</td>
                      <td className="p-4 text-slate-400">10 – 20 cm (4 – 8 in)</td>
                      <td className="p-4 text-cyan-300">2.0 × 2.0 cm (0.8 × 0.8 in)</td>
                    </tr>
                    <tr className="bg-slate-900/30">
                      <td className="p-4 font-bold text-slate-200">Restaurant Menus / Table Tents</td>
                      <td className="p-4 text-slate-400">25 – 40 cm (10 – 16 in)</td>
                      <td className="p-4 text-cyan-300">3.0 × 3.0 cm (1.2 × 1.2 in)</td>
                    </tr>
                    <tr className="bg-slate-950/60">
                      <td className="p-4 font-bold text-slate-200">Flyers, Brochures & Magazines</td>
                      <td className="p-4 text-slate-400">30 – 50 cm (12 – 20 in)</td>
                      <td className="p-4 text-cyan-300">3.5 × 3.5 cm (1.4 × 1.4 in)</td>
                    </tr>
                    <tr className="bg-slate-900/30">
                      <td className="p-4 font-bold text-slate-200">Posters & Storefront Windows</td>
                      <td className="p-4 text-slate-400">1 – 2 meters (3 – 6.5 ft)</td>
                      <td className="p-4 text-cyan-300">10 × 10 cm to 20 × 20 cm</td>
                    </tr>
                    <tr className="bg-slate-950/60">
                      <td className="p-4 font-bold text-slate-200">Trade Show Backdrops & Banners</td>
                      <td className="p-4 text-slate-400">2 – 4 meters (6.5 – 13 ft)</td>
                      <td className="p-4 text-cyan-300">30 × 30 cm to 40 × 40 cm</td>
                    </tr>
                    <tr className="bg-slate-900/30">
                      <td className="p-4 font-bold text-slate-200">Roadside Billboards</td>
                      <td className="p-4 text-slate-400">10 – 20 meters (33 – 66 ft)</td>
                      <td className="p-4 text-cyan-300">1.0 × 1.0 m to 2.0 × 2.0 m</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 3: Quiet Zone Requirements */}
            <section id="quiet-zone" className="space-y-4">
              <h2 className="text-2xl font-bold text-white tracking-tight">
                The Quiet Zone: Margin Requirements
              </h2>
              <p>
                According to international ISO/IEC 18004 standards, every QR code must include a <strong>Quiet Zone</strong> — a solid, high-contrast border with zero text, graphics, or imagery.
              </p>
              <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-5 space-y-3">
                <h3 className="text-white font-bold text-sm">Quiet Zone Engineering Rules:</h3>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-400 list-disc pl-5">
                  <li><strong>Minimum Width:</strong> Exactly 4 modules (4× the width of one single data square) on all 4 sides.</li>
                  <li><strong>Color Matching:</strong> The quiet zone must match the background color of the QR matrix (typically pure white).</li>
                  <li><strong>No Graphic Bleed:</strong> Background photos, frames, borders, or text must never overlap into this zone.</li>
                </ul>
              </div>
            </section>

            {/* Section 4: Common Printing Pitfalls */}
            <section id="common-mistakes" className="space-y-4">
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Top 5 Common QR Code Printing Mistakes
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-5 space-y-2">
                  <div className="text-rose-400 font-bold text-sm flex items-center gap-1.5">
                    <AlertTriangle className="h-4 w-4" /> 1. Poor Color Contrast
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Printing light gray or yellow on white, or dark blue on black. Camera sensors need high luminance contrast to decode module edges.
                  </p>
                </div>
                <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-5 space-y-2">
                  <div className="text-rose-400 font-bold text-sm flex items-center gap-1.5">
                    <AlertTriangle className="h-4 w-4" /> 2. Aspect Ratio Distortion
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Stretching or squeezing the QR code horizontally or vertically in graphic design software. QR codes must always remain exactly 1:1 square.
                  </p>
                </div>
                <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-5 space-y-2">
                  <div className="text-rose-400 font-bold text-sm flex items-center gap-1.5">
                    <AlertTriangle className="h-4 w-4" /> 3. Raster Blurring (Pixelation)
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Printing low-resolution 72 DPI JPGs. Always export vector formats (SVG) or ultra-high-resolution PNG files (300+ DPI).
                  </p>
                </div>
                <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-5 space-y-2">
                  <div className="text-rose-400 font-bold text-sm flex items-center gap-1.5">
                    <AlertTriangle className="h-4 w-4" /> 4. Cropped Quiet Zone
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Trimming right up to the edge of the position markers. The camera cannot differentiate the QR code from surrounding layout graphics.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 5: Pre-Press Checklist */}
            <section id="print-checklist" className="rounded-2xl border border-cyan-500/30 bg-slate-900/60 p-6 sm:p-8 space-y-4 ring-1 ring-cyan-500/20">
              <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <CheckSquare className="h-5 w-5 text-cyan-400" />
                Pre-Press Quality Verification Checklist
              </h2>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">✓</span>
                  <span><strong>Exported as Vector / 300+ DPI:</strong> SVG format downloaded for lossless print scaling.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">✓</span>
                  <span><strong>Physical Size Confirmed:</strong> Meets or exceeds the 2.0 × 2.0 cm minimum threshold.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">✓</span>
                  <span><strong>Quiet Zone Preserved:</strong> 4-module clean white border intact on all sides.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">✓</span>
                  <span><strong>Test Print Scanned on Physical Hardware:</strong> Tested on both iOS (Safari) and Android under low-light conditions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">✓</span>
                  <span><strong>Dynamic Gateway Linked:</strong> Attached to a <Link href="/dynamic-qr" className="text-cyan-400 hover:underline">dynamic QR pointer</Link> to ensure future destination updates without reprints.</span>
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
