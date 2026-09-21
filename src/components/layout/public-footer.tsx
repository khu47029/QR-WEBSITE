import Link from "next/link";
import { SITE_CONFIG } from "@/lib/seo/site";
import { QrazenIconMark } from "@/components/brand/qrazen-logo";

export function PublicFooter() {
  return (
    <footer className="border-t border-slate-900 bg-slate-950 px-6 py-12 text-xs text-slate-500">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <QrazenIconMark size="sm" />
              <span className="font-bold text-slate-200 text-sm tracking-tight group-hover:text-cyan-300 transition-colors">
                {SITE_CONFIG.name}
              </span>
            </Link>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              {SITE_CONFIG.description}
            </p>
            <p className="text-[11px] font-mono text-cyan-400/80">
              Architected for speed, privacy, and zero-reprint dynamic mutation.
            </p>
          </div>

          {/* Capabilities Col */}
          <div className="space-y-2.5">
            <h4 className="font-mono text-slate-300 font-semibold uppercase tracking-wider text-[11px]">
              Capabilities
            </h4>
            <ul className="space-y-2 font-mono text-[11px]">
              <li>
                <Link href="/dynamic-qr" className="hover:text-cyan-400 transition-colors">
                  Dynamic QR Codes
                </Link>
              </li>
              <li>
                <Link href="/pdf-qr" className="hover:text-cyan-400 transition-colors">
                  PDF QR Sharing
                </Link>
              </li>
              <li>
                <Link href="/image-qr" className="hover:text-cyan-400 transition-colors">
                  Image Galleries
                </Link>
              </li>
              <li>
                <Link href="/multi-file-qr" className="hover:text-cyan-400 transition-colors">
                  Multi-File Bundles
                </Link>
              </li>
            </ul>
          </div>

          {/* Trust & Knowledge Col */}
          <div className="space-y-2.5">
            <h4 className="font-mono text-slate-300 font-semibold uppercase tracking-wider text-[11px]">
              Trust & Knowledge
            </h4>
            <ul className="space-y-2 font-mono text-[11px]">
              <li>
                <Link href="/security" className="hover:text-cyan-400 transition-colors">
                  Security & Privacy
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-cyan-400 transition-colors">
                  Knowledge & FAQ
                </Link>
              </li>
              <li>
                <Link href="/legal/privacy" className="hover:text-cyan-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/legal/aup" className="hover:text-cyan-400 transition-colors">
                  Acceptable Use Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-900/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} {SITE_CONFIG.legalName}. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[11px] font-mono">
            <Link href="/legal/aup" className="hover:text-slate-300 transition-colors">
              Acceptable Use
            </Link>
            <span>·</span>
            <Link href="/legal/privacy" className="hover:text-slate-300 transition-colors">
              Privacy Notice
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
