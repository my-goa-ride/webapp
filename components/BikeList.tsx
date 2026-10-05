"use client";

import { useState } from "react";
import { BIKES, type Bike } from "@/lib/bikes";
import BookingDialog from "./BookingDialog";
import VehicleCard from "./VehicleCard";

// The bikes are few, so unlike the car fleet there are no filters: just the grid.
export default function BikeList() {
  const [booking, setBooking] = useState<Bike | null>(null);

  return (
    <>
      <section className="fleet wrap" aria-label="Bikes">
        <ul className="fleet-grid">
          {BIKES.map((bike, i) => (
            <VehicleCard
              key={bike.id}
              vehicle={bike}
              number={i + 1}
              specs={[["Engine", bike.engine], ["Gearbox", bike.transmission], ["Fuel", bike.fuel]]}
              priority={i < 3}
              onReserve={() => setBooking(bike)}
            />
          ))}
        </ul>
      </section>

      <BookingDialog vehicle={booking} onClose={() => setBooking(null)} />
    </>
  );
}
