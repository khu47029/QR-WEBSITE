import type { Metadata } from "next";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo/metadata";
import { buildFaqSchema, buildWebPageSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { PublicHeader } from "@/components/layout/public-header";
import { PublicFooter } from "@/components/layout/public-footer";
import {
  RefreshCw,
  Layers,
  Lock,
  ArrowRight,
  CheckCircle2,
  Zap,
  ShieldCheck,
  Server,
  FileCode,
  QrCode,
} from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Dynamic QR Codes — Live Content Mutation Without Reprinting",
  description:
    "Learn how QRAZEN dynamic QR codes work: mutate PDFs, images, links, or notes instantly via server-side pointers while keeping your printed QR matrix unchanged.",
  path: "/dynamic-qr",
  keywords: [
    "dynamic QR code",
    "editable QR code",
    "dynamic QR code generator",
    "update QR code after printing",
    "dynamic vs static QR code",
    "QR content replacement",
  ],
});

const FAQS = [
  {
    q: "What is a dynamic QR code and how does it work?",
    a: "A dynamic QR code encodes an immutable, cryptographic access token pointing to a high-speed server resolver. Instead of locking the destination URL or file into the printed dots, the server dynamically retrieves the active content version attached to that token. When you update your content, only the server pointer changes, while the physical QR code continues working seamlessly.",
  },
  {
    q: "Can I change QR code content after printing materials?",
    a: "Yes. With QRAZEN, you can swap PDFs, replace image galleries, change destination links, or edit text notes at any time from your workstation. The printed QR code on signs, packaging, or badges never needs to be reprinted.",
  },
  {
    q: "What is the difference between dynamic and static QR codes?",
    a: "Static QR codes permanently bake raw text or URLs into physical ink, making edits impossible once printed. Dynamic QR codes route through a secure resolver, enabling instant content updates, password gating, access expiration, and privacy-preserving scan telemetry.",
  },
  {
    q: "Does changing content introduce redirection delays?",
    a: "No. QRAZEN's server-rendered resolver processes token lookups in sub-millisecond database queries, serving updated payloads directly to viewers without sluggish intermediate redirect chains.",
  },
];

