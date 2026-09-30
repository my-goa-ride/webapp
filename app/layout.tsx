import type { Metadata, Viewport } from "next";
import { Archivo, Instrument_Sans } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { BRAND } from "@/lib/brand";
import "./globals.css";
import "./pages.css";

const display = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-display",
});

const sans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#efebe4",
};

export const metadata: Metadata = {
  metadataBase: new URL(BRAND.siteUrl),
  title: {
    template: `%s | ${BRAND.name}`,
    default: `${BRAND.name} | Self-drive car rental in Goa`,
  },
  description: BRAND.description,
  openGraph: { siteName: BRAND.name, type: "website", locale: "en_IN" },
};

const localBusiness = {
  "@context": "https://schema.org",
  "@type": "AutoRental",
  name: BRAND.legalName,
  url: BRAND.siteUrl,
  telephone: BRAND.phoneHref,
  email: BRAND.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: BRAND.address.street,
    addressLocality: BRAND.address.locality,
    postalCode: BRAND.address.postalCode,
    addressCountry: BRAND.address.country,
  },
  priceRange: "₹₹",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" data-scroll-behavior="smooth" className={`${display.variable} ${sans.variable}`}>
      <body id="top">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
        <a className="skip" href="#main">Skip to content</a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
