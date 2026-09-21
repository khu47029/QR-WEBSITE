/**
 * QRAZEN Search Intelligence (QSI) — Single Source of Truth
 * 
 * Centralized brand, product capabilities, entity definitions, and URL resolution.
 * Configured to seamlessly migrate from the temporary deployment URL to the future
 * custom domain (e.g., https://qrazen.com) via NEXT_PUBLIC_SITE_URL environment variable.
 */

export const DEFAULT_PRODUCTION_URL = "https://qr-website-ivory.vercel.app";

/**
 * Resolves the canonical base URL without trailing slash.
 * Priority:
 * 1. NEXT_PUBLIC_SITE_URL (Standard production custom domain configuration)
 * 2. NEXT_PUBLIC_BASE_URL (Existing environment variable in QRAZEN)
 * 3. NEXT_PUBLIC_APP_URL (Legacy fallback)
 * 4. DEFAULT_PRODUCTION_URL (Vercel deployment canonical)
 */
export function getBaseUrl(): string {
  const envUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_BASE_URL ||
    process.env.NEXT_PUBLIC_APP_URL;

  if (envUrl && envUrl.trim().length > 0) {
    return envUrl.trim().replace(/\/+$/, "");
  }

  return DEFAULT_PRODUCTION_URL;
}

export const SITE_CONFIG = {
  name: "QRAZEN",
  legalName: "QRAZEN Digital Gateway Infrastructure",
  slogan: "Content Becomes Instant Access",
  description:
    "Enterprise-grade dynamic QR code platform. Share PDFs, images, URLs, notes, and multi-file bundles behind immutable, password-gated, and editable QR gateways.",
  category: "Dynamic QR Code Platform & Content Sharing Infrastructure",
  defaultLocale: "en_US",
  themeColor: "#020617",
  
  // Confirmed verified product capabilities in code
  capabilities: {
    contentTypes: [
      {
        id: "pdf",
        name: "PDF Documents",
        description: "Distribute brochures, menus, whitepapers, and guides with inline sandboxed viewing.",
        route: "/pdf-qr",
      },
      {
        id: "image",
        name: "Images & Galleries",
        description: "Present high-resolution photo galleries and portfolios behind a single QR matrix.",
        route: "/image-qr",
      },
      {
        id: "multi",
        name: "Multi-File Bundles",
        description: "Consolidate mixed-media assets, documents, and archives in a unified mobile viewer.",
        route: "/multi-file-qr",
      },
      {
        id: "zip",
        name: "ZIP Archives",
        description: "Share compressed archives with sandboxed file manifest inspection.",
        route: "/multi-file-qr",
      },
      {
        id: "text",
        name: "Plain Text & Notes",
        description: "Instant scannable announcements, instructions, and credentials.",
        route: "/dynamic-qr",
      },
      {
        id: "url",
        name: "Dynamic Redirects",
        description: "Zero-latency live URL redirection with mutation capabilities without reprinting.",
        route: "/dynamic-qr",
      },
    ],
    security: {
      passwordProtection: "Argon2id / Scrypt cryptographic server-side password gating",
      privacyTelemetry: "Zero raw IP storage; daily-rotating salt hash; coarse device breakdown",
      expiration: "Automated lifespan timers with instant server-side access withholding",
      viewOnly: "Sandboxed viewing mode deterring one-click binary download triggers",
    },
    pricing: {
      free: {
        name: "Free Forever",
        price: "$0",
        priceCurrency: "USD",
        activeGateways: "2 Active Dynamic QR Gateways",
        storage: "100 MB Cloud Asset Storage",
      },
      pro: {
        name: "Pro Gateway",
        price: "$19",
        priceCurrency: "USD",
        billingPeriod: "month",
        activeGateways: "Unlimited Dynamic QR Gateways",
        storage: "50 GB Cloud Asset Storage",
      },
    },
  },

  // Navigation and IA
  navLinks: [
    { label: "Dynamic QR", href: "/dynamic-qr" },
    { label: "PDF Sharing", href: "/pdf-qr" },
    { label: "Image Gallery", href: "/image-qr" },
    { label: "Multi-File Bundles", href: "/multi-file-qr" },
    { label: "Security & Privacy", href: "/security" },
    { label: "FAQ", href: "/faq" },
  ],
  legalLinks: [
    { label: "Privacy Policy", href: "/legal/privacy" },
    { label: "Acceptable Use Policy", href: "/legal/aup" },
  ],
} as const;
