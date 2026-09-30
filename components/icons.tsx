// The design uses thin stroke icons drawn inline; these are the few the site needs.

export function Arrow({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size * (10 / 22)} viewBox="0 0 22 10" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
      <path d="M0 5h20" />
      <path d="M16 1l4 4-4 4" />
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
