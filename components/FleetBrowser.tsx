"use client";

import { useMemo, useState } from "react";
import { CARS, type Car } from "@/lib/cars";
import BookingDialog from "./BookingDialog";
import VehicleCard from "./VehicleCard";

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
              <VehicleCard
                key={car.id}
                vehicle={car}
                number={CARS.indexOf(car) + 1}
                specs={[["Gearbox", car.transmission], ["Seats", car.seats], ["Fuel", car.fuel]]}
                priority={i < 3}
                onReserve={() => setBooking(car)}
              />
            ))}
          </ul>
        )}
      </section>

      <BookingDialog vehicle={booking} onClose={() => setBooking(null)} />
    </>
  );
}
