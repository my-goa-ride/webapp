// Inner-page header in the design's collection-heading style:
// a label, a large title whose last part is set in the accent colour, and a short intro.
export default function PageHead({ label, title, italic, intro }: { label: string; title: string; italic: string; intro?: React.ReactNode }) {
  return (
    <header className="page-head wrap">
      <span className="label">{label}</span>
      <h1 className="display">
        {title} <em className="ital">{italic}</em>
      </h1>
      {intro && <p>{intro}</p>}
    </header>
  );
}
