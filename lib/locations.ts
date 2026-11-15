// The places that get their own "Car rental in …" page (/car-rental/<slug>), linked from the
// footer directory. `about` is the one line that makes each page more than a copy of the fleet:
// keep it specific to the place, and check it with the business before changing it.

export type LocalityKind = "town" | "airport" | "station";

export interface Locality {
  slug: string;
  name: string;
  area: "North Goa" | "South Goa";
  kind: LocalityKind;
  about: string;
}

export const LOCALITIES: Locality[] = [
  { slug: "mopa-airport", name: "Mopa Airport", area: "North Goa", kind: "airport", about: "Manohar International Airport at Mopa, in Pernem, is the closest airport for the beaches of the far north: Arambol, Morjim and Ashwem." },
  { slug: "dabolim-airport", name: "Dabolim Airport", area: "South Goa", kind: "airport", about: "Dabolim, near Vasco da Gama, is Goa's original airport and the shorter drive to Margao, Colva and the southern beaches." },
  { slug: "thivim-station", name: "Thivim Station", area: "North Goa", kind: "station", about: "Thivim is the Konkan Railway stop for North Goa, a short drive from Mapusa and the beaches beyond." },
  { slug: "madgaon-station", name: "Madgaon Station", area: "South Goa", kind: "station", about: "Madgaon is South Goa's main railway station, in Margao, and the arrival point for most trains into Goa." },
  { slug: "anjuna", name: "Anjuna", area: "North Goa", kind: "town", about: "Anjuna sits between Baga and Vagator, known for its Wednesday flea market and cliffside cafés." },
  { slug: "arambol", name: "Arambol", area: "North Goa", kind: "town", about: "Arambol is near the northern tip of Goa's coast, with a long beach and a freshwater lake behind it." },
  { slug: "baga", name: "Baga", area: "North Goa", kind: "town", about: "Baga is at the northern end of the Calangute stretch, the busiest beach and nightlife strip in North Goa." },
  { slug: "benaulim", name: "Benaulim", area: "South Goa", kind: "town", about: "Benaulim is a quiet beach village just south of Colva, a few minutes' drive from Margao." },
  { slug: "calangute", name: "Calangute", area: "North Goa", kind: "town", about: "Calangute is one of North Goa's largest beach towns, with hotels and villas packed along the coast road." },
  { slug: "candolim", name: "Candolim", area: "North Goa", kind: "town", about: "Candolim runs south from Calangute towards Sinquerim and Fort Aguada." },
  { slug: "colva", name: "Colva", area: "South Goa", kind: "town", about: "Colva is South Goa's best-known beach town, close to Margao and Madgaon Station." },
  { slug: "dona-paula", name: "Dona Paula", area: "North Goa", kind: "town", about: "Dona Paula is on the headland just outside Panjim, where the Zuari and Mandovi rivers meet the sea." },
  { slug: "mapusa", name: "Mapusa", area: "North Goa", kind: "town", about: "Mapusa is North Goa's main market town, inland from Calangute and Anjuna." },
  { slug: "margao", name: "Margao", area: "South Goa", kind: "town", about: "Margao is South Goa's commercial capital, and home to our own base at Housing Board." },
  { slug: "miramar", name: "Miramar", area: "North Goa", kind: "town", about: "Miramar is Panjim's city beach, at the mouth of the Mandovi river." },
  { slug: "morjim", name: "Morjim", area: "North Goa", kind: "town", about: "Morjim is a quieter North Goa beach between Vagator and Arambol." },
  { slug: "palolem", name: "Palolem", area: "South Goa", kind: "town", about: "Palolem, in Canacona, is the far-south crescent beach, close to Agonda and Butterfly Beach." },
  { slug: "panjim", name: "Panjim", area: "North Goa", kind: "town", about: "Panjim (Panaji) is Goa's capital on the Mandovi river, with the old Latin quarter of Fontainhas." },
  { slug: "porvorim", name: "Porvorim", area: "North Goa", kind: "town", about: "Porvorim is across the Mandovi bridge from Panjim, on the main road to Mapusa and the northern beaches." },
  { slug: "siolim", name: "Siolim", area: "North Goa", kind: "town", about: "Siolim is a riverside village on the Chapora river, between Anjuna and Morjim." },
  { slug: "vagator", name: "Vagator", area: "North Goa", kind: "town", about: "Vagator sits below Chapora Fort, north of Anjuna, with red cliffs above the beach." },
  { slug: "vasco", name: "Vasco", area: "South Goa", kind: "town", about: "Vasco da Gama is the port town next to Dabolim Airport." },
];

export function getLocality(slug: string) {
  return LOCALITIES.find((l) => l.slug === slug);
}

// The delivery line for each kind of place, shown under the page heading.
export function deliveryLine(l: Locality) {
  if (l.kind === "airport") return `Delivered to the terminal at ${l.name}.`;
  if (l.kind === "station") return `Delivered to you at ${l.name}.`;
  return `Delivered to your villa, hotel or home in ${l.name}.`;
}
