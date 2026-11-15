import type { MetadataRoute } from "next";
import { blogPosts, postDate } from "@/lib/blogs";
import { BRAND } from "@/lib/brand";
import { CARS } from "@/lib/cars";
import { LOCALITIES } from "@/lib/locations";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (p: string) => `${BRAND.siteUrl}${p}`;
  const pages = ["", "/cars", "/bikes", "/services", "/guidelines", "/terms-and-conditions", "/blogs", "/about", "/faq", "/contact"];
  return [
    ...pages.map((p) => ({ url: url(p), changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.8 })),
    ...CARS.map((c) => ({ url: url(`/cars/${c.id}`), changeFrequency: "weekly" as const, priority: 0.7, images: [url(c.image)] })),
    ...LOCALITIES.map((l) => ({ url: url(`/car-rental/${l.slug}`), changeFrequency: "monthly" as const, priority: 0.7 })),
    ...blogPosts.map((p) => ({ url: url(`/blogs/${p.slug}`), lastModified: postDate(p), changeFrequency: "monthly" as const, priority: 0.6, images: [url(p.image)] })),
  ];
}
