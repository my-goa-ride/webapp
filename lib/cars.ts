// The fleet, carried over from the existing rental site's car list (same 18 cars,
// prices and specs). Names get their make prefix and typos fixed; nothing else changed.

export type Transmission = "Automatic" | "Manual";
export type Fuel = "Petrol" | "Diesel" | "CNG" | "EV";

export interface Car {
  id: string;
  name: string;
  type: "SUV" | "Hatchback" | "MUV" | "MPV";
  transmission: Transmission;
  seats: number;
  fuel: Fuel;
  pricePerDay: number;
  image: string;
  features: string[];
}

export const CARS: Car[] = [
  { id: "mahindra-thar", name: "Mahindra Thar", type: "SUV", transmission: "Manual", seats: 4, fuel: "Petrol", pricePerDay: 2800, image: "/images/cars/thar-new.webp", features: ["2WD", "Hard Top", "Bluetooth"] },
  { id: "hyundai-creta", name: "Hyundai Creta", type: "SUV", transmission: "Manual", seats: 5, fuel: "Petrol", pricePerDay: 2500, image: "/images/cars/creta-manual.webp", features: ["Sunroof", "Reverse Camera", "Cruise Control"] },
  { id: "kia-seltos", name: "Kia Seltos", type: "SUV", transmission: "Manual", seats: 5, fuel: "Diesel", pricePerDay: 2600, image: "/images/cars/kia-seltos.webp", features: ["Ventilated Seats", "360 Camera", "Bose Sound"] },
  { id: "kia-carens", name: "Kia Carens", type: "MPV", transmission: "Manual", seats: 7, fuel: "Diesel", pricePerDay: 2700, image: "/images/cars/carens.webp", features: ["AC", "Music System", "Power Steering", "ABS"] },
  { id: "maruti-baleno", name: "Maruti Baleno", type: "Hatchback", transmission: "Manual", seats: 5, fuel: "Petrol", pricePerDay: 1500, image: "/images/cars/baleno-manual.webp", features: ["Fuel Efficient", "Touchscreen", "Keyless Entry"] },
  { id: "maruti-ertiga", name: "Maruti Ertiga", type: "MUV", transmission: "Manual", seats: 7, fuel: "Petrol", pricePerDay: 2100, image: "/images/cars/ertiga-car.webp", features: ["High Mileage", "Rear AC", "Bluetooth"] },
  { id: "maruti-ertiga-auto", name: "Maruti Ertiga Automatic", type: "MUV", transmission: "Automatic", seats: 7, fuel: "Petrol", pricePerDay: 2400, image: "/images/cars/ertiga-car.webp", features: ["High Mileage", "Rear AC", "Bluetooth"] },
  { id: "hyundai-creta-automatic", name: "Hyundai Creta Automatic", type: "SUV", transmission: "Automatic", seats: 5, fuel: "Diesel", pricePerDay: 3500, image: "/images/cars/creta-new.webp", features: ["AC", "Music System", "Power Steering", "ABS", "Sunroof"] },
  { id: "toyota-innova-crysta", name: "Toyota Innova Crysta", type: "MPV", transmission: "Automatic", seats: 7, fuel: "Diesel", pricePerDay: 3500, image: "/images/cars/crysta.webp", features: ["AC", "Music System", "Power Steering", "ABS"] },
  { id: "maruti-xl6", name: "Maruti XL6", type: "MPV", transmission: "Manual", seats: 6, fuel: "Petrol", pricePerDay: 2000, image: "/images/cars/xl6.webp", features: ["AC", "Music System", "Power Steering", "ABS"] },
  { id: "maruti-swift", name: "Maruti Swift", type: "Hatchback", transmission: "Manual", seats: 5, fuel: "Petrol", pricePerDay: 1400, image: "/images/cars/swift-white-manual.webp", features: ["AC", "Music System", "Power Steering", "ABS"] },
  { id: "maruti-swift-auto", name: "Maruti Swift Automatic", type: "Hatchback", transmission: "Automatic", seats: 5, fuel: "Petrol", pricePerDay: 1700, image: "/images/cars/swift-red-auto.webp", features: ["AC", "Music System", "Power Steering", "ABS"] },
  { id: "maruti-ignis", name: "Maruti Ignis", type: "Hatchback", transmission: "Manual", seats: 5, fuel: "Petrol", pricePerDay: 1000, image: "/images/cars/ignis.webp", features: ["AC", "Music System", "Power Steering", "ABS"] },
  { id: "maruti-ignis-auto", name: "Maruti Ignis Automatic", type: "Hatchback", transmission: "Automatic", seats: 5, fuel: "Petrol", pricePerDay: 1300, image: "/images/cars/ignis.webp", features: ["AC", "Music System", "Power Steering", "ABS"] },
  { id: "toyota-fortuner", name: "Toyota Fortuner", type: "SUV", transmission: "Automatic", seats: 7, fuel: "Diesel", pricePerDay: 6000, image: "/images/cars/fortuner.webp", features: ["AC", "Music System", "Power Steering", "ABS"] },
  { id: "toyota-fortuner-legender", name: "Toyota Fortuner Legender", type: "SUV", transmission: "Automatic", seats: 7, fuel: "Diesel", pricePerDay: 8000, image: "/images/cars/legender.webp", features: ["AC", "Music System", "Power Steering", "ABS"] },
  { id: "hyundai-exter", name: "Hyundai Exter", type: "SUV", transmission: "Automatic", seats: 5, fuel: "Petrol", pricePerDay: 2000, image: "/images/cars/exter-car.webp", features: ["Sunroof", "ABS", "Power Steering", "Music System", "AC"] },
  { id: "hyundai-venue", name: "Hyundai Venue", type: "SUV", transmission: "Automatic", seats: 5, fuel: "Petrol", pricePerDay: 2300, image: "/images/cars/venue-new.webp", features: ["Music System", "AC", "Power Steering", "ABS", "Sunroof"] },
  { id: "hyundai-alcazar", name: "Hyundai Alcazar", type: "SUV", transmission: "Automatic", seats: 7, fuel: "Diesel", pricePerDay: 3500, image: "/images/cars/alcazar.webp", features: ["AC", "Power Steering", "Music System", "ABS", "Sunroof"] },
  { id: "mahindra-thar-convertible-auto", name: "Mahindra Thar Convertible Automatic", type: "SUV", transmission: "Automatic", seats: 4, fuel: "Diesel", pricePerDay: 3500, image: "/images/cars/thar-convertible.webp", features: ["4WD", "Convertible","ABS", "Power Steering", "Music System", "AC"] },
  { id: "mahindra-thar-convertible", name: "Mahindra Thar Convertible", type: "SUV", transmission: "Manual", seats: 4, fuel: "Petrol", pricePerDay: 3200, image: "/images/cars/thar-convertible.webp", features: ["4WD", "Convertible","ABS", "Power Steering", "Music System", "AC"] },
  { id: "mahindra-thar-roxx-auto", name: "Mahindra Thar Roxx Automatic", type: "SUV", transmission: "Automatic", seats: 5, fuel: "Diesel", pricePerDay: 5000, image: "/images/cars/thar-roxx.webp", features: ["AC", "Music System", "Power Steering", "ABS", "Sunroof"] },
  { id: "hyundai-i20", name: "Hyundai i20", type: "Hatchback", transmission: "Manual", seats: 5, fuel: "Petrol", pricePerDay: 1400, image: "/images/cars/i20-manual.webp", features: ["ABS", "Power Steering", "Music System", "AC"] },
  { id: "hyundai-i20-auto", name: "Hyundai i20 Automatic", type: "Hatchback", transmission: "Automatic", seats: 5, fuel: "Petrol", pricePerDay: 1600, image: "/images/cars/i20-manual.webp", features: ["ABS", "Power Steering", "Music System", "AC"] },
  { id: "hyundai-i20-auto-sunroof", name: "Hyundai i20 Sunroof Automatic", type: "Hatchback", transmission: "Automatic", seats: 5, fuel: "Petrol", pricePerDay: 1800, image: "/images/cars/i20-sunroof.webp", features: ["Sunroof", "ABS", "Power Steering", "Music System", "AC"] },
  { id: "maruti-fronx", name: "Maruti Fronx", type: "Hatchback", transmission: "Automatic", seats: 5, fuel: "Petrol", pricePerDay: 1600, image: "/images/cars/fronx.webp", features: ["ABS", "Power Steering", "Music System", "AC"] },
  { id: "toyota-innova-hycross", name: "Toyota Innova Hycross", type: "MPV", transmission: "Automatic", seats: 7, fuel: "Petrol", pricePerDay: 3500, image: "/images/cars/hycross.webp", features: ["AC", "Music System", "Power Steering", "ABS"] },
  { id: "maruti-baleno-o", name: "Maruti Baleno Automatic", type: "Hatchback", transmission: "Automatic", seats: 5, fuel: "Petrol", pricePerDay: 1800, image: "/images/cars/baleno-auto-1.webp", features: ["Fuel Efficient", "Touchscreen", "Music System", "AC"] },
  { id: "mini-cooper", name: "Mini Cooper", type: "Hatchback", transmission: "Automatic", seats: 4, fuel: "Petrol", pricePerDay: 23000, image: "/images/cars/mini-cooper.webp", features: ["AC", "Music System", "Power Steering", "ABS"] },

];

