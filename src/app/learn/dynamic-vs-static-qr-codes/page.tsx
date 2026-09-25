import type { Metadata } from "next";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo/metadata";
import { buildArticleSchema, buildFaqSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { PublicHeader } from "@/components/layout/public-header";
import { PublicFooter } from "@/components/layout/public-footer";
import {
  RefreshCw,
  Zap,
  ArrowRight,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Layers,
  Lock,
} from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Dynamic QR Codes vs Static QR Codes: The Engineering Difference",
  description:
    "An engineering deep dive into dynamic vs static QR codes: how server-side pointer mutation works, when to use static vs dynamic, and reprint cost elimination.",
  path: "/learn/dynamic-vs-static-qr-codes",
  keywords: [
    "dynamic qr code vs static qr code",
    "what is a dynamic qr code",
    "what is a static qr code",
    "dynamic qr code meaning",
    "static vs dynamic qr",
    "can dynamic qr codes be edited",
    "do dynamic qr codes expire",
  ],
});

const FAQS = [
  {
    q: "What is the main technical difference between dynamic and static QR codes?",
    a: "Static QR codes encode target data (such as a full URL or text string) directly into the black-and-white pixel matrix. Dynamic QR codes encode a short, immutable resolver URL pointing to a server database record, allowing the underlying destination URL, PDF, or file bundle to be updated at any time without changing the physical matrix.",
  },
  {
    q: "Can I edit a dynamic QR code after printing it on packaging or flyers?",
    a: "Yes. Because the printed QR code points to an intermediary server token, you can modify the destination URL, upload a new PDF document, or replace image assets in your workstation without reprinting any physical materials.",
  },
  {
    q: "Do dynamic QR codes expire?",
    a: "Dynamic QR codes do not expire by technical limitation, but their accessibility depends on the hosting platform. In QRAZEN, dynamic QR codes remain active according to your account configuration, and you can optionally set explicit automated expiration dates for temporary access windows.",
  },
  {
    q: "Are dynamic QR codes slower to scan than static QR codes?",
    a: "No. Because dynamic QR codes encode short resolver URLs (e.g. /r/tok_...), they require fewer data modules (lower QR version and lower density) than static QR codes encoding long URLs, making them faster and easier for mobile cameras to focus on and decode.",
  },
];

