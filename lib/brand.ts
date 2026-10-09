// Every brand-specific value lives here. Swap these placeholders for the real
// business details and the whole site (copy, links, metadata, JSON-LD) follows.

export const BRAND = {
  name: "MyGoaRide",
  legalName: "MyGoaRide Car Rentals",
  // The hero wordmark: the first part is set upright, the rest in italic.
  wordmark: ["MyGoa", "Ride"],
  tagline: "The coast, at your own pace.",
  description:
    "Self-drive car rental in Goa. Cleaned, checked and delivered to your villa, hotel or the airport.",
  siteUrl: "https://www.example.com",

  phone: "+91 00000 00000",
  phoneHref: "+910000000000",
  altPhone: "+91 00000 00001",
  altPhoneHref: "+910000000001",
  whatsapp: "910000000000", // country code + number, digits only
  email: "hello@example.com",

  address: {
    street: "[Street address]",
    locality: "[Area], Goa",
    postalCode: "[PIN]",
    country: "IN",
  },
} as const;

// Rental policy figures for cars, carried over from the reference site. Confirm with the business.
export const POLICY = {
  minDays: 3,
  deposit: "₹3,000",
  cleaningFee: "₹1,000",
  insuranceThreshold: "₹1,40,000",
  fullRefundDays: 7,
  // Return by this time on the last day; a later return is charged for that day too.
  returnBy: "09:00",
  minAge: 18,
} as const;

// Where bikes differ from the car policy above; everything else (fuel, fines, cancellation,
// return time) follows POLICY.
export const BIKE_POLICY = {
  minDays: 3,
  deposit: "₹1,000",
  minAge: 18,
} as const;

export function whatsappUrl(message: string) {
  return `https://api.whatsapp.com/send?phone=${BRAND.whatsapp}&text=${encodeURIComponent(message)}`;
}

export const telHref = `tel:${BRAND.phoneHref}`;

// The headline figures above the reviews on the home page. Keep them in line with the real numbers.
export const STATS = [
  { value: "500+", label: "Happy bookings" },
  { value: "10k+", label: "Happy customers" },
  { value: "5+", label: "Years in Goa" },
  { value: "4.8★", label: "Average rating" },
];
