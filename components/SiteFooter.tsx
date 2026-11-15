import Image from "next/image";
import Link from "next/link";
import { BRAND, telHref } from "@/lib/brand";
import { CARS } from "@/lib/cars";
import { LOCALITIES } from "@/lib/locations";

export default function SiteFooter() {
  return (
    <footer className="foot wrap">
      <div className="foot-cols">
        <div>
          <span className="label">Visit</span>
          <address style={{ fontStyle: "normal" }}>
            {BRAND.address.street}
            <br />
            {BRAND.address.locality}<br/> {BRAND.address.postalCode}
          </address>
        </div>
        <div>
          <span className="label">Contact</span>
          <a className="ul" href={telHref}>{BRAND.phone}</a>
          <a className="ul" href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
        </div>
        <div>
          <span className="label">Explore</span>
          <Link className="ul" href="/cars">The Fleet</Link>
          <Link className="ul" href="/bikes">Bikes</Link>
          <Link className="ul" href="/services">Services</Link>
          <Link className="ul" href="/blogs">Journal</Link>
          <Link className="ul" href="/about">About</Link>
          <Link className="ul" href="/contact">Contact</Link>
        </div>
        <div>
          <span className="label">Support</span>
          <Link className="ul" href="/terms-and-conditions">Terms &amp; conditions</Link>
          <Link className="ul" href="/terms-and-conditions#cancellation">Cancellation policy</Link>
          <Link className="ul" href="/guidelines#privacy">Privacy policy</Link>
          <Link className="ul" href="/guidelines">Rental guidelines</Link>
          <Link className="ul" href="/faq">FAQ</Link>
        </div>
      </div>

      <nav className="dir" aria-label="Directory">
        <div className="dir-row">
          <span className="label">Rent a car</span>
          <ul>
            {CARS.map((c) => (
              <li key={c.id}>
                <Link href={`/cars/${c.id}`}>{c.name} in Goa</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="dir-row">
          <span className="label">Car rental in</span>
          <ul>
            {LOCALITIES.map((l) => (
              <li key={l.slug}>
                <Link href={`/car-rental/${l.slug}`}>{l.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <Image className="wordmark" src="/brand/logo-full.svg" width={500} height={484} alt={`${BRAND.name}, self-drive car rentals`} />
      <div className="small">
        <span>© {new Date().getFullYear()} {BRAND.legalName}</span>
        <a className="ul" href="#top">Back to top</a>
      </div>
    </footer>
  );
}
