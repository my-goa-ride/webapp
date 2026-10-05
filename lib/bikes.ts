// Two-wheelers for rent, shown on /bikes and offered in the booking form alongside the cars.

import type { Fuel, Transmission } from "./cars";

export interface Bike {
  id: string;
  name: string;
  type: "Scooter" | "Motorcycle";
  engine: string;
  transmission: Transmission;
  fuel: Fuel;
  pricePerDay: number;
  /** Optional until a photo is added to public/images/bikes; the card shows a placeholder. */
  image?: string;
  features: string[];
}

export const BIKES: Bike[] = [
  { id: "honda-activa", name: "Honda Activa", type: "Scooter", engine: "110cc", transmission: "Automatic", fuel: "Petrol", pricePerDay: 600, image: "/images/bikes/activa.webp", features: ["1 helmet free", "Gearless", "Under-seat storage"] },
  { id: "yamaha-fascino", name: "Yamaha Fascino", type: "Scooter", engine: "125cc", transmission: "Automatic", fuel: "Petrol", pricePerDay: 600, image: "/images/bikes/fascino.webp", features: ["1 helmet free", "Gearless", "Light and easy to handle"] },
];

export function getBike(id: string) {
  return BIKES.find((b) => b.id === id);
}