export default function DynamicQrPage() {
  const pageSchema = buildWebPageSchema({
    title: "Dynamic QR Codes — Live Content Mutation Without Reprinting",
    description:
      "Understand the mechanics of dynamic QR codes and how server-side pointer rotation eliminates reprint costs.",
    path: "/dynamic-qr",
  });

  const faqSchema = buildFaqSchema(FAQS);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500/20 selection:text-cyan-200 flex flex-col justify-between">
      <JsonLd schema={[pageSchema, faqSchema]} />
      <PublicHeader currentPath="/dynamic-qr" />

      <main className="flex-1 px-6 py-12">
        <div className="mx-auto max-w-5xl">
          <Breadcrumbs items={[{ name: "Dynamic QR Codes", href: "/dynamic-qr" }]} />

          {/* Hero Header */}
          <header className="py-8 text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/90 px-3.5 py-1 text-[11px] font-mono font-medium text-slate-300 ring-1 ring-white/[0.04]">
              <RefreshCw className="h-3.5 w-3.5 text-cyan-400" />
              <span className="text-cyan-300">SERVER-SIDE POINTER MUTATION</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Dynamic QR Codes: <br />
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 bg-clip-text text-transparent">
                Never Reprint Physical Ink Again
              </span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Traditional static QR codes permanently hardcode data into physical dots. QRAZEN dynamic tokens decouple the printed matrix from the digital payload, giving you absolute control over what viewers see.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/signup"
                className="rounded-xl bg-cyan-500 px-6 py-2.5 text-xs font-bold text-slate-950 hover:bg-cyan-400 shadow-md shadow-cyan-500/20 transition-all active:scale-[0.98] inline-flex items-center gap-2"
              >
                Create Dynamic QR <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/faq"
                className="rounded-xl border border-slate-800 bg-slate-900/90 px-5 py-2.5 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
              >
                Compare Static vs Dynamic
              </Link>
            </div>
          </header>

          {/* Direct-Answer Specification Panel */}
          <section className="my-14 rounded-2xl border border-slate-800/90 bg-slate-900/80 p-6 sm:p-9 ring-1 ring-white/[0.04]">
            <div className="flex items-center gap-2.5 text-[11px] font-mono text-cyan-400 uppercase tracking-widest font-semibold mb-3">
              <Zap className="h-3.5 w-3.5 text-cyan-400" />
              <span>DIRECT SPECIFICATION</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-3">
              How Dynamic Pointer Rotation Works
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
              When a QRAZEN dynamic QR code is generated, the system creates an immutable, unguessable cryptographic token (128+ bits of entropy). The physical QR matrix encodes only the secure resolver URL (<code className="text-cyan-300 font-mono text-xs bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">/r/[token]</code>). In the database, this token points to a specific <strong className="text-white">content version</strong> containing your uploaded PDF, gallery, ZIP, or URL payload.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-xl border border-slate-800/80 bg-slate-950/70 p-5 space-y-2">
                <div className="text-cyan-400 font-mono text-[11px] font-bold">STAGE 01</div>
                <h3 className="text-white font-bold text-sm">Scan & Token Dispatch</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Mobile camera scans the static ink matrix, requesting the unguessable resolver token from the edge.
                </p>
              </div>
              <div className="rounded-xl border border-slate-800/80 bg-slate-950/70 p-5 space-y-2">
                <div className="text-cyan-400 font-mono text-[11px] font-bold">STAGE 02</div>
                <h3 className="text-white font-bold text-sm">Server Pointer Evaluation</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  The resolver checks status (active, expired, disabled), verifies Argon2id password rules, and queries the latest content version.
                </p>
              </div>
              <div className="rounded-xl border border-slate-800/80 bg-slate-950/70 p-5 space-y-2">
                <div className="text-cyan-400 font-mono text-[11px] font-bold">STAGE 03</div>
                <h3 className="text-white font-bold text-sm">Instant Payload Delivery</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  The active payload is rendered inside a sandboxed, zero-install mobile viewer in under 50ms.
                </p>
              </div>
            </div>
          </section>

          {/* Architectural Comparison */}
          <section className="my-14 space-y-6">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Static QR vs. QRAZEN Dynamic Gateway
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-2">
                A technical comparison of production viability, risk exposure, and lifecycle management.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-800/90 ring-1 ring-white/[0.04]">
              <table className="w-full border-collapse text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-800/90 bg-slate-900/90 font-mono text-slate-300">
                    <th className="p-4 font-semibold">Capability</th>
                    <th className="p-4 text-rose-400 font-semibold">Traditional Static QR</th>
                    <th className="p-4 text-cyan-300 font-semibold">QRAZEN Dynamic QR</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/70 font-mono text-xs">
                  <tr className="bg-slate-950/60">
                    <td className="p-4 font-bold text-slate-200">Content Updatability</td>
                    <td className="p-4 text-slate-400">Impossible. Hardcoded into ink.</td>
                    <td className="p-4 text-cyan-300">Instant. Pointer mutation anytime.</td>
                  </tr>
                  <tr className="bg-slate-900/30">
                    <td className="p-4 font-bold text-slate-200">Password Protection</td>
                    <td className="p-4 text-slate-400">None. Public to anyone who scans.</td>
                    <td className="p-4 text-cyan-300">Argon2id cryptographic server gate.</td>
                  </tr>
                  <tr className="bg-slate-950/60">
                    <td className="p-4 font-bold text-slate-200">Lifespan & Expiration</td>
                    <td className="p-4 text-slate-400">Permanent forever (cannot shut off).</td>
                    <td className="p-4 text-cyan-300">Scheduled expiry timers & pause toggle.</td>
                  </tr>
                  <tr className="bg-slate-900/30">
                    <td className="p-4 font-bold text-slate-200">Scan Telemetry</td>
                    <td className="p-4 text-slate-400">Zero data or scan counts.</td>
                    <td className="p-4 text-cyan-300">Privacy-first daily salted telemetry.</td>
                  </tr>
                  <tr className="bg-slate-950/60">
                    <td className="p-4 font-bold text-slate-200">Viewer App Requirement</td>
                    <td className="p-4 text-slate-400">Native camera.</td>
                    <td className="p-4 text-cyan-300">Native camera + zero-app web viewer.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="my-14 space-y-5">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Frequently Asked Questions About Dynamic QR Codes
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
