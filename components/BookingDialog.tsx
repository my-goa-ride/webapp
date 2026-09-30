"use client";

import { useEffect, useRef } from "react";
import { formatPrice, type Car } from "@/lib/cars";
import BookingForm from "./BookingForm";
import { Close } from "./icons";

export default function BookingDialog({ car, onClose }: { car: Car | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (car && !d.open) d.showModal();
    if (!car && d.open) d.close();
  }, [car]);

  return (
    <dialog
      ref={ref}
      className="sheet"
      aria-labelledby="booking-title"
      onClose={onClose}
      // A click on the backdrop lands on the dialog element itself.
      onClick={(e) => e.target === e.currentTarget && e.currentTarget.close()}
    >
      {car && (
        <div className="sheet-in">
          <div className="sheet-top">
            <div>
              <span className="label lbl">{car.type} · {formatPrice(car.pricePerDay)} / day</span>
              <h2 id="booking-title" className="display">
                Reserve the <em className="ital">{car.name}.</em>
              </h2>
            </div>
            <button type="button" className="x" onClick={() => ref.current?.close()} aria-label="Close">
              <Close />
            </button>
          </div>
          <BookingForm key={car.id} defaultCarId={car.id} idPrefix="dlg" />
        </div>
      )}
    </dialog>
  );
}
