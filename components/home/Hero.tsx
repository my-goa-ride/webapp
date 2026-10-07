import Image from "next/image";
import { BRAND } from "@/lib/brand";
import ReserveLink from "../ReserveLink";
import { sceneBack, sceneFront, sceneMid } from "./sceneMarkup";

// The brand wordmark, one letter per span so each rises in turn; parts after
// the first are set in italic, as in the design.
function Wordmark() {
  let n = 0;
  // The design sizes an 8-letter name at 14.5vw (one line), and on phones each
  // 4-letter part at 27vw (a part per line); longer names shrink to fit.
  const parts = BRAND.wordmark;
  const scale = Math.min(1, 8 / parts.join("").length);
  const scalePhone = Math.min(1, 4.5 / Math.max(...parts.map((p) => p.length)));
  return (
    <div className="wm display" style={{ "--wm-scale": scale, "--wm-scale-m": scalePhone } as React.CSSProperties}>
      {parts.map((part, w) => (
        <span key={w} className={w > 0 ? "wd ital" : "wd"}>
          {Array.from(part).map((ch, i) => {
            const delay = 1.5 + n++ * 0.05 + w * 0.03;
            return (
              <span key={i} className="lt" style={{ animationDelay: `${delay.toFixed(2)}s` }}>
                {ch}
              </span>
            );
          })}
        </span>
      ))}
    </div>
  );
}

const CAPTIONS = [
  { cls: "c-dawn", clock: "06:10", place: "Morning in Assagao" },
  { cls: "c-noon", clock: "12:40", place: "Noon at Palolem" },
  { cls: "c-dusk", clock: "18:25", place: "Dusk on the Mandovi" },
  { cls: "c-night", clock: "22:15", place: "Night in Panjim" },
];

export default function Hero() {
  return (
    <section className="day-hero" aria-label={`${BRAND.name}: the coast, at your own pace`}>
      <div className="layers" aria-hidden="true" dangerouslySetInnerHTML={{ __html: sceneBack }} />

      <div className="wm-par" aria-hidden="true">
        <div className="wm-ink cyc"><Wordmark /></div>
        <div className="wm-glow cyc"><Wordmark /></div>
      </div>

      <div className="layers" aria-hidden="true" dangerouslySetInnerHTML={{ __html: sceneMid }} />

      <div className="car-x">
        <div className="car-par">
          <div className="roll">
            <div className="float">
              <div className="sunshadow cyc" aria-hidden="true" />
              <div className="beam cyc" aria-hidden="true" />
              <Image
                className="car-lit cyc"
                src="/images/design/hero-car.webp"
                width={1600}
                height={614}
                priority
                sizes="(max-width: 720px) 94vw, min(58vw, 880px)"
                alt="A dark grey compact SUV driving along the coast road"
              />
              <span className="lamp lamp-front cyc" aria-hidden="true" />
              <span className="lamp lamp-rear cyc" aria-hidden="true" />
              <div className="pool cyc" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>

      <div className="layers" aria-hidden="true" dangerouslySetInnerHTML={{ __html: sceneFront }} />

      <div className="ui cyc">
        <div className="ui-top">
          <div>
            <div className="label" style={{ opacity: 0.7, marginBottom: 10 }}>Self-drive car rental, Goa</div>
            <div className="caps">
              {CAPTIONS.map((c, i) => (
                <div key={c.cls} className={`cap cyc ${c.cls}`} aria-hidden={i > 0 ? true : undefined}>
                  <span className="clock display">{c.clock}</span>
                  <span className="place display ital">{c.place}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="daybar" aria-hidden="true">
            <div className="track"><div className="runner cyc"><i /></div></div>
            <div className="ticks label"><span>Dawn</span><span>Noon</span><span>Dusk</span><span>Night</span></div>
          </div>
        </div>
        <div className="ui-bottom">
          <h1 className="tagline display">
            The coast, at your own <em className="ital">pace.</em>
          </h1>
          <div className="ui-cta">
            <ReserveLink className="ul label on">Reserve a car</ReserveLink>
            <span className="label" style={{ opacity: 0.7 }}>Scroll to explore</span>
          </div>
        </div>
      </div>
    </section>
  );
}
