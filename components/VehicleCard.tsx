import { Fragment } from "react";
import Image from "next/image";
import { BRAND, telHref, whatsappUrl } from "@/lib/brand";
import type { Bike } from "@/lib/bikes";
import { formatPrice, type Car } from "@/lib/cars";
import { listNum, splitLast } from "@/lib/format";
import { WhatsApp } from "./icons";

// "Mahindra Thar" -> Mahindra <em>Thar</em>, the design's headline treatment.
function VehicleName({ name }: { name: string }) {
  const [head, last] = splitLast(name);
  return (
    <>
      {head} <em className="ital">{last}</em>
    </>
  );
}

interface Props {
  vehicle: Car | Bike;
  /** Its place in the full list, shown as "No. 01". */
  number: number;
  specs: [label: string, value: React.ReactNode][];
  priority?: boolean;
  onReserve: () => void;
}

// One card in the fleet grid, used for both cars and bikes.
export default function VehicleCard({ vehicle: v, number, specs, priority, onReserve }: Props) {
  return (
    <li className="car rv">
      <div className="car-ph">
        {v.image ? (
          <Image src={v.image} alt={v.name} fill sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw" priority={priority} />
        ) : (
          <span className="ph-none label muted">Photo coming soon</span>
        )}
      </div>
      <div className="car-meta label muted">
        <span>No. {listNum(number)}</span>
        <span>{v.type}</span>
      </div>
      <h3 className="display"><VehicleName name={v.name} /></h3>
      <dl>
        {specs.map(([label, value]) => (
          <Fragment key={label}>
            <dt>{label}</dt><dd>{value}</dd>
          </Fragment>
        ))}
      </dl>
      <p className="feat muted">{v.features.join(" · ")}</p>
      <div className="car-foot">
        <p className="price">
          <span className="display">{formatPrice(v.pricePerDay)}</span> <span className="muted">/ day</span>
        </p>
        <button type="button" className="btn" onClick={onReserve} aria-label={`Reserve the ${v.name}`}>
          Reserve
        </button>
      </div>
      <div className="car-links label">
        <a className="wa-pill" href={whatsappUrl(`Hi ${BRAND.name}! I'd like to book the ${v.name}.`)} target="_blank" rel="noopener noreferrer" aria-label={`Book the ${v.name} on WhatsApp`}>
          <WhatsApp size={14} /> WhatsApp
        </a>
        <a className="ul" href={telHref} aria-label={`Call to book the ${v.name}`}>Or call</a>
      </div>
    </li>
  );
}
