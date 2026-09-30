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
  { id: "mahindra-thar", name: "Mahindra Thar", type: "SUV", transmission: "Automatic", seats: 4, fuel: "Diesel", pricePerDay: 3500, image: "/images/cars/Thar.webp", features: ["4WD", "Convertible", "Bluetooth"] },
  { id: "hyundai-creta", name: "Hyundai Creta", type: "SUV", transmission: "Manual", seats: 5, fuel: "Petrol", pricePerDay: 2500, image: "/images/cars/Hyundai_Creta.webp", features: ["Sunroof", "Reverse Camera", "Cruise Control"] },
  { id: "kia-seltos", name: "Kia Seltos", type: "SUV", transmission: "Automatic", seats: 5, fuel: "Diesel", pricePerDay: 2800, image: "/images/cars/KIA_Seltos.webp", features: ["Ventilated Seats", "360 Camera", "Bose Sound"] },
  { id: "maruti-baleno", name: "Maruti Baleno", type: "Hatchback", transmission: "Manual", seats: 5, fuel: "Petrol", pricePerDay: 1500, image: "/images/cars/baleno.webp", features: ["Fuel Efficient", "Touchscreen", "Keyless Entry"] },
  { id: "tata-nexon-ev", name: "Tata Nexon EV", type: "SUV", transmission: "Automatic", seats: 5, fuel: "EV", pricePerDay: 3000, image: "/images/cars/nexon.webp", features: ["Zero Emissions", "Touchscreen", "Fast Charging"] },
  { id: "maruti-ertiga", name: "Maruti Ertiga", type: "MUV", transmission: "Manual", seats: 7, fuel: "CNG", pricePerDay: 2200, image: "/images/cars/ertiga.webp", features: ["High Mileage", "Rear AC", "Bluetooth"] },
  { id: "hyundai-creta-automatic", name: "Hyundai Creta Automatic", type: "SUV", transmission: "Automatic", seats: 5, fuel: "Diesel", pricePerDay: 3000, image: "/images/cars/creta.webp", features: ["AC", "Music System", "Power Steering", "ABS", "Sunroof"] },
  { id: "toyota-innova-crysta", name: "Toyota Innova Crysta", type: "MPV", transmission: "Automatic", seats: 7, fuel: "Diesel", pricePerDay: 3000, image: "/images/cars/crysta.webp", features: ["AC", "Music System", "Power Steering", "ABS"] },
  { id: "maruti-xl6", name: "Maruti XL6", type: "MPV", transmission: "Manual", seats: 6, fuel: "Petrol", pricePerDay: 2000, image: "/images/cars/xl6.webp", features: ["AC", "Music System", "Power Steering", "ABS"] },
  { id: "maruti-swift", name: "Maruti Swift", type: "Hatchback", transmission: "Manual", seats: 5, fuel: "Petrol", pricePerDay: 1200, image: "/images/cars/swift.webp", features: ["AC", "Music System", "Power Steering", "ABS"] },
  { id: "toyota-fortuner", name: "Toyota Fortuner", type: "SUV", transmission: "Automatic", seats: 7, fuel: "Diesel", pricePerDay: 6000, image: "/images/cars/fortuner.webp", features: ["AC", "Music System", "Power Steering", "ABS"] },
  { id: "hyundai-exter", name: "Hyundai Exter", type: "SUV", transmission: "Automatic", seats: 5, fuel: "Petrol", pricePerDay: 2000, image: "/images/cars/exter.webp", features: ["Sunroof", "ABS", "Power Steering", "Music System", "AC"] },
  { id: "hyundai-venue", name: "Hyundai Venue", type: "SUV", transmission: "Automatic", seats: 5, fuel: "Petrol", pricePerDay: 2300, image: "/images/cars/venue.webp", features: ["Music System", "AC", "Power Steering", "ABS", "Sunroof"] },
  { id: "hyundai-alcazar", name: "Hyundai Alcazar", type: "SUV", transmission: "Automatic", seats: 7, fuel: "Diesel", pricePerDay: 3500, image: "/images/cars/alcazar.webp", features: ["AC", "Power Steering", "Music System", "ABS", "Sunroof"] },
  { id: "mahindra-thar-convertible", name: "Mahindra Thar Convertible", type: "SUV", transmission: "Automatic", seats: 4, fuel: "Diesel", pricePerDay: 3500, image: "/images/cars/Thar.webp", features: ["ABS", "Power Steering", "Music System", "AC"] },
  { id: "hyundai-i20", name: "Hyundai i20", type: "Hatchback", transmission: "Automatic", seats: 5, fuel: "Petrol", pricePerDay: 1600, image: "/images/cars/i20.webp", features: ["ABS", "Power Steering", "Music System", "AC"] },
  { id: "maruti-fronx", name: "Maruti Fronx", type: "Hatchback", transmission: "Automatic", seats: 5, fuel: "Petrol", pricePerDay: 1600, image: "/images/cars/fronx.webp", features: ["ABS", "Power Steering", "Music System", "AC"] },
  { id: "toyota-innova-hycross", name: "Toyota Innova Hycross", type: "MPV", transmission: "Automatic", seats: 7, fuel: "Petrol", pricePerDay: 3500, image: "/images/cars/hycross.webp", features: ["AC", "Music System", "Power Steering", "ABS"] },
];

// The three cars shown as exhibits on the home page, each with a side-profile cutout.
export const COLLECTION = [
  {
    carId: "hyundai-venue",
    kind: "Compact SUV",
    art: { src: "/images/collection/venue.webp", width: 1600, height: 702, alt: "Grey Hyundai Venue, side profile" },
    blurb: "For town, the airport, and everything in between. Easy to park in Panjim, happy on the highway.",
  },
  {
    carId: "toyota-fortuner",
    kind: "Premium SUV",
    art: { src: "/images/collection/fortuner.webp", width: 1600, height: 654, alt: "Silver Toyota Fortuner, side profile" },
    blurb: "Quiet, composed and generous with luggage. For longer days and the drive down south.",
  },
  {
    carId: "mahindra-thar",
    kind: "Four-wheel drive",
    art: { src: "/images/collection/thar.webp", width: 1600, height: 772, alt: "Black Mahindra Thar hard top, side profile" },
    blurb: "For laterite tracks, hill roads to the ghats, and the long way round to the fort.",
  },
] as const;

export function getCar(id: string) {
  return CARS.find((c) => c.id === id);
}

export function formatPrice(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}
