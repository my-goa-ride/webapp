import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import PageHead from "@/components/PageHead";
import { Arrow, Pin } from "@/components/icons";
import { BRAND, directionsUrl, mapEmbedUrl, telHref, whatsappUrl } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${BRAND.name} for bookings and questions.`,
};

export default function ContactPage() {
  return (
    <div className="page">
      <PageHead
        label="Contact"
        title="Get in"
        italic="touch."
        intro="A question, or help with a booking? We usually reply within the hour."
      />
      <section className="contact wrap">
        <address className="info" style={{ fontStyle: "normal" }}>
          <div>
            <span className="label">Call or WhatsApp</span>
            <a className="ul display" href={telHref}>{BRAND.phone}</a>
            <a className="ul display" href={`tel:${BRAND.altPhoneHref}`}>{BRAND.altPhone}</a>
            <a className="ul label" href={whatsappUrl(`Hi ${BRAND.name}!`)} target="_blank" rel="noopener noreferrer">Open WhatsApp</a>
          </div>
          <div>
            <span className="label">Email</span>
            <a className="ul display" href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
          </div>
          <div>
            <span className="label">Visit</span>
            <span>{BRAND.address.street}</span>
            <span>{BRAND.address.locality}</span>
             <span>{BRAND.address.postalCode}</span>
          </div>
        </address>
        <div className="form-wrap">
          <ContactForm />
        </div>
      </section>
      <section className="find-us wrap" aria-labelledby="find-us-title">
        <div className="map-frame">
          <iframe
            src={mapEmbedUrl}
            title={`Map showing ${BRAND.name} in ${BRAND.address.locality}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <div className="map-card">
            <span className="label map-kicker"><Pin size={10} /> Find us</span>
            <h2 id="find-us-title" className="display">Margao, <span className="ital">South Goa.</span></h2>
            <p>{BRAND.address.street}, {BRAND.address.locality} {BRAND.address.postalCode}</p>
            <a className="btn" href={directionsUrl} target="_blank" rel="noopener noreferrer">
              Get directions <Arrow size={18} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
