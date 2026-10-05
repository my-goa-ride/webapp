import { BRAND, whatsappUrl } from "@/lib/brand";
import { WhatsApp } from "./icons";

// A line under the page intro on /cars and /bikes saying a WhatsApp message is enough to book.
export default function WhatsAppNote({ noun }: { noun: "car" | "bike" }) {
  return (
    <a className="wa-note ul" href={whatsappUrl(`Hi ${BRAND.name}! I'd like to book a ${noun}.`)} target="_blank" rel="noopener noreferrer">
      <WhatsApp size={16} /> Or book directly on WhatsApp
    </a>
  );
}
