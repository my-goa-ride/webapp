import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import FleetBrowser from "@/components/FleetBrowser";
import JsonLd from "@/components/JsonLd";
import PageHead from "@/components/PageHead";
import WhatsAppNote from "@/components/WhatsAppNote";
import { BRAND, POLICY } from "@/lib/brand";
import { CARS, formatPrice } from "@/lib/cars";
import { time12 } from "@/lib/dates";
import { LOCALITIES, deliveryLine, getLocality } from "@/lib/locations";
import { BUSINESS_ID, absoluteUrl, breadcrumbs, pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return LOCALITIES.map((l) => ({ slug: l.slug }));
}

export const dynamicParams = false;

const FROM = formatPrice(Math.min(...CARS.map((c) => c.pricePerDay)));

export async function generateMetadata({ params }: PageProps<"/car-rental/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const place = getLocality(slug);
  if (!place) return {};
  return pageMeta({
    title: `Self-drive car rental in ${place.name}, Goa, from ${FROM}/day`,
    description: `Rent a self-drive car in ${place.name}. ${deliveryLine(place)} Choose from ${CARS.length} cars, from ${FROM} a day, insurance and taxes included.`,
    path: `/car-rental/${place.slug}`,
  });
}

export default async function LocalityPage({ params }: PageProps<"/car-rental/[slug]">) {
  const { slug } = await params;
  const place = getLocality(slug);
  if (!place) notFound();

  const path = `/car-rental/${place.slug}`;
  const nearby = LOCALITIES.filter((l) => l.area === place.area && l.slug !== place.slug);
  const facts: [string, string][] = [
    ["Cars available", `${CARS.length}`],
    ["Prices from", `${FROM} / day`],
    ["Minimum rental", `${POLICY.minDays} days`],
    ["Refundable deposit", POLICY.deposit],
    ["Return by", `${time12(POLICY.returnBy)} on the last day`],
  ];

  return (
    <div className="page">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            serviceType: "Self-drive car rental",
            name: `Car rental in ${place.name}`,
            url: absoluteUrl(path),
            provider: { "@id": BUSINESS_ID },
            areaServed: { "@type": "Place", name: `${place.name}, Goa` },
            offers: { "@type": "AggregateOffer", priceCurrency: "INR", lowPrice: Math.min(...CARS.map((c) => c.pricePerDay)), highPrice: Math.max(...CARS.map((c) => c.pricePerDay)), offerCount: CARS.length },
          },
          breadcrumbs([["Home", "/"], ["Cars", "/cars"], [`Car rental in ${place.name}`, path]]),
        ]}
      />

      <PageHead
        label={`${place.area} · Car rental in ${place.name}`}
        title="Self-drive cars in"
        italic={`${place.name}.`}
        intro={
          <>
            {deliveryLine(place)} Insurance and taxes included; no hidden fees.
            <WhatsAppNote noun="car" />
          </>
        }
      />

      <section className="wrap sec-tight place-intro" aria-label={`About renting a car in ${place.name}`}>
        <p className="lede">{place.about}</p>
        <dl className="facts">
          {facts.map(([k, v]) => (
            <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
          ))}
        </dl>
      </section>

      <FleetBrowser />

      <section className="wrap sec place-nearby" aria-labelledby="nearby-title">
        <h2 id="nearby-title" className="display">We also deliver nearby in {place.area}</h2>
        <ul className="chips">
          {nearby.map((l) => (
            <li key={l.slug}><Link className="chip" href={`/car-rental/${l.slug}`}>{l.name}</Link></li>
          ))}
        </ul>
        <p className="muted">
          Questions about delivery to {place.name}? See the <Link className="ul" href="/faq">FAQ</Link> or{" "}
          <Link className="ul" href="/contact">contact {BRAND.name}</Link>.
        </p>
      </section>
    </div>
  );
}
