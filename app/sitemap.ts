import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blogs";
import { BRAND } from "@/lib/brand";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/cars", "/bikes", "/services", "/guidelines", "/terms-and-conditions", "/blogs", "/about", "/faq", "/contact"];
  return [
    ...pages.map((p) => ({
      url: `${BRAND.siteUrl}${p}`,
      changeFrequency: "weekly" as const,
      priority: p === "" ? 1 : 0.8,
    })),
    ...blogPosts.map((p) => ({ url: `${BRAND.siteUrl}/blogs/${p.slug}`, changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
