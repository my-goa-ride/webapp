import type { Metadata } from "next";
import Link from "next/link";
import PageHead from "@/components/PageHead";
import { Arrow } from "@/components/icons";
import { PRIVACY, RULES, TIPS } from "@/lib/content";
import { listNum } from "@/lib/format";

export const metadata: Metadata = {
  title: "Rental guidelines",
  description: "The rules of the road for a self-drive rental in Goa: safety, where the car can go, looking after it, and practical driving tips.",
};

export default function GuidelinesPage() {
  return (
    <div className="page">
      <PageHead
        label="Guidelines"
        title="Rules of"
        italic="the road."
        intro="A few simple rules keep every rental safe and easy. Please read them before you drive."
      />

      <section className="wrap sec-tight" aria-labelledby="rules-title">
        <div className="split">
          <div className="aside">
            <div className="sticky">
              <h2 id="rules-title" className="display">
                Rental <em className="ital">rules</em>
              </h2>
              <p>The standard terms that apply to every self-drive rental.</p>
              <Link className="ul label on" href="/terms-and-conditions">
                Full terms &amp; conditions <Arrow />
              </Link>
            </div>
          </div>
          <div className="main">
            {RULES.map((r, i) => (
              <div key={r.title} className="block rv">
                <span className="num display ital">{listNum(i + 1)}</span>
                <h3 className="display">{r.title}</h3>
                <ul className="bullets">
                  {r.items.map((x) => <li key={x}>{x}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec dark wrap" aria-labelledby="tips-title">
        <div className="sec-head">
          <span className="label rv">Essential tips</span>
          <h2 id="tips-title" className="display rv">
            Driving in Goa: <em className="ital">what to expect.</em>
          </h2>
          <p className="rv">A few things worth knowing that save time, fines and hassle.</p>
        </div>
        <div className="rows">
          {TIPS.map((t, i) => (
            <div key={t.title} className="row rv">
              <span className="idx display ital">{listNum(i + 1)}</span>
              <h3 className="display">{t.title}</h3>
              <div className="body"><p>{t.text}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section id="privacy" className="sec wrap" aria-labelledby="privacy-title">
        <div className="split">
          <div className="aside">
            <h2 id="privacy-title" className="display">
              Privacy <em className="ital">policy</em>
            </h2>
          </div>
          <div className="main">
            {PRIVACY.map((p) => (
              <div key={p.title} className="block">
                <h3 className="display">{p.title}</h3>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
