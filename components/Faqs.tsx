import type { Faq } from "@/lib/content";

export default function Faqs({ items, openFirst }: { items: Faq[]; openFirst?: boolean }) {
  return (
    <div className="qa">
      {items.map((f, i) => (
        <details key={f.q} open={openFirst && i === 0}>
          <summary className="display">
            {f.q}
            <span className="sign" aria-hidden="true" />
          </summary>
          <div className="ans">{f.a}</div>
        </details>
      ))}
    </div>
  );
}
