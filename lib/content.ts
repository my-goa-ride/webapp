// Page copy carried over from the reference rental site, with the brand name and
// policy figures pulled from lib/brand.ts.
import { BRAND, POLICY } from "./brand";

const B = BRAND.name;

export const NAV = [
  { label: "The Fleet", href: "/cars" },
  { label: "Services", href: "/services" },
  { label: "Guidelines", href: "/guidelines" },
  { label: "Journal", href: "/blogs" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export const WHY_CHOOSE = [
  { title: "Transparent pricing", text: `Premium self-drive cars at competitive rates, with no hidden fees. The price you see includes standard insurance and taxes.` },
  { title: "A fleet for every road", text: "From nimble hatchbacks for the narrow lanes of the north to seven-seat SUVs for the drive down south." },
  { title: "Kept properly", text: "Every car is serviced, checked and deep-cleaned before each rental, so the only surprise is the view." },
  { title: "Booking in minutes", text: "Choose a car, send a request, and we confirm on WhatsApp or by phone. Pick-up is quick and unfussy." },
  { title: "Help around the clock", text: "Late-night question or a flat tyre on the coast road, our team is reachable 24/7 across Goa." },
  { title: "A clear cancellation policy", text: "Plans change. Our cancellation terms are short and written plainly, so you know exactly where you stand." },
];

export const STEPS = [
  { title: "Find your car", text: `Browse the fleet and pick the car that suits your trip, from a Swift for two to an Innova for the whole family.` },
  { title: "Send a request", text: "Choose your dates and where we should bring it. We confirm availability and share payment details." },
  { title: "Get ready to drive", text: "Ride details arrive on WhatsApp and email. Meet us at the handover, complete a quick verification, and go." },
  { title: "Hand back the keys", text: "Return the car at the agreed point. The deposit is refunded once the car is checked for damage and challans." },
];

export const DOCUMENTS = [
  { image: "/images/docs/driver-license.webp", title: "A valid driving licence", text: "Your original licence, which confirms your identity and that you are allowed to drive." },
  { image: "/images/docs/id-card.webp", title: "A second photo ID", text: "A passport, Aadhaar or Voter ID, to match against your booking details." },
];

export const TAXI_SERVICES = [
  { title: "Airport taxis", text: "Pre-book a pickup at Mopa or Dabolim. Drivers track your flight so they are waiting when you land.", perk: "Fixed fares and flight tracking." },
  { title: "Full-day sightseeing", text: "Beaches, forts and spice plantations at your own pace, with an air-conditioned car and a driver who knows the roads.", perk: "Flexible routes, local drivers." },
  { title: "Point to point", text: "Dinner, a beach club, or back to your resort: a direct, safe drop anywhere across North or South Goa.", perk: "Quick dispatch, late-night drops." },
  { title: "Outstation trips", text: "Gokarna, Malvan and beyond, in a well-kept car with an experienced highway driver.", perk: "Sedans and SUVs available." },
];

export const OUTSTATION = [
  { title: "One-way drop", text: "Pick up in Goa and leave the car in Mumbai, Pune or Bangalore. Open-ended travel without the drive back." },
  { title: "Round trip", text: "Drive to your destination and return at your own pace. Ask about unlimited-kilometre packages for interstate trips." },
  { title: "Multi-city", text: "A longer route across state lines, with interstate permits, paperwork and dedicated support arranged for you." },
];

export const REGIONS = [
  { title: "North Goa", text: "Beachside deliveries and hotel drop-offs.", places: ["Panaji", "Calangute", "Baga", "Anjuna", "Vagator", "Mapusa", "Morjim", "Arambol", "Candolim", "Sinquerim"] },
  { title: "Airports & stations", text: "To your terminal or platform.", places: ["Mopa Airport (GOX)", "Dabolim Airport (GOI)", "Madgaon Station", "Thivim Station", "Panaji Bus Stand", "Your hotel"] },
  { title: "South Goa", text: "Quiet drops along the southern shore.", places: ["Margao", "Palolem", "Colva", "Vasco", "Benaulim", "Cavelossim", "Agonda", "Varca", "Majorda", "Mobor"] },
];

export interface Service {
  id: string;
  title: string;
  subtitle: string;
  text: string;
  features: string[];
  image: string;
  cta: { label: string; href: string } | { label: string; whatsapp: string };
}

export const SERVICES: Service[] = [
  {
    id: "self-drive",
    title: "Self-drive cars",
    subtitle: "Explore Goa on your own terms",
    text: "Skip the tour buses and rigid schedules. Rent a well-kept hatchback, sedan or SUV and find the hidden beaches exactly when you want to.",
    features: ["Unlimited kilometres on select packages", "Doorstep delivery to your hotel or the airport", "Insured and sanitised fleet", "No hidden fees"],
    image: "/images/services/self-drive.webp",
    cta: { label: "Browse the fleet", href: "/cars" },
  },
  {
    id: "wedding",
    title: "Wedding cars",
    subtitle: "Arrive in style on the day",
    text: "Make a Goan wedding memorable with a chauffeur-driven premium car, decorated if you like, and a driver who is on time.",
    features: ["Chauffeur-driven premium sedans", "Optional floral decoration", "Punctual, well-turned-out drivers", "Hourly and daily hire"],
    image: "/images/services/wedding-service.webp",
    cta: { label: "Ask about weddings", whatsapp: "I'm interested in a wedding car." },
  },
  {
    id: "sightseeing",
    title: "Sightseeing with a driver",
    subtitle: "A local guide to Goa",
    text: "North Goa's forts, South Goa's churches and the spice plantations in between, with a driver who knows the way.",
    features: ["Full-day North and South Goa tours", "Itineraries to suit you", "Knowledgeable local drivers", "Fuel and parking included"],
    image: "/images/services/sightseeing-service.webp",
    cta: { label: "Plan a day out", whatsapp: "I'd like to book a sightseeing day with a driver." },
  },
  {
    id: "taxi",
    title: "Taxi transfers",
    subtitle: "Punctual and unfussy",
    text: "Airport pickups, station drops and point-to-point transfers with experienced local drivers, at a price agreed up front.",
    features: ["Mopa (GOX) and Dabolim (GOI) transfers", "Flight tracking included", "Quick point-to-point drops", "Fixed, upfront pricing"],
    image: "/images/services/taxi-service.webp",
    cta: { label: "Book a transfer", whatsapp: "I'd like to book a taxi transfer." },
  },
  {
    id: "driver-hire",
    title: "Driver for hire",
    subtitle: "Your car, our driver",
    text: "Already have a car but want someone else at the wheel? Hire a verified, experienced driver for local or outstation travel.",
    features: ["Verified, experienced drivers", "Local and outstation", "Safe night driving", "Daily and weekly hire"],
    image: "/images/services/driver-hire.webp",
    cta: { label: "Hire a driver", whatsapp: "I'd like to hire a driver." },
  },
  {
    id: "outstation",
    title: "Outstation road trips",
    subtitle: "Beyond the state border",
    text: "Mumbai, Pune, Bangalore or the Konkan coast: outstation packages with the permits a long highway drive needs.",
    features: ["One-way drops to major cities", "Flexible round trips", "Interstate permits handled", "24/7 roadside assistance"],
    image: "/images/services/outstation.webp",
    cta: { label: "Plan your journey", whatsapp: "I'm interested in an outstation trip from Goa." },
  },
];

export const RULES = [
  {
    title: "Safety, zero tolerance",
    items: [
      "Driving under the influence of alcohol or drugs ends the rental immediately.",
      "No stunts, drifting, racing or reckless driving.",
      "Follow Goa's traffic laws and speed limits at all times.",
    ],
  },
  {
    title: "Where the car can go",
    items: [
      "The cars are meant for paved roads. Off-roading needs our approval in advance.",
      "Park only in designated public parking to avoid fines or towing.",
      "Do not drive onto private property or restricted beaches.",
    ],
  },
  {
    title: "Looking after the car",
    items: [
      "No smoking inside the car. A deep-cleaning fee applies.",
      "Return the car as clean as it was handed over.",
      "Stay within the recommended passenger and luggage capacity.",
    ],
  },
  {
    title: "Reporting and fuel",
    items: [
      "Tell us straight away about any scratch, damage or mechanical issue.",
      "Check the fuel type (petrol or diesel) before refuelling.",
    ],
  },
  {
    title: "Who may drive",
    items: [
      "Only the person who signed the rental agreement may drive.",
      "Lending the car to anyone else voids the agreement and all support.",
    ],
  },
];

export const TIPS = [
  { title: "Minimum age", text: `The primary driver must be at least ${POLICY.minAge} and hold a valid Indian driving licence. Goa's winding roads reward focus.` },
  { title: "Checkpoints", text: `Tourists are often stopped at checkpoints. Carry your licence and keep the ${B} paperwork in the glovebox, and routine stops take a minute.` },
  { title: "Choosing the right car", text: "For the narrow lanes of North Goa, a nimble hatchback like the Swift is ideal. For larger groups heading south, choose one of the seven-seat SUVs." },
  { title: "If something goes wrong", text: `Don't attempt repairs yourself. For a flat tyre or a warning light, call the ${B} team and we will send help or a replacement car.` },
  { title: "State borders", text: "Standard rentals are for Goa. Crossing into Maharashtra or Karnataka needs our prior permission and an All-India Tourist Permit." },
];

export const PRIVACY = [
  { title: "What we collect", text: "Your name, contact details and driving licence information, used only to process your booking and meet legal requirements in Goa." },
  { title: "How we protect it", text: "Your information is stored securely and never shared with third parties for marketing. Documents are encrypted during verification." },
];

export const CANCELLATION = [
  `The booking amount is fully refunded if you cancel at least ${POLICY.fullRefundDays} days before the start date.`,
  `Cancellations within ${POLICY.fullRefundDays} days of the start date are non-refundable.`,
  "If you end the rental early after delivery, unused days are not refunded.",
  "For example, a car booked for 5 days and returned on day 3 is charged for all 5 days.",
  "Extensions depend on availability and our approval, and may be declined because of prior bookings.",
];

export const TERMS = [
  { title: "Minimum booking", items: [`Self-drive rentals are for a minimum of ${POLICY.minDays} days.`] },
  {
    title: "Returning the car",
    items: [
      `Handover hours are ${POLICY.handoverHours}.`,
      "Return the car by the agreed time.",
      `Returns after ${POLICY.lateAfter}, or after the agreed time, are charged an extra day.`,
    ],
  },
  {
    title: "Damage and insurance",
    items: [
      "Repair costs for accidental damage are assessed first.",
      `If repairs are estimated above ${POLICY.insuranceThreshold}, we may claim through insurance.`,
      "While the car is off the road for repairs, the daily rental charge applies.",
    ],
  },
  {
    title: "Responsibility and traffic violations",
    items: [
      "We are responsible for the car being legally registered and permitted to operate in Goa.",
      "The renter is responsible for rash or negligent driving, drink-driving, speeding, seat belts, signal jumping, illegal parking, any challans or penalties during the rental, and damage from misuse.",
    ],
  },
  {
    title: "Extensions",
    items: ["Extensions depend on availability and our prior approval.", "Request an extension before your booking ends."],
  },
  {
    title: "General conditions",
    items: [
      "You need a valid driving licence at pickup.",
      "We may refuse or cancel a booking for policy violations or suspicious activity.",
    ],
  },
  {
    title: "Fuel",
    items: [
      "Return the car with the same fuel level it was delivered with.",
      "Extra fuel left in the car is not refunded.",
      "A lower fuel level is charged at the difference.",
    ],
  },
  {
    title: "Fines and challans",
    items: [
      "The renter pays all traffic fines, challans and penalties incurred during the rental.",
      "Challans that arrive after the return but relate to your rental period are also yours to pay.",
    ],
  },
];

export const ABOUT_VALUES = [
  { title: "A well-kept fleet", text: "Every car is maintained, cleaned and serviced on schedule, so it drives the way it should." },
  { title: "Customers first", text: "From booking to handing back the keys, your comfort comes first. No hidden fees, no surprise charges." },
  { title: "On time", text: "Holiday time is precious. Airport or hotel, we're there when we said we would be." },
  { title: "Safe and reliable", text: "Each car goes through a mechanical checklist before every rental, for peace of mind on Goan roads." },
];

export interface Faq { q: string; a: string }

export const FAQ_GROUPS: { id: string; title: string; items: Faq[] }[] = [
  {
    id: "documents",
    title: "Documents & ID",
    items: [
      { q: "What type of licence do I need?", a: "An original, valid Indian driving licence for a light motor vehicle (four-wheeler). You do not need a commercial licence." },
      { q: "What should I bring when I pick up the car?", a: "Your original driving licence and a government photo ID such as a passport, Aadhaar or Voter ID. We keep a photocopy for our records." },
      { q: "What do I need to provide before booking?", a: "Your name, phone number, email, pickup and drop-off dates and times, and your licence and ID details for verification." },
      { q: "What is the minimum age to rent a car?", a: `${POLICY.minAge} years, with a valid Indian driving licence.` },
      { q: "Is there a minimum booking duration?", a: `Yes. Self-drive rentals are for a minimum of ${POLICY.minDays} days.` },
    ],
  },
  {
    id: "locations",
    title: "Locations",
    items: [
      {
        q: `Where can I pick up and drop off a ${B} car?`,
        a: "Anywhere in Goa that suits you. Extra charges may apply depending on the location.\n\nNorth Goa: Arpora, Baga, Calangute, Candolim, Fort Aguada, Mapusa, Nerul, Saligao, Anjuna, Assagao, Bambolim, Chapora, Dona Paula, Karmali Station, Mopa Airport, Miramar, Old Goa, Panjim, Porvorim, Ribandar, Siolim, Thivim Station, Vagator, Arambol, Ashwem, Mandrem, Morjim and more.\n\nSouth Goa: Agonda, Betul, Benaulim, Betalbatim, Colva, Cortalim, Cabo de Rama, Cola, Cavelossim, Vasco, Dabolim Airport, Verna, Majorda, Margao, Navelim, Varca, Palolem, Galgibaga, Mobor, Quepem, Sanguem and more.",
      },
    ],
  },
  {
    id: "tolls",
    title: "Tolls, parking & fines",
    items: [
      { q: "Who pays for parking?", a: "The renter pays all parking fees during the rental." },
      { q: "Am I responsible for parking and moving violations?", a: "Yes. All parking tickets, traffic challans and fines during the rental are the renter's responsibility." },
      { q: "Are tolls included?", a: "No. Tolls, parking and any authorised interstate permits are paid by the renter." },
    ],
  },
  {
    id: "booking",
    title: "Booking & handover",
    items: [
      { q: "How do I find my car?", a: "We confirm the exact handover point with you on WhatsApp or by phone before your booking starts." },
      { q: "How do I extend my booking?", a: "Message or call us as early as possible before your booking ends. Extensions depend on availability." },
      { q: "Can someone else drive the car?", a: "No. Only the person whose licence was verified at booking may drive." },
      { q: "Can I bring a pet?", a: "Pets generally aren't allowed, to keep the cars clean for guests with allergies. A cleaning fee applies if pet hair or odour is found." },
    ],
  },
  {
    id: "pricing",
    title: "Pricing & payments",
    items: [
      { q: "How does the security deposit work?", a: `A refundable deposit of ${POLICY.deposit} is taken before handover and returned at the end of the trip, as long as the car comes back undamaged with no pending fines.` },
      { q: "Is fuel included?", a: "No. Cars are rented gauge to gauge: return the car with the same fuel level it had at delivery." },
      { q: "When do I get my deposit back?", a: "The refund starts as soon as the car is returned and checked. It usually reaches your account within 24 to 48 hours." },
      { q: "How can I pay?", a: "UPI, cash, and major credit and debit cards, for both the rental and the deposit." },
    ],
  },
  {
    id: "rules",
    title: "Rules & safety",
    items: [
      { q: "Can I take the car outside Goa?", a: "Not on a standard rental. Trips outside Goa need our prior approval and the right permits; ask us about outstation packages." },
      { q: "Can I drive on the beach?", a: "No. It's illegal in Goa and ends the rental, with fines and loss of the deposit." },
      { q: "Can I smoke or drink in the car?", a: `No. A cleaning fee of ${POLICY.cleaningFee} applies if the car comes back with smoke odour or litter.` },
      { q: "What if I have an accident?", a: `Call us straight away. Repair costs are assessed; above ${POLICY.insuranceThreshold} we may claim through insurance. The daily rental charge applies while the car is being repaired.` },
      { q: "What are the handover hours?", a: `${POLICY.handoverHours}. Returns after ${POLICY.lateAfter} are charged an extra day.` },
    ],
  },
  {
    id: "cancellation",
    title: "Cancellation & refunds",
    items: [
      { q: "What is the cancellation policy?", a: `Cancel at least ${POLICY.fullRefundDays} days before the start date for a full refund. Within ${POLICY.fullRefundDays} days, the booking amount is non-refundable.` },
      { q: "Is there a refund for returning early?", a: "No. Unused days after delivery are not refunded: a 5-day booking returned on day 3 is charged for 5 days." },
      { q: "How do extensions work?", a: "They depend on availability and our approval, and must be requested before your booking ends." },
    ],
  },
];

export const HOME_FAQS: Faq[] = [
  { q: "Is fuel included in the price?", a: "No. Cars are rented gauge to gauge: we hand over the car with a fuel level, and you return it with the same." },
  { q: "What documents do I need?", a: "An original, valid Indian driving licence and a government photo ID such as a passport or Voter ID." },
  { q: "Are there hidden charges?", a: "No. The quoted price includes standard insurance and taxes. You pay the rental, a refundable deposit and your fuel." },
  { q: "What if I scratch the car?", a: `Minor repairs come out of the deposit. Above ${POLICY.insuranceThreshold}, we may claim through insurance; the daily rental applies while the car is off the road.` },
  { q: "Can I extend my booking?", a: "Usually, if the car is free. Message us on WhatsApp before your booking ends." },
];

export const DIRECTORY = {
  localities: ["Mopa Airport", "Dabolim Airport", "Thivim", "Madgaon", "Anjuna", "Arambol", "Baga", "Benaulim", "Calangute", "Candolim", "Colva", "Dona Paula", "Mapusa", "Margao", "Miramar", "Morjim", "Palolem", "Panjim", "Porvorim", "Siolim", "Vagator", "Vasco"],
};
