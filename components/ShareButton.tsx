"use client";

import { useState } from "react";

// Uses the system share sheet where there is one, otherwise copies the link.
export default function ShareButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // The visitor closed the share sheet.
      }
      return;
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button type="button" className="ul label link-btn" onClick={share}>
      <span aria-live="polite">{copied ? "Link copied" : "Share this story"}</span>
    </button>
  );
}
