"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "./icons";

// Scrollbars are hidden site-wide, so this round button is the quick way back up.
// It appears once the visitor is about a screen down the page.
export default function ScrollTop() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    let frame = 0;
    const check = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setShown(window.scrollY > window.innerHeight * 0.9));
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", check);
    };
  }, []);

  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    // Move keyboard focus back to the start of the page too.
    document.querySelector<HTMLElement>(".head .mark")?.focus({ preventScroll: true });
  };

  return (
    <button
      type="button"
      className={shown ? "to-top shown" : "to-top"}
      onClick={toTop}
      aria-label="Back to top"
      aria-hidden={!shown || undefined}
      tabIndex={shown ? undefined : -1}
    >
      <ArrowUp />
    </button>
  );
}