// The three cars shown as exhibits on the home page, each with a side-profile cutout.
// The cutouts are cropped tight to the car, so drawing each at a width proportional to
// its real length (manufacturer figures, mm) keeps the three at one true scale.
export const COLLECTION = [
  {
    carId: "hyundai-venue",
    kind: "Compact SUV",
    art: { src: "/images/collection/venue.webp", width: 1600, height: 702, alt: "Grey Hyundai Venue, side profile" },
    lengthMm: 3995,
    blurb: "For town, the airport, and everything in between. Easy to park in Panjim, happy on the highway.",
  },
  {
    carId: "toyota-fortuner",
    kind: "Premium SUV",
    art: { src: "/images/collection/fortuner.webp", width: 1600, height: 654, alt: "Silver Toyota Fortuner, side profile" },
    lengthMm: 4795,
    blurb: "Quiet, composed and generous with luggage. For longer days and the drive down south.",
  },
  {
    carId: "mahindra-thar",
    kind: "Four-wheel drive",
    art: { src: "/images/collection/thar.webp", width: 1600, height: 772, alt: "Black Mahindra Thar hard top, side profile" },
    lengthMm: 3985,
    blurb: "For laterite tracks, hill roads to the ghats, and the long way round to the fort.",
  },
] as const;

export function getCar(id: string) {
  return CARS.find((c) => c.id === id);
}

export function formatPrice(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}
