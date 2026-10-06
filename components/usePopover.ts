"use client";

import { useEffect, useRef, useState } from "react";

// Open/close state shared by the booking form's pickers: closes on a click outside,
// hands focus back to the trigger, and opens upward when there's no room below.
export function usePopover(height: number) {
  const [open, setOpen] = useState(false);
  const [up, setUp] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);

  const show = () => {
    // Above, the fixed site header takes its share of the room.
    const r = root.current?.getBoundingClientRect();
    const header = document.querySelector(".head")?.getBoundingClientRect().bottom ?? 0;
    setUp(!!r && window.innerHeight - r.bottom < height + 16 && r.top - header > height + 16);
    setOpen(true);
  };
  const hide = (refocus = true) => {
    setOpen(false);
    if (refocus) button.current?.focus();
  };

  useEffect(() => {
    if (!open) return;
    const away = (e: PointerEvent) => !root.current?.contains(e.target as Node) && setOpen(false);
    document.addEventListener("pointerdown", away);
    return () => document.removeEventListener("pointerdown", away);
  }, [open]);

  return { open, up, root, button, show, hide };
}

// Escape closes only the picker, never the booking dialog around it.
export function stopEscape(e: React.KeyboardEvent) {
  e.preventDefault();
  e.stopPropagation();
}
