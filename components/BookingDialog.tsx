"use client";

import { useEffect, useRef } from "react";
import type { Bike } from "@/lib/bikes";
import { formatPrice, type Car } from "@/lib/cars";
import BookingForm from "./BookingForm";
import { Close } from "./icons";

export default function BookingDialog({ vehicle, onClose }: { vehicle: Car | Bike | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (vehicle && !d.open) d.showModal();
    if (!vehicle && d.open) d.close();
  }, [vehicle]);

  return (
    <dialog
      ref={ref}
      className="sheet"
      aria-labelledby="booking-title"
      onClose={onClose}
      // A click on the backdrop lands on the dialog element itself.
      onClick={(e) => e.target === e.currentTarget && e.currentTarget.close()}
    >
      {vehicle && (
        <div className="sheet-in">
          <div className="sheet-top">
            <div>
              <span className="label lbl">{vehicle.type} · {formatPrice(vehicle.pricePerDay)} / day</span>
              <h2 id="booking-title" className="display">
                Reserve the <em className="ital">{vehicle.name}.</em>
              </h2>
            </div>
            <button type="button" className="x" onClick={() => ref.current?.close()} aria-label="Close">
              <Close />
            </button>
          </div>
          <BookingForm key={vehicle.id} defaultCarId={vehicle.id} idPrefix="dlg" />
        </div>
      )}
    </dialog>
  );
}
