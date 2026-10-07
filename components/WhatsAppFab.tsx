"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { BRAND, whatsappUrl } from "@/lib/brand";
import { WhatsApp } from "./icons";

// The opening line of the chat, matched to the page the visitor is on.
function greeting(path: string) {
  if (path.startsWith("/bikes")) return `Hi ${BRAND.name}! I'd like to book a bike.`;
  if (path.startsWith("/services")) return `Hi ${BRAND.name}! I'd like to ask about your taxi and driver services.`;
  if (path.startsWith("/cars") || path === "/") return `Hi ${BRAND.name}! I'd like to book a car.`;
  return `Hi ${BRAND.name}! I have a question.`;
}

// A WhatsApp button that stays in the corner on every page. It steps aside while the
// booking form or the footer is on screen, so it never covers the send button or
// repeats the contact details already in view.
export default function WhatsAppFab() {
  const path = usePathname();
  const [away, setAway] = useState(false);

  useEffect(() => {
    const targets = document.querySelectorAll("#reserve, footer.foot");
    const inView = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) inView.add(e.target);
        else inView.delete(e.target);
      }
      setAway(inView.size > 0);
    });
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [path]);

  return (
    <a
      className={away ? "wa-fab away" : "wa-fab"}
      href={whatsappUrl(greeting(path))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      aria-hidden={away || undefined}
      tabIndex={away ? -1 : undefined}
    >
      <WhatsApp size={26} />
      <span className="wa-fab-text">Chat with us</span>
    </a>
  );
}
