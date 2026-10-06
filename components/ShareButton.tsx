"use client";

import { useState } from "react";

// The older copy route, for browsers that refuse the Clipboard API (no focus, no permission).
function copyWithSelection(text: string) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "");
  ta.style.cssText = "position:fixed;opacity:0;pointer-events:none";
  document.body.append(ta);
  ta.select();
  const ok = document.execCommand("copy");
  ta.remove();
  return ok;
}

const LABELS = { idle: "Share this story", copied: "Link copied", failed: "Couldn't copy the link" };

// On phones, the system share sheet; on desktop (where that sheet is a clunky OS window), copies the link.
export default function ShareButton({ title }: { title: string }) {
  const [status, setStatus] = useState<keyof typeof LABELS>("idle");

  const share = async () => {
    const url = window.location.href;
    if (navigator.share && window.matchMedia("(pointer: coarse)").matches) {
      try {
        await navigator.share({ title, url });
      } catch {
        // The visitor closed the share sheet.
      }
      return;
    }
    const ok = (await navigator.clipboard?.writeText(url).then(() => true, () => false)) || copyWithSelection(url);
    setStatus(ok ? "copied" : "failed");
    setTimeout(() => setStatus("idle"), 2500);
  };

  return (
    <button type="button" className="ul label link-btn" onClick={share}>
      <span aria-live="polite">{LABELS[status]}</span>
    </button>
  );
}
