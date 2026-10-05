import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHead from "@/components/PageHead";
import { Arrow } from "@/components/icons";
import { BRAND } from "@/lib/brand";
import { ABOUT_VALUES } from "@/lib/content";
import { listNum } from "@/lib/format";

export const metadata: Metadata = {
  title: "About",
  description: `The story behind ${BRAND.name} and how we look after every rental in Goa.`,
};

export default function AboutPage() {
  return (
    <div className="page">
      <PageHead
        label="Our story"
        title="Your journey,"
        italic="our care."
        intro="Exploring Goa should be easy, safe and memorable. That's the whole idea."
      />

      <section className="wrap sec-tight">
        <div className="split">
          <div className="aside">
            <div className="villa-sm rv">
              <Image src="/images/design/villa.webp" alt="A silver SUV waiting outside a white villa by the sea" fill sizes="(max-width: 1024px) 100vw, 33vw" />
            </div>
          </div>
          <div className="main">
            <p className="display lede rv">
              At {BRAND.name}, we believe exploring Goa should be effortless. We started with a love of good hospitality and good cars, and set out to raise the standard of car rental in the state.
            </p>
            <p className="muted rv">
              Whether you are cruising the coastal roads of North Goa or heading to a quiet retreat in the South, we&apos;ll find the car that suits your plans, and bring it to you.
            </p>
            <div style={{ marginTop: 40 }}>
              {ABOUT_VALUES.map((v, i) => (
                <div key={v.title} className="block rv">
                  <span className="label muted">{listNum(i + 1)}</span>
                  <h3 className="display">{v.title}</h3>
                  <p>{v.text}</p>
                </div>
              ))}
            </div>
            <Link className="btn rv" href="/cars" style={{ marginTop: 32 }}>
              Meet the fleet <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
