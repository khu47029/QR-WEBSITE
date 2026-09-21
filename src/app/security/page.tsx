import type { Metadata } from "next";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo/metadata";
import { buildFaqSchema, buildWebPageSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { PublicHeader } from "@/components/layout/public-header";
import { PublicFooter } from "@/components/layout/public-footer";
import {
  ShieldCheck,
  Lock,
  Fingerprint,
  Clock,
  Eye,
  Server,
  ArrowRight,
  KeyRound,
  FileCheck2,
} from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Security & Privacy — Cryptographic Access & Zero Raw IP Logging",
  description:
    "Explore QRAZEN's privacy-by-design architecture: Argon2id password gating, daily salted IP hashing, scheduled token expiration, and sandboxed viewer isolation.",
  path: "/security",
  keywords: [
    "password protected QR code",
    "secure QR code generator",
    "QR code privacy",
    "privacy-first QR platform",
    "zero IP logging QR code",
    "Argon2id QR password",
  ],
});

const FAQS = [
  {
    q: "How does password protection work on QRAZEN dynamic QR codes?",
    a: "Password protection is enforced entirely server-side. Viewer passwords are never stored in plaintext — they are hashed using Argon2id / Scrypt cryptographic algorithms. When a viewer scans the QR, content is withheld until they enter the correct unlock key.",
  },
  {
    q: "Does QRAZEN log raw IP addresses when someone scans a QR code?",
    a: "No. QRAZEN operates under a strict privacy-by-design principle. Raw IP addresses are discarded immediately after extracting coarse geographic and device parameters. Repeat visitor analytics utilize a rotating daily salted hash that cannot be reversed or correlated across days.",
  },
  {
    q: "How does the token expiration feature work?",
    a: "You can assign an automated expiration timestamp to any dynamic gateway. The instant the expiration threshold is reached, our server resolver stops serving the payload and displays an expired status notice.",
  },
  {
    q: "What is View-Only Sandbox Mode?",
    a: "View-only mode renders documents and text within an inline viewer while suppressing direct binary download buttons. While it cannot prevent analog screen captures, it deters trivial redistribution of confidential files.",
  },
];

export default function SecurityPage() {
  const pageSchema = buildWebPageSchema({
    title: "Security & Privacy — Cryptographic Access & Zero Raw IP Logging",
    description:
      "Technical specifications of QRAZEN's cryptographic security, password gating, and privacy telemetry.",
    path: "/security",
  });

  const faqSchema = buildFaqSchema(FAQS);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500/20 selection:text-cyan-200 flex flex-col justify-between">
      <JsonLd schema={[pageSchema, faqSchema]} />
      <PublicHeader currentPath="/security" />

      <main className="flex-1 px-6 py-12">
        <div className="mx-auto max-w-5xl">
          <Breadcrumbs items={[{ name: "Security & Privacy", href: "/security" }]} />

          {/* Hero Header */}
          <header className="py-8 text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-mono font-medium text-cyan-300">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>PRIVACY-BY-DESIGN ARCHITECTURE</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Enterprise Security & <br />
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">
                Privacy-First Telemetry
              </span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Engineered with cryptographic password gates, automated expiration lifespans, and zero raw IP storage. Your assets remain secure and your viewers remain anonymous.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/signup"
                className="rounded-xl bg-cyan-500 px-6 py-3 text-xs font-bold text-slate-950 hover:bg-cyan-400 shadow-lg shadow-cyan-500/20 transition-all active:scale-[0.98] inline-flex items-center gap-2"
              >
                Create Protected QR Code <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/legal/privacy"
                className="rounded-xl border border-slate-800 bg-slate-900/80 px-5 py-3 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors"
              >
                Read Privacy Policy
              </Link>
            </div>
          </header>

          {/* 4 Pillars of QRAZEN Security */}
          <section className="my-16 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Lock className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-bold text-white">Argon2id Password Protection</h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Access to protected files is gated on our servers. The unlock hash is derived using Argon2id / Scrypt, preventing offline dictionary attacks and brute-force token harvesting with built-in rate-limiting.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Fingerprint className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-bold text-white">Zero Raw IP Address Storage</h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Unlike ad-tech QR trackers, QRAZEN never stores raw visitor IP addresses. Scan counts use a rotating daily salted hash that automatically expires, guaranteeing viewer privacy and GDPR compliance.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Clock className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-bold text-white">Automated Lifespan & Expiration</h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Set explicit access windows for sensitive pitch decks, event tickets, or time-sensitive collateral. Once the threshold passes, access is severed instantly at the server resolver.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Eye className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-bold text-white">View-Only Sandboxed Isolation</h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Render documents, text, and photos in sandboxed mobile frames that suppress one-click binary download triggers, reducing unauthorized redistribution of proprietary assets.
              </p>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="my-16 space-y-6">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Frequently Asked Questions About Security & Privacy
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
              Secure Your Digital Distribution
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm max-w-lg mx-auto">
              Password-protect PDFs, images, and bundles with QRAZEN Pro.
            </p>
            <div className="pt-2">
              <Link
                href="/signup"
                className="rounded-xl bg-cyan-500 px-8 py-3.5 text-xs font-bold text-slate-950 hover:bg-cyan-400 shadow-xl shadow-cyan-500/25 transition-all inline-flex items-center gap-2"
              >
                Create Protected Portal <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
