import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { getBaseUrl, SITE_CONFIG, DEFAULT_PRODUCTION_URL } from "@/lib/seo/site";
import { constructMetadata, constructNoIndexMetadata } from "@/lib/seo/metadata";
import { buildPlatformGraph, buildFaqSchema, buildBreadcrumbSchema } from "@/lib/seo/schema";
import { buildResolverUrl } from "@/lib/qr/qr-generator";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";

describe("QRAZEN Search Intelligence (QSI) — Automated Verification Suite", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    delete process.env.NEXT_PUBLIC_BASE_URL;
    delete process.env.NEXT_PUBLIC_APP_URL;
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  describe("Layer 1 & 5: Base URL Resolution & Single Source of Truth", () => {
    it("falls back to the default production Vercel URL when no env vars are set", () => {
      expect(getBaseUrl()).toBe(DEFAULT_PRODUCTION_URL);
    });

    it("respects NEXT_PUBLIC_SITE_URL when configured for custom domain migration", () => {
      process.env.NEXT_PUBLIC_SITE_URL = "https://qrazen.com";
      expect(getBaseUrl()).toBe("https://qrazen.com");
    });

    it("strips trailing slashes correctly", () => {
      process.env.NEXT_PUBLIC_SITE_URL = "https://qrazen.com///";
      expect(getBaseUrl()).toBe("https://qrazen.com");
    });

    it("prioritizes NEXT_PUBLIC_SITE_URL over legacy NEXT_PUBLIC_BASE_URL", () => {
      process.env.NEXT_PUBLIC_SITE_URL = "https://qrazen.com";
      process.env.NEXT_PUBLIC_BASE_URL = "http://localhost:3000";
      expect(getBaseUrl()).toBe("https://qrazen.com");
    });

    it("buildResolverUrl generates canonical resolver URLs without hardcoded localhost in prod", () => {
      // Default production fallback
      expect(buildResolverUrl("tok_test_123")).toBe(`${DEFAULT_PRODUCTION_URL}/r/tok_test_123`);

      // Custom domain override
      process.env.NEXT_PUBLIC_SITE_URL = "https://qrazen.com";
      expect(buildResolverUrl("tok_test_123")).toBe("https://qrazen.com/r/tok_test_123");
    });
  });

  describe("Layer 1 & 8: Metadata Generation & NoIndex Guards", () => {
    it("constructs full OpenGraph, Twitter, and canonical metadata for public routes", () => {
      process.env.NEXT_PUBLIC_SITE_URL = "https://qrazen.com";
      const meta = constructMetadata({
        title: "Dynamic QR Codes",
        description: "Test description",
        path: "/dynamic-qr",
      });

      expect(meta.title).toBe(`Dynamic QR Codes | ${SITE_CONFIG.name}`);
      expect(meta.description).toBe("Test description");
      expect(meta.alternates?.canonical).toBe("https://qrazen.com/dynamic-qr");
      expect(meta.openGraph?.url).toBe("https://qrazen.com/dynamic-qr");
      expect(meta.twitter?.card).toBe("summary_large_image");
      expect(meta.robots).toEqual({
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      });
    });

    it("constructs strict noindex, nofollow directives for private/resolver routes", () => {
      const meta = constructNoIndexMetadata("Workstation");
      expect(meta.robots).toEqual({
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
      });
    });
  });

  describe("Layer 7: Structured Data (JSON-LD) Validation", () => {
    it("builds valid Organization and SoftwareApplication nodes in knowledge graph without misleading offers", () => {
      process.env.NEXT_PUBLIC_SITE_URL = "https://qrazen.com";
      const graph = buildPlatformGraph();
      expect(graph["@context"]).toBe("https://schema.org");
      expect(graph["@graph"]).toHaveLength(3);

      const org = graph["@graph"].find((n) => n["@type"] === "Organization");
      expect(org).toBeDefined();
      expect(org?.name).toBe("QRAZEN");
      expect(org?.url).toBe("https://qrazen.com");

      const app = graph["@graph"].find((n) => n["@type"] === "SoftwareApplication");
      expect(app).toBeDefined();
      expect(app?.name).toBe("QRAZEN");
      // Must NOT contain offers until real payment integration is implemented
      expect((app as Record<string, unknown>)?.offers).toBeUndefined();
      expect(app?.featureList).toBeDefined();
      expect(app?.featureList.length).toBeGreaterThan(0);
    });

    it("builds valid FAQPage schema for AEO direct-answers", () => {
      const faqs = [
        { q: "What is a dynamic QR code?", a: "A dynamic QR code encodes a server token." },
      ];
      const schema = buildFaqSchema(faqs);
      expect(schema["@context"]).toBe("https://schema.org");
      expect(schema["@type"]).toBe("FAQPage");
      expect(schema.mainEntity[0].name).toBe("What is a dynamic QR code?");
      expect(schema.mainEntity[0].acceptedAnswer.text).toBe("A dynamic QR code encodes a server token.");
    });

    it("builds valid BreadcrumbList schema", () => {
      process.env.NEXT_PUBLIC_SITE_URL = "https://qrazen.com";
      const schema = buildBreadcrumbSchema([
        { name: "Home", item: "/" },
        { name: "PDF QR", item: "/pdf-qr" },
      ]);
      expect(schema["@type"]).toBe("BreadcrumbList");
      expect(schema.itemListElement[1].item).toBe("https://qrazen.com/pdf-qr");
    });
  });

  describe("Layer 1 & 8: Sitemap & Robots Alignment", () => {
    it("generates sitemap with only verified public capability routes", () => {
      process.env.NEXT_PUBLIC_SITE_URL = "https://qrazen.com";
      const entries = sitemap();
      const urls = entries.map((e) => e.url);

      expect(urls).toContain("https://qrazen.com");
      expect(urls).toContain("https://qrazen.com/dynamic-qr");
      expect(urls).toContain("https://qrazen.com/pdf-qr");
      expect(urls).toContain("https://qrazen.com/image-qr");
      expect(urls).toContain("https://qrazen.com/multi-file-qr");
      expect(urls).toContain("https://qrazen.com/security");
      expect(urls).toContain("https://qrazen.com/faq");
      expect(urls).toContain("https://qrazen.com/learn");
      expect(urls).toContain("https://qrazen.com/learn/dynamic-vs-static-qr-codes");
      expect(urls).toContain("https://qrazen.com/learn/qr-code-print-size-guide");
      expect(urls).toContain("https://qrazen.com/learn/qr-code-error-correction");
      expect(urls).toContain("https://qrazen.com/learn/multiple-files-qr-code");

      // CRITICAL PRIVACY CHECKS: No private/user zones in sitemap!
      expect(urls).not.toContain("https://qrazen.com/login");
      expect(urls).not.toContain("https://qrazen.com/signup");
      expect(urls).not.toContain("https://qrazen.com/dashboard");
      expect(urls.some((u) => u.includes("/r/"))).toBe(false);
    });

    it("configures robots.txt to strictly disallow /r/*, /dashboard/*, /api/*, /login, /signup", () => {
      process.env.NEXT_PUBLIC_SITE_URL = "https://qrazen.com";
      const config = robots();
      expect(config.sitemap).toBe("https://qrazen.com/sitemap.xml");

      const rule = Array.isArray(config.rules) ? config.rules[0] : config.rules;
      expect(rule?.disallow).toContain("/r/*");
      expect(rule?.disallow).toContain("/dashboard");
      expect(rule?.disallow).toContain("/dashboard/*");
      expect(rule?.disallow).toContain("/api/*");
      expect(rule?.disallow).toContain("/login");
      expect(rule?.disallow).toContain("/signup");
    });
  });
});
