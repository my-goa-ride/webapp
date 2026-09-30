import type { Metadata } from "next";
import Link from "next/link";
import PageHead from "@/components/PageHead";
import { BRAND, telHref } from "@/lib/brand";
import { CANCELLATION, TERMS } from "@/lib/content";
import { roman, slugify } from "@/lib/format";

export const metadata: Metadata = {
  title: "Terms & conditions",
  description: `The terms that apply to every vehicle rented from ${BRAND.name}, including the cancellation policy.`,
};

export default function TermsPage() {
  return (
    <div className="page">
      <PageHead
        label="Terms & conditions"
        title="The small"
        italic="print."
        intro={`These terms govern every vehicle rented from ${BRAND.name}. By booking, you agree to them.`}
      />

      <section className="wrap sec-tight">
        <div className="split">
          <div className="aside">
            <div className="sticky">
              <Link className="ul label" href="/guidelines">Back to guidelines</Link>
              <ul className="index label">
                <li><a href="#cancellation">Cancellation policy</a></li>
                {TERMS.map((t) => (
                  <li key={t.title}><a href={`#${slugify(t.title)}`}>{t.title}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="main">
            <div id="cancellation" className="callout">
              <span className="label" style={{ color: "var(--accent-light)" }}>Read this first</span>
              <h2 className="display">
                Cancellation <em className="ital">policy</em>
              </h2>
              <ul className="bullets">
                {CANCELLATION.map((p) => <li key={p}>{p}</li>)}
              </ul>
            </div>
            <div style={{ marginTop: "clamp(40px, 5vw, 72px)" }}>
              {TERMS.map((t, i) => (
                <div key={t.title} id={slugify(t.title)} className="block rv">
                  <span className="label muted">{roman(i + 1)}.</span>
                  <h3 className="display">{t.title}</h3>
                  <ul className="bullets">
                    {t.items.map((x) => <li key={x}>{x}</li>)}
                  </ul>
                </div>
              ))}
            </div>
            <p className="muted" style={{ marginTop: 40 }}>
              Questions about these terms? Call us on <a className="ul" href={telHref}>{BRAND.phone}</a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
