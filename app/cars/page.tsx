import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import FleetBrowser from "@/components/FleetBrowser";
import PageHead from "@/components/PageHead";
import WhatsAppNote from "@/components/WhatsAppNote";
import { CARS, formatPrice, getCar } from "@/lib/cars";
import { getLocality } from "@/lib/locations";
import { pageMeta } from "@/lib/seo";

const FROM = formatPrice(Math.min(...CARS.map((c) => c.pricePerDay)));

export const metadata: Metadata = pageMeta({
  title: `Self-drive cars for rent in Goa, from ${FROM}/day`,
  description: `Browse all ${CARS.length} self-drive cars for rent in Goa: hatchbacks, SUVs, 7-seaters and the Thar, from ${FROM} a day. Insurance and taxes included, no hidden fees.`,
  path: "/cars",
});

// The old filter links (/cars?model=… and /cars?location=…) now have pages of their own.
// Old Madgaon and Thivim links pointed at the towns' names; their pages are the stations.
const OLD_LOCATIONS: Record<string, string> = { madgaon: "madgaon-station", thivim: "thivim-station" };

export default async function CarsPage({ searchParams }: PageProps<"/cars">) {
  const { model, location } = await searchParams;
  if (typeof model === "string" && getCar(model)) permanentRedirect(`/cars/${model}`);
  if (typeof location === "string") {
    const slug = OLD_LOCATIONS[location] ?? location;
    if (getLocality(slug)) permanentRedirect(`/car-rental/${slug}`);
  }

  return (
    <div className="page">
      <PageHead
        label={`${CARS.length} self-drive cars for rent in Goa`}
        title="The"
        italic="fleet."
        intro={
          <>
            Insurance and taxes included. No hidden fees. Delivered to your villa, hotel or the airport.
            <WhatsAppNote noun="car" />
          </>
        }
      />
      <FleetBrowser />
    </div>
  );
}
