import { SITE_CONFIG, getBaseUrl } from "./site";

export interface FAQItem {
  q: string;
  a: string;
}

export interface BreadcrumbItem {
  name: string;
  item: string;
}

/**
 * Builds the primary Knowledge Graph for the QRAZEN platform.
 */
export function buildPlatformGraph() {
  const baseUrl = getBaseUrl();

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        "name": SITE_CONFIG.name,
        "legalName": SITE_CONFIG.legalName,
        "url": baseUrl,
        "logo": {
          "@type": "ImageObject",
          "url": `${baseUrl}/icon.png`,
          "caption": SITE_CONFIG.name,
        },
        "description": SITE_CONFIG.description,
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        "url": baseUrl,
        "name": SITE_CONFIG.name,
        "description": SITE_CONFIG.description,
        "publisher": {
          "@id": `${baseUrl}/#organization`,
        },
        "inLanguage": "en-US",
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${baseUrl}/#application`,
        "name": SITE_CONFIG.name,
        "operatingSystem": "Web, iOS, Android (Zero app install required)",
        "applicationCategory": "BusinessApplication, UtilityApplication, FileSharing",
        "description": SITE_CONFIG.description,
        "featureList": [
          "Instant Dynamic QR Content Replacement Without Reprinting",
          "Direct PDF Document Hosting and Sandboxed Viewing",
          "High-Resolution Multi-Image Photo Galleries",
          "Multi-File Bundles and ZIP Archive Sharing",
          "Argon2id Cryptographic Server-Side Password Protection",
          "Automated Lifespan and Expiration Access Timers",
          "Privacy-Preserving Scan Telemetry with Zero Raw IP Storage",
        ],
        "publisher": {
          "@id": `${baseUrl}/#organization`,
        },
      },
    ],
  };
}

/**
 * Generates FAQPage schema for AEO / Answer Engines.
 */
export function buildFaqSchema(faqs: readonly FAQItem[] | FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a,
      },
    })),
  };
}

/**
 * Generates BreadcrumbList schema for structural search hierarchy.
 */
export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  const baseUrl = getBaseUrl();

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.item.startsWith("http") ? item.item : `${baseUrl}${item.item.startsWith("/") ? item.item : `/${item.item}`}`,
    })),
  };
}

/**
 * Generates WebPage schema for specific capability pages.
 */
export function buildWebPageSchema({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) {
  const baseUrl = getBaseUrl();
  const url = path === "/" ? baseUrl : `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    "url": url,
    "name": title,
    "description": description,
    "isPartOf": {
      "@id": `${baseUrl}/#website`,
    },
    "inLanguage": "en-US",
  };
}

/**
 * Generates Article schema for educational and technical guides.
 */
export function buildArticleSchema({
  headline,
  description,
  path,
}: {
  headline: string;
  description: string;
  path: string;
}) {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;

  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${url}#article`,
    "url": url,
    "headline": headline,
    "description": description,
    "inLanguage": "en-US",
    "isPartOf": {
      "@id": `${baseUrl}/#website`,
    },
    "author": {
      "@id": `${baseUrl}/#organization`,
    },
    "publisher": {
      "@id": `${baseUrl}/#organization`,
    },
    "mainEntityOfPage": url,
  };
}
