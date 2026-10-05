// Cars and bikes share the booking form, dialog and enquiry; this looks either up by id.

import { getBike, type Bike } from "./bikes";
import { getCar, type Car } from "./cars";

export type Vehicle = (Car & { kind: "car" }) | (Bike & { kind: "bike" });

export function getVehicle(id: string): Vehicle | undefined {
  const car = getCar(id);
  if (car) return { ...car, kind: "car" };
  const bike = getBike(id);
  return bike && { ...bike, kind: "bike" };
}
