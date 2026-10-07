import Image from "next/image";
import Link from "next/link";
import BookingForm from "@/components/BookingForm";
import Faqs from "@/components/Faqs";
import Hero from "@/components/home/Hero";
import ReserveLink from "@/components/ReserveLink";
import { Arrow, WhatsApp } from "@/components/icons";
import { blogPosts } from "@/lib/blogs";
import { BRAND, STATS, telHref, whatsappUrl } from "@/lib/brand";
import { CARS, COLLECTION, formatPrice, getCar } from "@/lib/cars";
import { DOCUMENTS, HOME_FAQS, OUTSTATION, REGIONS, STEPS, TAXI_SERVICES, WHY_CHOOSE } from "@/lib/content";
import { listNum, splitLast } from "@/lib/format";
import "./home.css";

const STATEMENT =
  "We keep our cars well. Each one is cleaned, checked and brought to your door, so the only thing left to decide is which road to take.";

// The longest exhibit is drawn full width; the others in proportion to it.
const LONGEST = Math.max(...COLLECTION.map((c) => c.lengthMm));

export default function Home() {
  const words = STATEMENT.split(" ");
  const posts = [blogPosts.find((p) => p.featured) ?? blogPosts[0], ...blogPosts.filter((p) => !p.featured).slice(0, 2)];

  return (
    <>
      <div className="curtain" aria-hidden="true">
        <Image src="/brand/logo-full-light.svg" width={771} height={334} alt="" priority />
      </div>

      <Hero />

      {/* STATEMENT: words brighten as you read */}
      <section className="statement wrap" aria-label="About us">
        <p className="display">
          {words.map((w, i) => {
            const start = 18 + (i * 60) / words.length;
            return (
              <span key={i}>
                <span className="w" style={{ animationRange: `cover ${start.toFixed(1)}% cover ${(start + 10).toFixed(1)}%` }}>
                  {w}
                </span>{" "}
              </span>
            );
          })}
        </p>
      </section>

      {/* THE COLLECTION */}
      <section id="collection" className="wrap" aria-labelledby="collection-title" style={{ paddingTop: 24 }}>
        <div className="coll-head">
          <h2 id="collection-title" className="display rv">
            The <em className="ital">Collection</em>
          </h2>
          <p className="muted rv">
            Three favourites from a fleet of {CARS.length}, each suited to a different kind of day. Cleaned, checked and fuelled before every rental.
          </p>
        </div>

        {COLLECTION.map((item, i) => {
          const car = getCar(item.carId)!;
          const right = i % 2 === 0;
          return (
            <article key={item.carId} className={right ? "exhibit ex-right" : "exhibit"}>
              <div className="ex-top label muted">
                <span>No. {String(i + 1).padStart(2, "0")}</span>
                <span>{item.kind}</span>
              </div>
              <div
                className={`ex-car ${right ? "from-r" : "from-l"}`}
                style={{ "--scale": item.lengthMm / LONGEST } as React.CSSProperties}
              >
                <div className="floor" aria-hidden="true" />
                <Image src={item.art.src} width={item.art.width} height={item.art.height} alt={item.art.alt} sizes="(max-width: 720px) 100vw, 76vw" />
              </div>
              <div className="ex-grid rv">
                <h3 className="display">{splitLast(car.name)[0]} <em className="ital">{splitLast(car.name)[1]}</em></h3>
                <p className="desc muted">{item.blurb}</p>
                <dl>
                  <dt>Seats</dt><dd>{car.seats}</dd>
                  <dt>Gearbox</dt><dd>{car.transmission}</dd>
                  <dt>From</dt><dd>{formatPrice(car.pricePerDay)} / day</dd>
                </dl>
                <div className="act label">
                  <a className="wa-pill" href={whatsappUrl(`Hi ${BRAND.name}! I'd like to book the ${car.name}.`)} target="_blank" rel="noopener noreferrer" aria-label={`Book the ${car.name} on WhatsApp`}>
                    <WhatsApp size={14} /> WhatsApp
                  </a>
                  <a className="ul" href={telHref} aria-label={`Call to book the ${car.name}`}>Or call</a>
                  <ReserveLink carId={car.id} carName={car.name} />
                </div>
              </div>
            </article>
          );
        })}

        <div className="coll-foot">
          <span className="label muted">{CARS.length} cars · hatchbacks, SUVs and seven-seaters</span>
          <Link className="ul label on" href="/cars">
            See the full fleet <Arrow />
          </Link>
        </div>
      </section>

      {/* PICK-UP ESSENTIALS */}
      <section className="sec wrap" aria-labelledby="docs-title">
        <div className="docs">
          <h2 id="docs-title" className="display rv">
            Bring two <em className="ital">things.</em>
          </h2>
          <div className="list">
            {DOCUMENTS.map((d) => (
              <div key={d.title} className="doc rv">
                <Image src={d.image} alt="" width={96} height={61} />
                <p>
                  <strong>{d.title}.</strong> <span className="muted">{d.text}</span>
                </p>
              </div>
            ))}
            <p className="note rv">Both must be originals, shown in person when the car arrives.</p>
          </div>
        </div>
      </section>

      {/* FULL-BLEED PHOTOGRAPH */}
      <section className="bleed" aria-label="A village road in Goa at dusk">
        <div className="bleed-in">
          <Image className="img-d" src="/images/design/village-road.webp" fill sizes="100vw" alt="An empty village road in Goa at dusk, lined with coconut palms and whitewashed houses" />
          <Image className="img-m" src="/images/design/village-road-portrait.webp" fill sizes="100vw" alt="" />
        </div>
        <div className="bleed-shade" aria-hidden="true" />
        <div className="bleed-cap wrap">
          <h2 className="display">
            Goa is best seen <em className="ital">slowly.</em>
          </h2>
        </div>
      </section>

      {/* SERVICE */}
      {/* The photo runs to the left edge and stretches to the text panel's height. */}
      <section id="service" className="service" aria-labelledby="service-title">
        <div className="villa">
          <Image src="/images/design/handover.webp" fill sizes="(max-width: 1024px) 100vw, 50vw" alt="Car keys with a coral key tag being handed over outside a white villa, a silver SUV parked behind" />
        </div>
        <div className="svc">
          <span className="label muted rv">The Service</span>
          <h2 id="service-title" className="display rv">
            Delivered to <em className="ital">the door.</em>
          </h2>
          <p className="muted rv">
            Your car arrives where you are, at the hour you choose, and is collected the same way. The rest of the time, it is simply yours.
          </p>
          <ul className="tenets">
            <li className="rv"><span className="num display ital">{listNum(1)}</span><div><h3>Delivered</h3><p>To your villa, your hotel, or the airport arrivals hall.</p></div></li>
            <li className="rv"><span className="num display ital">{listNum(2)}</span><div><h3>Checked</h3><p>Serviced, inspected and deep-cleaned before every rental.</p></div></li>
            <li className="rv"><span className="num display ital">{listNum(3)}</span><div><h3>Looked after</h3><p>Help on WhatsApp or by phone, 24/7, wherever the road takes you.</p></div></li>
          </ul>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="sec wrap" aria-labelledby="why-title">
        <div className="sec-head">
          <span className="label rv">Why {BRAND.name}</span>
          <h2 id="why-title" className="display rv">
            A rental that <em className="ital">stays out of the way.</em>
          </h2>
          <p className="rv">Everything a good holiday car needs, and nothing you have to chase.</p>
        </div>
        <ul className="grid-3">
          {WHY_CHOOSE.map((f, i) => (
            <li key={f.title} className="rv">
              <span className="num display ital">{listNum(i + 1)}</span>
              <h3 className="display">{f.title}</h3>
              <p>{f.text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* HOW TO BOOK */}
      <section className="sec dark wrap" aria-labelledby="steps-title">
        <div className="sec-head">
          <span className="label rv">How to book</span>
          <h2 id="steps-title" className="display rv">
            Four steps to <em className="ital">the keys.</em>
          </h2>
          <Link className="ul label on more rv" href="/cars">
            Choose a car <Arrow />
          </Link>
        </div>
        <ol className="rows plain">
          {STEPS.map((s, i) => (
            <li key={s.title} className="row rv">
              <span className="idx display ital">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="display">{s.title}</h3>
              <div className="body"><p>{s.text}</p></div>
            </li>
          ))}
        </ol>
      </section>

      {/* TAXI SERVICES */}
      <section className="sec wrap" aria-labelledby="taxi-title">
        <div className="sec-head">
          <span className="label rv">With a driver</span>
          <h2 id="taxi-title" className="display rv">
            Rather not <em className="ital">drive?</em>
          </h2>
          <p className="rv">Clean, comfortable, punctual taxis with a fare agreed before you set off.</p>
        </div>
        <ul className="grid-3 taxis">
          {TAXI_SERVICES.map((s, i) => (
            <li key={s.title} className="rv">
              <div className="taxi-ph">
                <Image src={s.image} alt={s.alt} fill sizes="(max-width: 720px) 100vw, (max-width: 1024px) 50vw, 25vw" />
              </div>
              <span className="num display ital">{listNum(i + 1)}</span>
              <h3 className="display">{s.title}</h3>
              <p>{s.text}</p>
              <span className="label muted perk">{s.perk}</span>
              <a className="ul label on" href={whatsappUrl(`Hi ${BRAND.name}! I'd like to book: ${s.title}.`)} target="_blank" rel="noopener noreferrer">
                <WhatsApp /> Book on WhatsApp
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* OUTSTATION */}
      <section className="sec tone wrap trip-sec" aria-labelledby="outstation-title">
        <div className="trip">
          <div className="trip-text">
            <span className="label muted rv">Self-drive outstation</span>
            <h2 id="outstation-title" className="display rv">
              Go beyond <em className="ital">Goa.</em>
            </h2>
            <p className="rv">
              Relocating to Bangalore, a meeting in Mumbai, or the Konkan coast: take the car across the border with a plan that suits the trip.
            </p>
            <ul className="tenets tenets-lg">
              {OUTSTATION.map((t, i) => (
                <li key={t.title} className="rv">
                  <span className="num display ital">{listNum(i + 1)}</span>
                  <div>
                    <h3 className="display">{t.title}</h3>
                    <p>{t.text}</p>
                  </div>
                </li>
              ))}
            </ul>
            <a className="btn rv" href={whatsappUrl(`Hi ${BRAND.name}! I'm planning an outstation trip from Goa. Can we discuss the options?`)} target="_blank" rel="noopener noreferrer">
              Plan your journey <Arrow />
            </a>
          </div>
          <div className="trip-map rv">
            <Image
              src="/images/design/outstation-map.webp"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              alt="Illustrated map of India's west coast, with routes from Goa north to Pune and Mumbai and south-east to Bangalore"
            />
          </div>
        </div>
      </section>

      {/* JOURNAL */}
      <section className="sec wrap" aria-labelledby="journal-title">
        <div className="sec-head">
          <span className="label rv">The Journal</span>
          <h2 id="journal-title" className="display rv">
            Notes from <em className="ital">the road.</em>
          </h2>
          <Link className="ul label on more rv" href="/blogs">
            All stories <Arrow />
          </Link>
        </div>
        <div className="posts">
          {posts.map((p) => (
            <Link key={p.slug} href={`/blogs/${p.slug}`} className="post rv">
              <div className="ph">
                <Image src={p.image} alt="" fill sizes="(max-width: 1024px) 100vw, 50vw" />
              </div>
              <span className="label muted">{p.category}</span>
              <h3 className="display">{p.title}</h3>
              <p>{p.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* BY THE NUMBERS */}
      <section className="sec dark wrap" aria-labelledby="stats-title">
        <div className="sec-head">
          <span className="label rv">Our guests</span>
          <h2 id="stats-title" className="display rv">
            By the <em className="ital">numbers.</em>
          </h2>
        </div>
        <dl className="stats">
          {STATS.map((s) => (
            <div key={s.label} className="stat rv">
              <dt className="label">{s.label}</dt>
              <dd className="display">{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* DELIVERY LOCATIONS */}
      <section className="sec wrap" aria-labelledby="places-title">
        <div className="sec-head">
          <span className="label rv">Doorstep delivery</span>
          <h2 id="places-title" className="display rv">
            We deliver across <em className="ital">Goa.</em>
          </h2>
          <p className="rv">Free delivery and pickup at popular locations. Tell us where you are, and we&apos;ll bring the keys.</p>
        </div>
        <div className="deliver">
          <div className="deliver-map rv">
            <Image
              src="/images/design/delivery-map.webp"
              fill
              sizes="(max-width: 1024px) 100vw, 30vw"
              alt="Illustrated map of Goa with delivery pins along the beaches from north to south, and both airports and the train stations marked"
            />
          </div>
          <div className="places">
            {REGIONS.map((r) => (
              <div key={r.title} className="place-col rv">
                <h3 className="display">{r.title}</h3>
                <p>{r.text}</p>
                <ul>
                  {r.places.map((p) => <li key={p}>{p}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="sec tone wrap" aria-labelledby="faq-title">
        <div className="split">
          <div className="aside">
            <span className="label muted rv">Questions</span>
            <h2 id="faq-title" className="display rv" style={{ marginTop: 18 }}>
              Before you <em className="ital">book.</em>
            </h2>
            <Link className="ul label on rv" href="/faq" style={{ marginTop: 20 }}>
              All questions <Arrow />
            </Link>
          </div>
          <div className="main">
            <Faqs items={HOME_FAQS} openFirst />
          </div>
        </div>
      </section>

      {/* RESERVE */}
      <section id="reserve" className="reserve dark wrap" aria-labelledby="reserve-title">
        <div className="res-grid">
          <div className="intro">
            <h2 id="reserve-title" className="display rv">
              Reserve <em className="ital">a car.</em>
            </h2>
            <p className="rv">Tell us when and where. We&apos;ll confirm availability and the price on WhatsApp or by phone.</p>
          </div>
          <div className="res-form">
            <BookingForm idPrefix="home" />
          </div>
        </div>
      </section>
    </>
  );
}
