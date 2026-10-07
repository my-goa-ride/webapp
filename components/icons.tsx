// The design uses thin stroke icons drawn inline; these are the few the site needs.

export function Arrow({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size * (10 / 22)} viewBox="0 0 22 10" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
      <path d="M0 5h20" />
      <path d="M16 1l4 4-4 4" />
    </svg>
  );
}

export function ArrowUp({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 15V3M4 8l5-5 5 5" />
    </svg>
  );
}

export function Close() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
      <path d="M1 1l12 12M13 1L1 13" />
    </svg>
  );
}

export function WhatsApp({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
      <path d="M26.6 5.4A14.8 14.8 0 0 0 3.2 23.2L1.2 31l7.9-2.1a14.8 14.8 0 0 0 7 1.8c8.2 0 14.9-6.7 14.9-14.9 0-4-1.6-7.7-4.4-10.4zM16.1 28.2c-2.3 0-4.5-.6-6.3-1.8l-.5-.3-4.7 1.3 1.3-4.6-.3-.5a12.3 12.3 0 1 1 10.5 5.9zm6.7-9.2c-.4-.2-2.2-1.1-2.5-1.2-.3-.1-.6-.2-.8.2-.2.4-1 1.2-1.2 1.5-.2.2-.4.3-.8.1-1.2-.5-2.1-1.1-3-1.9-.8-.7-1.5-1.6-2-2.5-.2-.4 0-.6.2-.8l.6-.7c.1-.2.3-.4.4-.6.1-.2 0-.4 0-.6l-1.1-2.8c-.3-.7-.6-.6-.8-.6h-.7c-.4 0-.7.2-1 .5-.8.8-1.3 1.8-1.3 3 .1 1.5.7 2.8 1.5 3.9 1.6 2.4 3.7 4.3 6.3 5.6.5.2 1.2.5 2 .7.4.1.9.2 1.5.2l.9-.1c1.1-.2 2-.9 2.5-1.7.2-.4.3-.8.3-1.2l-.1-.5c-.1-.2-.3-.3-.7-.5z" />
    </svg>
  );
}

// Thin line icons for the delivery section, all on a 24px grid.
function Line({ size, children }: { size: number; children: React.ReactNode }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}

export function Pin({ size = 16 }: { size?: number }) {
  return (
    <Line size={size}>
      <path d="M12 21s-6.5-5.8-6.5-11a6.5 6.5 0 0 1 13 0c0 5.2-6.5 11-6.5 11z" />
      <circle cx="12" cy="10" r="2.3" />
    </Line>
  );
}

export function Plane({ size = 16 }: { size?: number }) {
  return (
    <Line size={size}>
      <path d="M12 2.5c.8 0 1.3.8 1.3 2v5l7.7 4.3v2l-7.7-2.2v4.3l2.2 1.7v1.6L12 20.2l-3.5 1v-1.6l2.2-1.7v-4.3L3 15.8v-2l7.7-4.3v-5c0-1.2.5-2 1.3-2z" />
    </Line>
  );
}

export function Train({ size = 16 }: { size?: number }) {
  return (
    <Line size={size}>
      <rect x="5.5" y="3" width="13" height="13.5" rx="3" />
      <path d="M5.5 10h13M9 6.5h6M8.5 16.5 6.5 21M15.5 16.5l2 4.5" />
      <circle cx="9" cy="13.2" r=".6" fill="currentColor" />
      <circle cx="15" cy="13.2" r=".6" fill="currentColor" />
    </Line>
  );
}

export function Bus({ size = 16 }: { size?: number }) {
  return (
    <Line size={size}>
      <rect x="4" y="3" width="16" height="14.5" rx="2.5" />
      <path d="M4 10.5h16M8 6.5h8M7.5 17.5V20M16.5 17.5V20" />
      <circle cx="8" cy="14" r=".6" fill="currentColor" />
      <circle cx="16" cy="14" r=".6" fill="currentColor" />
    </Line>
  );
}

export function Hotel({ size = 16 }: { size?: number }) {
  return (
    <Line size={size}>
      <path d="M3 21h18M5 21V4.5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1V21M15 9h3a1 1 0 0 1 1 1v11" />
      <path d="M8.5 7.5h3M8.5 11h3M8.5 14.5h3M10 21v-3" />
    </Line>
  );
}

export function Waves({ size = 16 }: { size?: number }) {
  return (
    <Line size={size}>
      <path d="M7.5 11.5a4.5 4.5 0 0 1 9 0M12 3.5V5M5.6 6.1l1 1M18.4 6.1l-1 1" />
      <path d="M2.5 15.5c1.6 0 1.6-1.3 3.2-1.3s1.6 1.3 3.2 1.3 1.6-1.3 3.1-1.3 1.6 1.3 3.2 1.3 1.6-1.3 3.2-1.3 1.6 1.3 3.1 1.3" />
      <path d="M2.5 19.5c1.6 0 1.6-1.3 3.2-1.3s1.6 1.3 3.2 1.3 1.6-1.3 3.1-1.3 1.6 1.3 3.2 1.3 1.6-1.3 3.2-1.3 1.6 1.3 3.1 1.3" />
    </Line>
  );
}

export function Palm({ size = 16 }: { size?: number }) {
  return (
    <Line size={size}>
      <path d="M11 21c.2-4 .9-7.6 2.6-10.6" />
      <path d="M13.6 10.4C12.8 7.6 10 6.3 6.8 7.1M13.6 10.4c.8-2.8 3.6-4 6.6-2.8M13.6 10.4c-2.8-.2-5.2 1.6-6.1 4.2M13.6 10.4c2.8.4 4.8 2.4 5.2 5.1M13.6 10.4c-.3-2.6.6-5 2.6-6.6" />
      <path d="M6.5 21h11" />
    </Line>
  );
}
