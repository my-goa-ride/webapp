// Page metadata in one shape: a canonical URL, a share preview (Open Graph and X/Twitter)
// and the title template. Child metadata replaces the parent's `openGraph` object outright
// rather than merging it, so every page goes through here to keep siteName, locale and the
// share image.

import type { Metadata } from "next";
import { BRAND } from "./brand";

export interface ShareImage {
  url: string;
  width: number;
  height: number;
  alt: string;
}

// Share images are JPEGs (WhatsApp previews WebP unreliably), made by `npm run og`.
export const DEFAULT_SHARE_IMAGE: ShareImage = {
  url: "/og/default.jpg",
  width: 1200,
  height: 630,
  alt: `${BRAND.name}: self-drive car rental in Goa`,
};

export const shareImage = (url: string, alt: string): ShareImage => ({ url, width: 1200, height: 630, alt });

interface PageMetaInput {
  title: string;
  description: string;
  /** The page's own path, e.g. "/cars/mahindra-thar". Becomes the canonical URL. */
  path: string;
  image?: ShareImage;
  /** Use the title as-is, without the "| MyGoaRide" suffix. */
  absoluteTitle?: boolean;
  article?: { publishedTime: string; authors: string[] };
}

export function pageMeta({ title, description, path, image = DEFAULT_SHARE_IMAGE, absoluteTitle, article }: PageMetaInput): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${BRAND.name}`;
  const base = { siteName: BRAND.name, locale: "en_IN", url: path, title: fullTitle, description, images: [image] };
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: article ? { ...base, type: "article", ...article } : { ...base, type: "website" },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [image.url] },
  };
}

export const absoluteUrl = (path: string) => new URL(path, BRAND.siteUrl).toString();

/** BreadcrumbList structured data from [name, path] pairs, home first. */
export function breadcrumbs(items: [name: string, path: string][]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(([name, path], i) => ({ "@type": "ListItem", position: i + 1, name, item: absoluteUrl(path) })),
  };
}

// The business's @id, so other structured data can point at it instead of repeating it.
export const BUSINESS_ID = `${BRAND.siteUrl}/#business`;