export default function DynamicVsStaticArticle() {
  const articleSchema = buildArticleSchema({
    headline: "Dynamic QR Codes vs Static QR Codes: The Engineering Difference",
    description:
      "A technical comparison of dynamic pointer rotation versus static raw matrix encoding in QR code systems.",
    path: "/learn/dynamic-vs-static-qr-codes",
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
              { name: "Dynamic vs Static QR", href: "/learn/dynamic-vs-static-qr-codes" },
            ]}
          />

          {/* Article Header */}
          <header className="py-8 space-y-4 border-b border-slate-800/80">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/90 px-3.5 py-1 text-[11px] font-mono font-medium text-slate-300 ring-1 ring-white/[0.04]">
              <RefreshCw className="h-3.5 w-3.5 text-cyan-400" />
              <span className="text-cyan-300">QR ARCHITECTURE & RESOLVER MECHANICS</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Dynamic QR Codes vs Static QR Codes: The Engineering Difference
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              A complete technical comparison of immutable direct-matrix encoding versus server-side pointer rotation, with practical selection criteria for production deployments.
            </p>
          </header>

          {/* Direct Answer Panel (AEO) */}
          <section className="my-10 rounded-2xl border border-slate-800/90 bg-slate-900/80 p-6 sm:p-8 ring-1 ring-white/[0.04]">
            <div className="flex items-center gap-2 text-[11px] font-mono text-cyan-400 uppercase tracking-widest font-semibold mb-2">
              <Zap className="h-3.5 w-3.5" />
              <span>DIRECT ANSWER SUMMARY</span>
            </div>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              The core difference between a dynamic QR code and a static QR code is <strong>where the destination data is stored</strong>. A <strong>static QR code</strong> encodes the entire payload directly into the physical printed matrix, making it permanent and uneditable once printed. A <strong>dynamic QR code</strong> encodes an unchangeable, short redirect token pointing to a server database record, allowing the underlying target URL, PDF file, image gallery, or document bundle to be modified instantly without reprinting the physical matrix.
            </p>
          </section>

          {/* Article Body */}
          <article className="space-y-12 text-slate-300 text-sm sm:text-base leading-relaxed">
            {/* Section 1: Static QR */}
            <section id="what-is-static-qr" className="space-y-4">
              <h2 className="text-2xl font-bold text-white tracking-tight">
                What Is a Static QR Code?
              </h2>
              <p>
                A <strong>static QR code</strong> encodes alphanumeric characters directly into the two-dimensional matrix using ISO/IEC 18004 barcode specifications. When a smartphone camera scans a static QR code, the camera hardware decodes the black-and-white square modules (the pattern) straight into a raw string — such as plain text, Wi-Fi credentials, or a full web URL — without contacting an intermediary routing server.
              </p>
              <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-5 space-y-3">
                <h3 className="text-white font-bold text-sm">Key Characteristics of Static QR Codes:</h3>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-400 list-disc pl-5">
                  <li><strong>Permanent Immutability:</strong> If the destination URL changes or experiences a 404 error, the printed QR code is broken forever.</li>
                  <li><strong>Data Density Scaling:</strong> Longer URLs require more data modules, creating dense, complex matrix patterns that are harder for cameras to scan from a distance.</li>
                  <li><strong>Zero Server Intermediary:</strong> Does not depend on any third-party redirection service to function.</li>
                  <li><strong>Zero Access Governance:</strong> Cannot be password-protected, time-gated, or tracked with scan analytics.</li>
                </ul>
              </div>
            </section>

            {/* Section 2: Dynamic QR */}
            <section id="what-is-dynamic-qr" className="space-y-4">
              <h2 className="text-2xl font-bold text-white tracking-tight">
                What Is a Dynamic QR Code?
              </h2>
              <p>
                A <strong>dynamic QR code</strong> acts as a persistent digital gateway. Instead of encoding the complete destination data, the matrix encodes a short, standardized URL pointing to a high-speed resolver endpoint (e.g., <code className="text-cyan-300 font-mono text-xs bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">https://qrazen.com/r/tok_123abc</code>).
              </p>
              <p>
                When scanned, the resolver queries a database record to retrieve the active content version assigned to that token. In modern platforms like <Link href="/dynamic-qr" className="text-cyan-400 hover:underline font-medium">QRAZEN</Link>, this allows users to rotate target URLs, replace hosted <Link href="/pdf-qr" className="text-cyan-400 hover:underline">PDF documents</Link>, update <Link href="/image-qr" className="text-cyan-400 hover:underline">image galleries</Link>, or distribute <Link href="/multi-file-qr" className="text-cyan-400 hover:underline">multi-file bundles</Link> at any time.
              </p>
              <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-5 space-y-3">
                <h3 className="text-white font-bold text-sm">Key Capabilities of Dynamic QR Codes:</h3>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-400 list-disc pl-5">
                  <li><strong>Zero Reprint Costs:</strong> Modify content anytime from an online workstation while retaining the exact same printed code on signs, packaging, or vehicles.</li>
                  <li><strong>Optimized Scan Scannability:</strong> Short token URLs maintain low module density (Version 2–4), ensuring fast optical acquisition even in low light.</li>
                  <li><strong>Server-Side Access Control:</strong> Enforce cryptographic <Link href="/security" className="text-cyan-400 hover:underline">Argon2id password gates</Link> and scheduled expiration windows.</li>
                  <li><strong>Privacy-Preserving Telemetry:</strong> Collect scan counts, device operating systems, and coarse browser metrics without logging raw IP addresses.</li>
                </ul>
              </div>
            </section>

            {/* Section 3: Technical Comparison Table */}
            <section id="comparison-matrix" className="space-y-4">
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Dynamic vs Static QR Code Technical Comparison
              </h2>
              <p className="text-slate-400 text-sm">
                A side-by-side architectural comparison of operational and lifecycle differences:
              </p>
              <div className="overflow-x-auto rounded-2xl border border-slate-800/90 ring-1 ring-white/[0.04]">
                <table className="w-full border-collapse text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-slate-800/90 bg-slate-900/90 font-mono text-slate-300">
                      <th className="p-4 font-semibold">Technical Parameter</th>
                      <th className="p-4 text-rose-400 font-semibold">Static QR Code</th>
                      <th className="p-4 text-cyan-300 font-semibold">Dynamic QR Code</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/70 font-mono text-xs">
                    <tr className="bg-slate-950/60">
                      <td className="p-4 font-bold text-slate-200">Data Location</td>
                      <td className="p-4 text-slate-400">Hardcoded into physical matrix dots</td>
                      <td className="p-4 text-cyan-300">Stored in server database pointer</td>
                    </tr>
                    <tr className="bg-slate-900/30">
                      <td className="p-4 font-bold text-slate-200">Content Mutability</td>
                      <td className="p-4 text-slate-400">Impossible after printing</td>
                      <td className="p-4 text-cyan-300">Instant modification anytime</td>
                    </tr>
                    <tr className="bg-slate-950/60">
                      <td className="p-4 font-bold text-slate-200">Matrix Visual Density</td>
                      <td className="p-4 text-slate-400">Scales with data length (dense)</td>
                      <td className="p-4 text-cyan-300">Constant & clean (short token)</td>
                    </tr>
                    <tr className="bg-slate-900/30">
                      <td className="p-4 font-bold text-slate-200">Password Protection</td>
                      <td className="p-4 text-slate-400">Not supported</td>
                      <td className="p-4 text-cyan-300">Supported (server-side verification)</td>
                    </tr>
                    <tr className="bg-slate-950/60">
                      <td className="p-4 font-bold text-slate-200">Lifespan Governance</td>
                      <td className="p-4 text-slate-400">Permanent (cannot be disabled)</td>
                      <td className="p-4 text-cyan-300">Schedulable expiration & pause toggle</td>
                    </tr>
                    <tr className="bg-slate-900/30">
                      <td className="p-4 font-bold text-slate-200">Scan Analytics</td>
                      <td className="p-4 text-slate-400">Zero scan telemetry</td>
                      <td className="p-4 text-cyan-300">Aggregated privacy-first metrics</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 4: Use Cases */}
            <section id="use-cases" className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-slate-800/80 bg-slate-900/50 p-6 space-y-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  When to Use Static QR Codes
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-400 list-disc pl-5">
                  <li><strong>Wi-Fi Network Credentials:</strong> Permanent home or office router access keys that never change.</li>
                  <li><strong>Plain Text & Numbers:</strong> Fixed model serial numbers, hardware IDs, or cryptographic public keys.</li>
                  <li><strong>Personal vCards:</strong> Static contact information encoded directly without server dependencies.</li>
                  <li><strong>Offline Scenarios:</strong> Environments with zero internet connectivity requiring direct raw string parsing.</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-slate-800/80 bg-slate-900/50 p-6 space-y-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                  When to Use Dynamic QR Codes
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-400 list-disc pl-5">
                  <li><strong>Restaurant Menus & Catalogs:</strong> Price updates and seasonal item changes without reprinting table stands.</li>
                  <li><strong>Marketing Signage & Billboards:</strong> Rotating campaign landing pages over a multi-month print lifecycle.</li>
                  <li><strong>Product Packaging & User Manuals:</strong> Keeping downloadable PDF guides and warranty URLs accurate over years.</li>
                  <li><strong>Confidential Business Documents:</strong> Requiring password authentication, audit telemetry, or scheduled expiration.</li>
                </ul>
              </div>
            </section>

            {/* Section 5: Expiration Truth */}
            <section id="expiration-facts" className="space-y-4">
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Do Dynamic QR Codes Expire?
              </h2>
              <p>
                A standard QR code pattern itself has no built-in expiration date. However, because a dynamic QR code routes through a host server, <strong>its lifespan depends entirely on the server resolver</strong>.
              </p>
              <p>
                In the QRAZEN infrastructure, dynamic QR codes remain fully functional as long as your account and gateway remain active. Additionally, QRAZEN provides deliberate <strong>scheduled expiration lifespans</strong> as a security feature, enabling users to automatically terminate access to sensitive pitch decks, event tickets, or embargoed press kits after a specific timestamp.
              </p>
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
                Ready to Deploy Dynamic QR Codes?
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm max-w-lg mx-auto">
                Create editable, password-gated dynamic QR gateways with QRAZEN. Update PDFs, images, and destination URLs anytime.
              </p>
              <div className="pt-2">
                <Link
                  href="/signup"
                  className="rounded-xl bg-cyan-500 px-7 py-3 text-xs font-bold text-slate-950 hover:bg-cyan-400 shadow-md shadow-cyan-500/20 transition-all inline-flex items-center gap-2"
                >
                  Create Free Dynamic QR <ArrowRight className="h-3.5 w-3.5" />
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
