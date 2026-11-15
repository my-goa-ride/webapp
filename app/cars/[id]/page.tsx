import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import ReserveLink from "@/components/ReserveLink";
import { WhatsApp } from "@/components/icons";
import { BRAND, POLICY, telHref, whatsappUrl } from "@/lib/brand";
import { CARS, formatPrice, getCar, type Car } from "@/lib/cars";
import { time12 } from "@/lib/dates";
import { splitLast } from "@/lib/format";
import { LOCALITIES } from "@/lib/locations";
import { BUSINESS_ID, absoluteUrl, breadcrumbs, pageMeta, shareImage } from "@/lib/seo";

export function generateStaticParams() {
  return CARS.map((c) => ({ id: c.id }));
}

export const dynamicParams = false;

const article = (c: Car) => (/^[AEIOU]/i.test(c.name) ? "an" : "a");

function summary(c: Car) {
  return `The ${c.name} is a ${c.seats}-seat ${c.type === "SUV" ? "SUV" : c.type === "Hatchback" ? "hatchback" : c.type} with a ${c.transmission.toLowerCase()} gearbox, running on ${c.fuel.toLowerCase()}.`;
}

export async function generateMetadata({ params }: PageProps<"/cars/[id]">): Promise<Metadata> {
  const { id } = await params;
  const car = getCar(id);
  if (!car) return {};
  return pageMeta({
    title: `Rent ${article(car)} ${car.name} in Goa, ${formatPrice(car.pricePerDay)}/day`,
    description: `Self-drive ${car.name} for rent in Goa at ${formatPrice(car.pricePerDay)} a day: ${car.seats} seats, ${car.transmission.toLowerCase()}, ${car.fuel.toLowerCase()}. Delivered to your villa, hotel or the airport. Insurance and taxes included.`,
    path: `/cars/${car.id}`,
    image: shareImage(`/og/cars/${car.id}.jpg`, `${car.name} for rent in Goa`),
  });
}

export default async function CarPage({ params }: PageProps<"/cars/[id]">) {
  const { id } = await params;
  const car = getCar(id);
  if (!car) notFound();

  const [head, last, tail] = splitLast(car.name);
  const similar = CARS.filter((c) => c.id !== car.id && (c.type === car.type || c.seats === car.seats))
    .sort((a, b) => Math.abs(a.pricePerDay - car.pricePerDay) - Math.abs(b.pricePerDay - car.pricePerDay))
    .slice(0, 3);
  const path = `/cars/${car.id}`;

  const facts: [string, React.ReactNode][] = [
    ["Type", car.type],
    ["Seats", car.seats],
    ["Gearbox", car.transmission],
    ["Fuel", car.fuel],
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
            "@type": "Car",
            name: car.name,
            description: summary(car),
            image: absoluteUrl(car.image),
            url: absoluteUrl(path),
            brand: { "@type": "Brand", name: car.name.split(" ")[0] },
            vehicleSeatingCapacity: car.seats,
            vehicleTransmission: car.transmission,
            fuelType: car.fuel,
            offers: {
              "@type": "Offer",
              url: absoluteUrl(path),
              priceCurrency: "INR",
              price: car.pricePerDay,
              priceSpecification: { "@type": "UnitPriceSpecification", price: car.pricePerDay, priceCurrency: "INR", unitCode: "DAY", referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "DAY" } },
              availability: "https://schema.org/InStock",
              areaServed: { "@type": "State", name: "Goa" },
              seller: { "@id": BUSINESS_ID },
            },
          },
          breadcrumbs([["Home", "/"], ["Cars", "/cars"], [car.name, path]]),
        ]}
      />

      <article className="wrap car-page">
        <nav className="crumbs label muted" aria-label="Breadcrumb">
          <Link className="ul" href="/">Home</Link> <span aria-hidden="true">/</span> <Link className="ul" href="/cars">Cars</Link>{" "}
          <span aria-hidden="true">/</span> <span aria-current="page">{car.name}</span>
        </nav>

        <div className="car-top">
          <div className="car-ph cut car-hero">
            <Image src={car.image} alt={`${car.name} for rent in Goa`} fill priority sizes="(max-width: 1024px) 100vw, 55vw" />
          </div>
          <div className="car-info">
            <span className="label muted">{car.type} · {car.transmission} · {car.fuel}</span>
            <h1 className="display">
              Rent {article(car)} {head} <em className="ital">{last}</em>{tail && ` ${tail}`} in Goa
            </h1>
            <p className="price">
              <span className="display">{formatPrice(car.pricePerDay)}</span> <span className="muted">/ day, insurance and taxes included</span>
            </p>
            <p className="muted">
              {summary(car)} We deliver it cleaned and checked to your villa, hotel, the airport or the station, anywhere in North or South Goa.
            </p>
            <div className="car-cta">
              <ReserveLink className="btn" carId={car.id} carName={car.name}>Reserve this car</ReserveLink>
              <a className="wa-pill label" href={whatsappUrl(`Hi ${BRAND.name}! I'd like to book the ${car.name}.`)} target="_blank" rel="noopener noreferrer">
                <WhatsApp size={14} /> WhatsApp
              </a>
              <a className="ul label" href={telHref}>Or call {BRAND.phone}</a>
            </div>
          </div>
        </div>

        <section className="car-detail" aria-labelledby="spec-title">
          <div>
            <h2 id="spec-title" className="display">At a glance</h2>
            <dl className="facts">
              {facts.map(([k, v]) => (
                <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
              ))}
            </dl>
          </div>
          <div>
            <h2 className="display">Features</h2>
            <ul className="bullets">
              {car.features.map((f) => <li key={f}>{f}</li>)}
            </ul>
            <p className="muted car-note">
              Fuel is gauge to gauge: return the car with the level it had at delivery. Read the full{" "}
              <Link className="ul" href="/terms-and-conditions">terms</Link> and <Link className="ul" href="/guidelines">rental guidelines</Link>.
            </p>
          </div>
        </section>

        <section className="car-places" aria-labelledby="places-title">
          <h2 id="places-title" className="display">The {car.name}, delivered across Goa</h2>
          <ul className="chips">
            {LOCALITIES.map((l) => (
              <li key={l.slug}><Link className="chip" href={`/car-rental/${l.slug}`}>{l.name}</Link></li>
            ))}
          </ul>
        </section>

        {similar.length > 0 && (
          <section className="car-similar" aria-labelledby="similar-title">
            <h2 id="similar-title" className="display">Similar cars</h2>
            <ul className="fleet-grid">
              {similar.map((c) => (
                <li key={c.id} className="car">
                  <Link href={`/cars/${c.id}`} className="car-link">
                    <div className="car-ph cut">
                      <Image src={c.image} alt={c.name} fill sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw" />
                    </div>
                    <div className="car-meta label muted"><span>{c.seats} seats · {c.transmission}</span><span>{c.type}</span></div>
                    <h3 className="display">{c.name}</h3>
                    <p className="price"><span className="display">{formatPrice(c.pricePerDay)}</span> <span className="muted">/ day</span></p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <p className="car-back">
          <Link className="ul label" href="/cars">See all {CARS.length} cars</Link>
        </p>
      </article>
    </div>
  );
}
