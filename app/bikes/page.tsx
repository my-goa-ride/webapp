import type { Metadata } from "next";
import Link from "next/link";
import BikeList from "@/components/BikeList";
import PageHead from "@/components/PageHead";
import WhatsAppNote from "@/components/WhatsAppNote";
import { Arrow } from "@/components/icons";
import { BIKE_POLICY, BRAND, POLICY } from "@/lib/brand";
import { time12 } from "@/lib/dates";
import { BIKES } from "@/lib/bikes";
import { listNum } from "@/lib/format";
import { pageMeta } from "@/lib/seo";

const ESSENTIALS = [
  { title: "Licence and age", text: `A valid two-wheeler licence (MCWOG or MCWG) and a photo ID. Riders must be ${BIKE_POLICY.minAge} or older.` },
  { title: "Deposit and minimum", text: `A minimum rental of ${BIKE_POLICY.minDays} days, and a refundable deposit of ${BIKE_POLICY.deposit} taken at handover. Return by ${time12(POLICY.returnBy)} on the last day, or that day is charged as well.` },
  { title: "Helmets", text: "One helmet comes free with every bike. Helmets are compulsory for the rider and any pillion, so ask us if you need a second." },
];

export const metadata: Metadata = pageMeta({
  title: "Scooter and bike rental in Goa",
  description: `Rent a scooter or bike in Goa with ${BRAND.name}. Helmet included, delivered to your villa, hotel or the airport, with no hidden fees.`,
  path: "/bikes",
});

export default function BikesPage() {
  return (
    <div className="page">
      <PageHead
        label={`${BIKES.length} ${BIKES.length === 1 ? "bike" : "bikes"}`}
        title="On two"
        italic="wheels."
        intro={
          <>
            For beach hopping, narrow village lanes and parking anywhere. Delivered to your villa, hotel or the airport.
            <WhatsAppNote noun="bike" />
          </>
        }
      />
      <BikeList />

      <section className="sec tone wrap" aria-labelledby="ride-title">
        <div className="sec-head">
          <span className="label rv">Before you ride</span>
          <h2 id="ride-title" className="display rv">
            Three things to <em className="ital">know.</em>
          </h2>
          <Link className="ul label on more rv" href="/faq#bikes">
            Bike FAQ <Arrow />
          </Link>
        </div>
        <ul className="grid-3">
          {ESSENTIALS.map((e, i) => (
            <li key={e.title} className="rv">
              <span className="num display ital">{listNum(i + 1)}</span>
              <h3 className="display">{e.title}</h3>
              <p>{e.text}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
