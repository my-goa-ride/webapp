"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { BRAND, telHref, whatsappUrl } from "@/lib/brand";
import { CARS, formatPrice, type Car } from "@/lib/cars";
import { splitLast } from "@/lib/format";
import BookingDialog from "./BookingDialog";

const TYPES = ["All", ...Array.from(new Set(CARS.map((c) => c.type)))];
const GEARBOX = ["All", "Automatic", "Manual"];
const FUELS = ["All", ...Array.from(new Set(CARS.map((c) => c.fuel)))];

function Chips({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="filter" role="group" aria-label={label}>
      <span className="label muted">{label}</span>
      <div className="chips">
        {options.map((o) => (
          <button key={o} type="button" className={o === value ? "chip on" : "chip"} aria-pressed={o === value} onClick={() => onChange(o)}>
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

// "Mahindra Thar" -> Mahindra <em>Thar</em>, the design's headline treatment.
function CarName({ name }: { name: string }) {
  const [head, last] = splitLast(name);
  return (
    <>
      {head} <em className="ital">{last}</em>
    </>
  );
}

export default function FleetBrowser({ initialQuery = "" }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [type, setType] = useState("All");
  const [gearbox, setGearbox] = useState("All");
  const [fuel, setFuel] = useState("All");
  const [seats, setSeats] = useState(0);
  const [sort, setSort] = useState("recommended");
  const [booking, setBooking] = useState<Car | null>(null);

  const cars = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = CARS.filter(
      (c) =>
        (!q || c.name.toLowerCase().includes(q)) &&
        (type === "All" || c.type === type) &&
        (gearbox === "All" || c.transmission === gearbox) &&
        (fuel === "All" || c.fuel === fuel) &&
        c.seats >= seats,
    );
    if (sort === "price-low") return [...list].sort((a, b) => a.pricePerDay - b.pricePerDay);
    if (sort === "price-high") return [...list].sort((a, b) => b.pricePerDay - a.pricePerDay);
    return list;
  }, [query, type, gearbox, fuel, seats, sort]);

  const reset = () => {
    setQuery("");
    setType("All");
    setGearbox("All");
    setFuel("All");
    setSeats(0);
  };

  return (
    <>
      <section className="filters wrap" aria-label="Filter the fleet">
        <div className="filters-top">
          <div className="field search">
            <label className="label muted" htmlFor="fleet-search">Search</label>
            <input id="fleet-search" className="inp-light" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Thar, Innova, Swift…" />
          </div>
          <div className="field">
            <label className="label muted" htmlFor="fleet-seats">Seats</label>
            <select id="fleet-seats" className="inp-light" value={seats} onChange={(e) => setSeats(Number(e.target.value))}>
              <option value={0}>Any</option>
              <option value={5}>5 or more</option>
              <option value={6}>6 or more</option>
              <option value={7}>7</option>
            </select>
          </div>
          <div className="field">
            <label className="label muted" htmlFor="fleet-sort">Sort</label>
            <select id="fleet-sort" className="inp-light" value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="recommended">Recommended</option>
              <option value="price-low">Price, low to high</option>
              <option value="price-high">Price, high to low</option>
            </select>
          </div>
        </div>
        <div className="filters-chips">
          <Chips label="Type" options={TYPES} value={type} onChange={setType} />
          <Chips label="Gearbox" options={GEARBOX} value={gearbox} onChange={setGearbox} />
          <Chips label="Fuel" options={FUELS} value={fuel} onChange={setFuel} />
        </div>
        <div className="filters-foot">
          <p className="label" aria-live="polite">
            {cars.length} {cars.length === 1 ? "car" : "cars"} available
          </p>
          <button type="button" className="ul label link-btn" onClick={reset}>
            Reset filters
          </button>
        </div>
      </section>

      <section className="fleet wrap" aria-label="Cars">
        {cars.length === 0 ? (
          <div className="empty">
            <p className="display">No car matches all of that.</p>
            <button type="button" className="btn btn-ghost" onClick={reset}>Reset filters</button>
          </div>
        ) : (
          <ul className="fleet-grid">
            {cars.map((car, i) => (
              <li key={car.id} className="car rv">
                <div className="car-ph">
                  <Image src={car.image} alt={car.name} fill sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw" priority={i < 3} />
                </div>
                <div className="car-meta label muted">
                  <span>No. {String(CARS.indexOf(car) + 1).padStart(2, "0")}</span>
                  <span>{car.type}</span>
                </div>
                <h3 className="display"><CarName name={car.name} /></h3>
                <dl>
                  <dt>Gearbox</dt><dd>{car.transmission}</dd>
                  <dt>Seats</dt><dd>{car.seats}</dd>
                  <dt>Fuel</dt><dd>{car.fuel}</dd>
                </dl>
                <p className="feat muted">{car.features.join(" · ")}</p>
                <div className="car-foot">
                  <p className="price">
                    <span className="display">{formatPrice(car.pricePerDay)}</span> <span className="muted">/ day</span>
                  </p>
                  <button type="button" className="btn" onClick={() => setBooking(car)} aria-label={`Reserve the ${car.name}`}>
                    Reserve
                  </button>
                </div>
                <div className="car-links label">
                  <a className="ul" href={whatsappUrl(`Hi ${BRAND.name}! I'd like to book the ${car.name}.`)} target="_blank" rel="noopener noreferrer" aria-label={`Ask about the ${car.name} on WhatsApp`}>
                    WhatsApp
                  </a>
                  <a className="ul" href={telHref} aria-label={`Call to book the ${car.name}`}>Call</a>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <BookingDialog car={booking} onClose={() => setBooking(null)} />
    </>
  );
}
