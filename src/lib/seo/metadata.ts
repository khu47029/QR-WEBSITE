import type { Metadata } from "next";
import { SITE_CONFIG, getBaseUrl } from "./site";

interface MetadataOptions {
  title?: string;
  description?: string;
  path?: string;
  keywords?: string[];
  noIndex?: boolean;
  ogType?: "website" | "article";
  image?: string;
}

/**
 * Creates standardized Next.js Metadata objects with correct canonicals,
 * OpenGraph, Twitter cards, and robots directives.
 */
export function constructMetadata({
  title,
  description = SITE_CONFIG.description,
  path = "/",
  keywords = [
    "dynamic QR code",
    "QR code file sharing",
    "share PDF with QR",
    "password protected QR code",
    "digital content gateway",
    "multi-file QR bundle",
    "editable QR code",
    "privacy-first QR platform",
  ],
  noIndex = false,
  ogType = "website",
  image = "/og-image.png",
}: MetadataOptions = {}): Metadata {
  const baseUrl = getBaseUrl();
  const canonicalUrl = path === "/" ? baseUrl : `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
  const fullImageUrl = image.startsWith("http") ? image : `${baseUrl}${image.startsWith("/") ? image : `/${image}`}`;

  const formattedTitle = title
    ? `${title} | ${SITE_CONFIG.name}`
    : `${SITE_CONFIG.name} — ${SITE_CONFIG.slogan}`;

  return {
    metadataBase: new URL(baseUrl),
    title: formattedTitle,
    description,
    keywords,
    authors: [{ name: SITE_CONFIG.name, url: baseUrl }],
    creator: SITE_CONFIG.name,
    publisher: SITE_CONFIG.name,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          nocache: true,
          googleBot: {
            index: false,
            follow: false,
            "max-video-preview": -1,
            "max-image-preview": "none",
            "max-snippet": -1,
          },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    openGraph: {
      title: formattedTitle,
      description,
      url: canonicalUrl,
      siteName: SITE_CONFIG.name,
      locale: SITE_CONFIG.defaultLocale,
      type: ogType,
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: `${SITE_CONFIG.name} — ${SITE_CONFIG.slogan}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: formattedTitle,
      description,
      images: [fullImageUrl],
      creator: `@${SITE_CONFIG.name.toLowerCase()}`,
    },
    icons: {
      icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%230284c7'><path d='M3 3h8v8H3zm10 0h8v8h-8zM3 13h8v8H3zm13 3h2v2h-2zm-3-3h2v2h-2zm3 3h2v2h-2zm3-3h2v2h-2zm-3 3h2v2h-2z'/></svg>",
    },
  };
}

/**
 * Convenience helper for private/gated routes (dashboard, resolver, auth).
 */
export function constructNoIndexMetadata(title: string): Metadata {
  return constructMetadata({
    title,
    noIndex: true,
  });
}
