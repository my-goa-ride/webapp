"use client";

import { useEffect, useRef, useState } from "react";
import type { Bike } from "@/lib/bikes";
import { formatPrice, type Car } from "@/lib/cars";
import { getVehicle } from "@/lib/vehicles";
import BookingForm from "./BookingForm";
import { Close } from "./icons";

export default function BookingDialog({ vehicle, onClose }: { vehicle: Car | Bike | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  // The vehicle picked inside the form, remembered against the card that opened the dialog,
  // so the title follows the picker and resets when another card is opened.
  const [picked, setPicked] = useState<{ from: string; id: string } | null>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (vehicle && !d.open) d.showModal();
    if (!vehicle && d.open) d.close();
  }, [vehicle]);

  const currentId = vehicle && picked?.from === vehicle.id ? picked.id : vehicle?.id;
  const current = currentId ? getVehicle(currentId) : undefined;

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
              <span className="label lbl">
                {current ? `${current.type} · ${formatPrice(current.pricePerDay)} / day` : "Any available car"}
              </span>
              <h2 id="booking-title" className="display">
                {current ? <>Reserve the <em className="ital">{current.name}.</em></> : <>Reserve <em className="ital">a car.</em></>}
              </h2>
            </div>
            <button type="button" className="x" onClick={() => ref.current?.close()} aria-label="Close">
              <Close />
            </button>
          </div>
          <BookingForm
            key={vehicle.id}
            defaultCarId={vehicle.id}
            idPrefix="dlg"
            onVehicleChange={(id) => setPicked({ from: vehicle.id, id })}
          />
        </div>
      )}
    </dialog>
  );
}
