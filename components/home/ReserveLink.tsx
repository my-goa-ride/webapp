"use client";

import { RESERVE_EVENT } from "../BookingForm";
import { Arrow } from "../icons";

// Jumps to the reserve form and preselects this car in it.
export default function ReserveLink({ carId, carName }: { carId: string; carName: string }) {
  return (
    <a
      className="ul label act on"
      href="#reserve"
      onClick={() => window.dispatchEvent(new CustomEvent(RESERVE_EVENT, { detail: carId }))}
      aria-label={`Reserve the ${carName}`}
    >
      Reserve this car <Arrow />
    </a>
  );
}
