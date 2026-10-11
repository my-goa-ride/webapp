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
  siteUrl: "https://www.mygoaride.com",

  phone: "+91 75076 64693",
  phoneHref: "+917507664693",
  altPhone: "+91 75076 64693",
  altPhoneHref: "+917507664693",
  whatsapp: "917507664693", // country code + number, digits only
  email: "mygoaride@gmail.com",

  address: {
    street: "EWS 61, Maruti Mandir",
    locality: "Housing board, Margao, South Goa",
    postalCode: "403601",
    country: "IN",
  },
  geo: { lat: 15.277986202811343, lng: 73.98620200490994 },
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

export const mapEmbedUrl = `https://maps.google.com/maps?q=${BRAND.geo.lat},${BRAND.geo.lng}&z=16&output=embed`;
export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${BRAND.geo.lat},${BRAND.geo.lng}`;

// The headline figures above the reviews on the home page. Keep them in line with the real numbers.
export const STATS = [
  { value: "500+", label: "Happy bookings" },
  { value: "3k+", label: "Happy customers" },
  { value: "2+", label: "Years in Goa" },
  { value: "4.8★", label: "Average rating" },
];
