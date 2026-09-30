// Every brand-specific value lives here. Swap these placeholders for the real
// business details and the whole site (copy, links, metadata, JSON-LD) follows.

export const BRAND = {
  name: "Your Brand",
  legalName: "Your Brand Car Rentals",
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
  hours: "Every day, 9:00 AM to 9:00 PM",
} as const;

// Rental policy figures, carried over from the reference site. Confirm with the business.
export const POLICY = {
  minDays: 3,
  deposit: "₹5,000",
  cleaningFee: "₹1,000",
  insuranceThreshold: "₹1,40,000",
  fullRefundDays: 7,
  handoverHours: "9:00 AM to 9:00 PM",
  lateAfter: "9:00 PM",
  minAge: 18,
} as const;

export function whatsappUrl(message: string) {
  return `https://api.whatsapp.com/send?phone=${BRAND.whatsapp}&text=${encodeURIComponent(message)}`;
}

export const telHref = `tel:${BRAND.phoneHref}`;

// Placeholder reviews: replace with real, attributable customer reviews before launch.
export const TESTIMONIALS = [
  { name: "[Customer name]", place: "[City]", text: "[A short review from a real customer goes here.]" },
  { name: "[Customer name]", place: "[City]", text: "[A second customer review, one or two sentences long.]" },
  { name: "[Customer name]", place: "[City]", text: "[A third review, ideally mentioning delivery or the car's condition.]" },
];
