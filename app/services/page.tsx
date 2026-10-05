import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHead from "@/components/PageHead";
import { Arrow, WhatsApp } from "@/components/icons";
import { BRAND, whatsappUrl } from "@/lib/brand";
import { SERVICES } from "@/lib/content";
import { listNum } from "@/lib/format";

export const metadata: Metadata = {
  title: "Services",
  description: "Self-drive cars, wedding cars, sightseeing with a driver, taxi transfers, drivers for hire and outstation trips across Goa.",
};

export default function ServicesPage() {
  return (
    <div className="page">
      <PageHead
        label="Services"
        title="Behind the wheel, or"
        italic="in the back seat."
        intro="From driving yourself to being driven, everything you need to get around Goa and beyond."
      />
      <div className="wrap" style={{ paddingBottom: "clamp(80px, 10vw, 160px)" }}>
        {SERVICES.map((s, i) => (
          <section key={s.id} id={s.id} className={i % 2 ? "feature flip" : "feature"} aria-labelledby={`${s.id}-title`}>
            <div className="ph rv">
              <Image src={s.image} alt="" fill sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
            <div className="txt">
              <span className="label muted rv">{listNum(i + 1)} · {s.subtitle}</span>
              <h2 id={`${s.id}-title`} className="display rv">{s.title}</h2>
              <p className="rv">{s.text}</p>
              <ul className="bullets rv">
                {s.features.map((f) => <li key={f}>{f}</li>)}
              </ul>
              {"href" in s.cta ? (
                <Link className="btn cta rv" href={s.cta.href}>
                  {s.cta.label} <Arrow />
                </Link>
              ) : (
                <a className="btn cta rv" href={whatsappUrl(`Hi ${BRAND.name}! ${s.cta.whatsapp}`)} target="_blank" rel="noopener noreferrer">
                  <WhatsApp /> {s.cta.label}
                </a>
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
