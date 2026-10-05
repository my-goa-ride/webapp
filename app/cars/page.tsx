import type { Metadata } from "next";
import FleetBrowser from "@/components/FleetBrowser";
import PageHead from "@/components/PageHead";
import WhatsAppNote from "@/components/WhatsAppNote";
import { BRAND } from "@/lib/brand";
import { CARS, getCar } from "@/lib/cars";

const titleCase = (s: string) => s.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

export async function generateMetadata({ searchParams }: PageProps<"/cars">): Promise<Metadata> {
  const { model, location } = await searchParams;
  const car = typeof model === "string" ? getCar(model) : undefined;
  if (car) {
    return {
      title: `Rent a ${car.name} in Goa`,
      description: `Rent the ${car.name} in Goa with doorstep delivery and no hidden fees. Book your self-drive ${car.name} with ${BRAND.name}.`,
    };
  }
  if (typeof location === "string") {
    const place = titleCase(location);
    return {
      title: `Car rental in ${place}, Goa`,
      description: `Self-drive cars delivered in ${place}. Choose from ${CARS.length} cars with ${BRAND.name}.`,
    };
  }
  return {
    title: "The fleet",
    description: `Browse all ${CARS.length} self-drive cars available in Goa. Insurance and taxes included, no hidden fees.`,
  };
}

export default async function CarsPage({ searchParams }: PageProps<"/cars">) {
  const { model, location } = await searchParams;
  const car = typeof model === "string" ? getCar(model) : undefined;
  const place = typeof location === "string" ? titleCase(location) : null;

  return (
    <div className="page">
      <PageHead
        label={place ? `Car rental in ${place}` : `${CARS.length} cars`}
        title="The"
        italic="fleet."
        intro={
          <>
            {place
              ? `Every car below can be delivered to ${place}. Insurance and taxes included; no hidden fees.`
              : "Insurance and taxes included. No hidden fees. Delivered to your villa, hotel or the airport."}
            <WhatsAppNote noun="car" />
          </>
        }
      />
      <FleetBrowser initialQuery={car?.name ?? ""} />
    </div>
  );
}
