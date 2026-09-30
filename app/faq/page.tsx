import type { Metadata } from "next";
import Faqs from "@/components/Faqs";
import PageHead from "@/components/PageHead";
import { BRAND, telHref, whatsappUrl } from "@/lib/brand";
import { FAQ_GROUPS } from "@/lib/content";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers about documents, delivery locations, deposits, fuel, fines and cancellations for self-drive rentals in Goa.",
};

export default function FaqPage() {
  return (
    <div className="page">
      <PageHead
        label="FAQ"
        title="Questions,"
        italic="answered."
        intro={
          <>
            Anything else? Call <a className="ul" href={telHref}>{BRAND.phone}</a> or{" "}
            <a className="ul" href={whatsappUrl(`Hi ${BRAND.name}! I have a question.`)} target="_blank" rel="noopener noreferrer">message us on WhatsApp</a>.
          </>
        }
      />

      <section className="wrap sec-tight">
        <div className="split">
          <nav className="aside" aria-label="FAQ topics">
            <div className="sticky">
              <ul className="index label">
                {FAQ_GROUPS.map((g) => (
                  <li key={g.id}><a href={`#${g.id}`}>{g.title}</a></li>
                ))}
              </ul>
            </div>
          </nav>
          <div className="main">
            {FAQ_GROUPS.map((g) => (
              <section key={g.id} id={g.id} className="faq-group" aria-labelledby={`${g.id}-title`}>
                <h2 id={`${g.id}-title`} className="display">{g.title}</h2>
                <Faqs items={g.items} />
              </section>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
