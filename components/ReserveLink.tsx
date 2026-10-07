"use client";

import { useEffect, useState } from "react";
import BookingDialog from "./BookingDialog";
import { ANY_CAR, RESERVE_EVENT } from "./BookingForm";
import { Arrow } from "./icons";

// Opens the site-wide booking dialog with this car picked (or any car). Without
// JavaScript it still works as a plain link to `href`.
export default function ReserveLink({
  carId = ANY_CAR,
  carName,
  href = "#reserve",
  className = "ul on",
  arrow = true,
  onOpen,
  children = "Reserve this car",
}: {
  carId?: string;
  carName?: string;
  href?: string;
  className?: string;
  arrow?: boolean;
  /** Called as the dialog opens, e.g. to close the mobile menu. */
  onOpen?: () => void;
  children?: React.ReactNode;
}) {
  return (
    <a
      className={className}
      href={href}
      onClick={(e) => {
        e.preventDefault();
        onOpen?.();
        window.dispatchEvent(new CustomEvent(RESERVE_EVENT, { detail: carId }));
      }}
      aria-label={carName ? `Reserve the ${carName}` : undefined}
    >
      {children}
      {arrow && <> <Arrow /></>}
    </a>
  );
}

// The booking dialog every ReserveLink opens; mounted once, in the root layout.
export function ReserveDialog() {
  const [vehicle, setVehicle] = useState<{ id: string } | null>(null);

  useEffect(() => {
    const open = (e: Event) => setVehicle({ id: (e as CustomEvent<string>).detail });
    window.addEventListener(RESERVE_EVENT, open);
    return () => window.removeEventListener(RESERVE_EVENT, open);
  }, []);

  return <BookingDialog vehicle={vehicle} onClose={() => setVehicle(null)} />;
}
