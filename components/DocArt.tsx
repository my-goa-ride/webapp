// Drawings of the two documents a driver brings, in the logo's colours.

const INK = "#2B1A14";
const CORAL = "#EE6B4D";
const GOLD = "#F2C14E";
const CARD = "#FBF7F0";
const SAGE = "#DCE3D2";

// A driving licence: coral header band, photo, details and a small car.
export function LicenceArt() {
  return (
    <svg viewBox="0 0 160 108" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="6" width="152" height="98" rx="11" fill={CARD} stroke={INK} strokeWidth="2" />
      <path d="M15 6h130a11 11 0 0 1 11 11v9H4v-9A11 11 0 0 1 15 6z" fill={CORAL} stroke={INK} strokeWidth="2" />
      <path d="M16 16h34M16 21h20" stroke={CARD} strokeWidth="2.5" />
      <circle cx="140" cy="16" r="5" fill={GOLD} stroke={INK} strokeWidth="1.5" />
      <rect x="16" y="36" width="36" height="46" rx="5" fill={SAGE} stroke={INK} strokeWidth="2" />
      <circle cx="34" cy="53" r="7" fill={CARD} stroke={INK} strokeWidth="2" />
      <path d="M22 80c2-8 7-12 12-12s10 4 12 12" fill={CARD} stroke={INK} strokeWidth="2" />
      <path d="M62 40h50M62 50h36M62 60h44" stroke={INK} strokeWidth="3" opacity="0.35" />
      <path d="M16 93h40" stroke={INK} strokeWidth="2.5" opacity="0.25" />
      <path d="M110 84l5-9h20l5 9" fill={CARD} stroke={INK} strokeWidth="2" />
      <rect x="104" y="83" width="42" height="11" rx="4" fill={CORAL} stroke={INK} strokeWidth="2" />
      <circle cx="114" cy="96" r="3.5" fill={INK} />
      <circle cx="136" cy="96" r="3.5" fill={INK} />
    </svg>
  );
}

// A second photo ID: a passport with an ID card resting on it.
export function PhotoIdArt() {
  return (
    <svg viewBox="0 0 160 108" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="62" y="3" width="80" height="102" rx="7" fill={INK} transform="rotate(6 102 54)" />
      <g transform="rotate(6 102 54)">
        <circle cx="102" cy="40" r="15" stroke={GOLD} strokeWidth="2" />
        <path d="M87 40h30M102 25c-6 5-6 25 0 30M102 25c6 5 6 25 0 30" stroke={GOLD} strokeWidth="1.5" />
        <path d="M86 68h32M92 76h20" stroke={GOLD} strokeWidth="2.5" />
      </g>
      <rect x="10" y="50" width="88" height="54" rx="8" fill={CARD} stroke={INK} strokeWidth="2" transform="rotate(-4 54 77)" />
      <g transform="rotate(-4 54 77)">
        <rect x="18" y="59" width="26" height="32" rx="4" fill={SAGE} stroke={INK} strokeWidth="2" />
        <circle cx="31" cy="71" r="5" fill={CARD} stroke={INK} strokeWidth="1.8" />
        <path d="M23 90c1.5-6 4.5-8.5 8-8.5s6.5 2.5 8 8.5" fill={CARD} stroke={INK} strokeWidth="1.8" />
        <path d="M52 64h36M52 73h26M52 82h32" stroke={INK} strokeWidth="2.6" opacity="0.35" />
        <path d="M18 98h70" stroke={CORAL} strokeWidth="3" />
      </g>
    </svg>
  );
}
