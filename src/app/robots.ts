import { MetadataRoute } from "next";
import { getBaseUrl } from "@/lib/seo/site";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/dynamic-qr",
          "/pdf-qr",
          "/image-qr",
          "/multi-file-qr",
          "/security",
          "/faq",
          "/learn",
          "/learn/*",
          "/legal/aup",
          "/legal/privacy",
        ],
        disallow: [
          "/dashboard",
          "/dashboard/*",
          "/api/*",
          "/r/*",
          "/login",
          "/signup",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
