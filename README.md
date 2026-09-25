# QRAZEN — Modern Dynamic QR & Content Distribution Platform

> Decoupling physical QR codes from digital payloads with sub-millisecond pointer resolution, sandboxed mobile viewers, cryptographic gating, and privacy-first analytics.

[![Next.js](https://img.shields.io/badge/Next.js-15.1.7-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Tested_with-Vitest-6E9F18?style=flat-square&logo=vitest)](https://vitest.dev/)

---

## Overview

Traditional static QR codes bake raw URLs or textual payloads directly into physical ink patterns. Once printed on product packaging, restaurant tables, event banners, or brochures, any mistake, domain migration, or content update requires complete reprinting.

**QRAZEN** solves this by generating compact, unguessable cryptographic resolver tokens (`128+ bits of entropy`). The printed vector matrix remains permanently fixed while the underlying digital payload (PDFs, photo galleries, ZIP bundles, or destination links) can be mutated instantaneously in the cloud without reprinting physical materials.

---

## Core Capabilities

- **Dynamic Pointer Rotation**: Update destination URLs, menus, documents, or media behind printed QR codes at any time without invalidating the physical matrix.
- **Zero-App Mobile Document Viewing**: Instant in-browser mobile rendering for single and multi-page PDFs with responsive pinch-to-zoom and sandboxed viewing.
- **High-Resolution Image Galleries**: Showcase portfolios, real estate galleries, or event photos behind a single unified QR portal.
- **Multi-File Asset Bundles**: Consolidate PDFs, images, notes, and ZIP archives with client-side central directory manifest parsing.
- **Argon2id Cryptographic Gating**: Server-side access verification protecting confidential files and enterprise assets.
- **Privacy-First Telemetry**: Strict zero raw IP address storage. Scan telemetry utilizes a daily-salted cryptographic hash that automatically expires.
- **Automated Lifecycle Controls**: Configure scheduled expiration timestamps, view limits, or one-click killswitches with instant revocation.

---

## Architectural Model

```
[ Physical QR Matrix ]
         ¦
         ? (Encodes /r/[token])
[ Edge Resolver Endpoint ]
         ¦
         +-- Check Token State (Active / Suspended / Expired)
         +-- Validate Security Gates (Argon2id Password / Time Locks)
         +-- Query Content Version Pointer
                 ¦
                 +-- Mode A: PDF Document Gateway (Sandboxed Mobile Viewer)
                 +-- Mode B: High-Res Photo Gallery (Touch Carousel)
                 +-- Mode C: Multi-File Bundle (ZIP & Asset Manifest)
                 +-- Mode D: Dynamic HTTP Redirect (Zero-Hop)
```

---

## Technology Stack

- **Framework**: Next.js 15 (App Router) with React 19
- **Language**: TypeScript 5.7 (Strict Mode)
- **Styling**: Tailwind CSS with custom dark cyber-aesthetic design system
- **Database & ORM**: Drizzle ORM with LibSQL / SQLite / PostgreSQL adapters
- **QR Generation**: Native SVG/Canvas vector generation via `qrcode`
- **Testing**: Vitest automated unit & SEO regression suites
- **Icons**: Lucide React

---

## Getting Started

### Prerequisites

- Node.js 18.18.0 or later
- npm or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/qrazen/qrazen.git
   cd qrazen
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env
   ```

4. Start the local development server:
   ```bash
   npm run dev
   ```

5. Open `http://localhost:3000` in your browser.

---

## Verification & Testing

Run the automated SEO, schema validation, and URL canonicalization test suite:

```bash
npm run test
```

Execute a full production build:

```bash
npm run build
```

---

## Engineering & Educational Guides

- [Dynamic vs. Static QR Codes: Technical Comparison Guide](https://qr-website-ivory.vercel.app/learn/dynamic-vs-static-qr-codes)
- [QR Code Minimum Print Size & Scan Distance Calculations](https://qr-website-ivory.vercel.app/learn/qr-code-print-size-guide)
- [Reed-Solomon Error Correction Levels (L, M, Q, H) Explained](https://qr-website-ivory.vercel.app/learn/qr-code-error-correction)
- [How to Link Multiple Files & Documents to a Single QR Code](https://qr-website-ivory.vercel.app/learn/multiple-files-qr-code)

---

## Security & Disclosure

Security and user privacy are foundational to QRAZEN:
- Direct scanner IP addresses are never written to disk or logs.
- All file uploads are validated with magic-byte header inspection.
- Private resolver routes (`/r/*`), auth endpoints, and user dashboards are protected with strict `noindex, nofollow` HTTP headers and robots exclusion.

For responsible vulnerability disclosure or security questions, please consult our security documentation at `/security`.

---

## License

Private and proprietary. All rights reserved.
