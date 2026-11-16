import type { Metadata, Viewport } from "next";
import { Archivo, Instrument_Sans } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ScrollTop from "@/components/ScrollTop";
import WhatsAppFab from "@/components/WhatsAppFab";
import { ReserveDialog } from "@/components/ReserveLink";
import JsonLd from "@/components/JsonLd";
import { BRAND, directionsUrl } from "@/lib/brand";
import { CARS } from "@/lib/cars";
import { BUSINESS_ID, DEFAULT_SHARE_IMAGE } from "@/lib/seo";
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
  openGraph: { siteName: BRAND.name, type: "website", locale: "en_IN", images: [DEFAULT_SHARE_IMAGE] },
  twitter: { card: "summary_large_image", images: [DEFAULT_SHARE_IMAGE.url] },
};

const prices = CARS.map((c) => c.pricePerDay);

const localBusiness = {
  "@context": "https://schema.org",
  "@type": "AutoRental",
  "@id": BUSINESS_ID,
  name: BRAND.legalName,
  alternateName: BRAND.name,
  description: BRAND.description,
  url: BRAND.siteUrl,
  logo: `${BRAND.siteUrl}/brand/logo.png`,
  image: `${BRAND.siteUrl}/brand/logo.png`,
  telephone: BRAND.phoneHref,
  email: BRAND.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: BRAND.address.street,
    addressLocality: BRAND.address.locality,
    addressRegion: "Goa",
    postalCode: BRAND.address.postalCode,
    addressCountry: BRAND.address.country,
  },
  geo: { "@type": "GeoCoordinates", latitude: BRAND.geo.lat, longitude: BRAND.geo.lng },
  hasMap: directionsUrl,
  areaServed: { "@type": "State", name: "Goa" },
  currenciesAccepted: "INR",
  paymentAccepted: "Cash, UPI, Credit Card, Debit Card",
  priceRange: `₹${Math.min(...prices).toLocaleString("en-IN")}–₹${Math.max(...prices).toLocaleString("en-IN")} per day`,
};

const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: BRAND.name,
  url: BRAND.siteUrl,
  publisher: { "@id": BUSINESS_ID },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" data-scroll-behavior="smooth" className={`${display.variable} ${sans.variable}`}>
      <body id="top">
        <JsonLd data={[localBusiness, website]} />
        <a className="skip" href="#main">Skip to content</a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <div className="corner">
          <ScrollTop />
          <WhatsAppFab />
        </div>
        <ReserveDialog />
      </body>
    </html>
  );
}
