"use client";

import { useEffect, useId, useRef, useState } from "react";
import { time12 } from "@/lib/dates";
import { stopEscape, usePopover } from "./usePopover";

const slot = (h: number, m: number) => `${String(h).padStart(2, "0")}:${m ? "30" : "00"}`;
const range = (from: number, to: number) => Array.from({ length: (to - from) * 2 }, (_, i) => slot(from + Math.floor(i / 2), i % 2 * 30));

// Half-hour slots across the day, in the order a holiday runs.
const SECTIONS = [
  { label: "Morning", slots: range(6, 12) },
  { label: "Afternoon", slots: range(12, 17) },
  { label: "Evening", slots: range(17, 22) },
  { label: "Late night", slots: [...range(22, 24), ...range(0, 6)] },
];
const SLOTS = SECTIONS.flatMap((s) => s.slots);
// Handovers run 9 AM to 9 PM; other times are by arrangement.
const inHours = (t: string) => t >= "09:00" && t <= "21:00";

function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
      <circle cx="8" cy="8" r="6.5" />
      <path d="M8 4.5V8l2.5 1.5" />
    </svg>
  );
}

// A grid of half-hour slots in place of the browser's time input. Submits "HH:MM".
export default function TimeField({ id, labelId, name, value, onChange, dialogLabel, note = "Handover 9 AM to 9 PM. Earlier or later on request." }: {
  id: string;
  labelId: string;
  name: string;
  value: string;
  onChange: (time: string) => void;
  dialogLabel: string;
  /** The line under the slots. */
  note?: string;
}) {
  const { open, up, root, button, show: openPopover, hide } = usePopover(380);
  const [active, setActive] = useState(0);
  const list = useRef<HTMLDivElement>(null);
  const listId = useId();
  const optId = (i: number) => `${listId}-${i}`;

  const show = () => {
    setActive(Math.max(0, SLOTS.indexOf(value)));
    openPopover();
  };
  const choose = (i: number) => {
    onChange(SLOTS[i]);
    hide();
  };

  useEffect(() => {
    if (open) list.current?.focus({ preventScroll: true });
  }, [open]);

  // Keep the highlighted slot in view by scrolling the panel only.
  useEffect(() => {
    const l = list.current;
    const el = open && l && document.getElementById(optId(active));
    if (!l || !el) return;
    const top = el.offsetTop - 36;
    if (top < l.scrollTop) l.scrollTop = top;
    else if (el.offsetTop + el.offsetHeight > l.scrollTop + l.clientHeight) l.scrollTop = el.offsetTop + el.offsetHeight - l.clientHeight + 8;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, active]);

  const onKey = (e: React.KeyboardEvent) => {
    // Up/down move a whole row: 4 slots wide, 3 on phones.
    const grid = list.current?.querySelector(".times-grid");
    const cols = grid ? getComputedStyle(grid).gridTemplateColumns.split(" ").length : 4;
    const step: Record<string, number> = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: cols, ArrowUp: -cols, Home: -Infinity, End: Infinity };
    if (e.key in step) {
      e.preventDefault();
      setActive((a) => Math.min(Math.max(a + step[e.key], 0), SLOTS.length - 1));
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      choose(active);
    } else if (e.key === "Escape") {
      stopEscape(e);
      hide();
    } else if (e.key === "Tab") {
      hide(false);
    }
  };

  return (
    <div className={`pick pick-time${open ? " open" : ""}`} ref={root}>
      <input type="hidden" name={name} value={value} />
      <button
        ref={button}
        id={id}
        type="button"
        className="pick-btn"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-labelledby={`${labelId} ${id}`}
        onClick={() => (open ? hide() : show())}
        onKeyDown={(e) => (e.key === "ArrowDown" || e.key === "ArrowUp") && (e.preventDefault(), show())}
      >
        <span>{time12(value)}</span>
        <ClockIcon />
      </button>

      {open && (
        <div className={`pop times${up ? " up" : ""}`}>
          <div
            ref={list}
            id={listId}
            className="times-list"
            role="listbox"
            tabIndex={-1}
            aria-label={dialogLabel}
            aria-activedescendant={optId(active)}
            onKeyDown={onKey}
          >
            {SECTIONS.map((s) => (
              <div key={s.label} role="group" aria-labelledby={`${listId}-${s.label}`}>
                <span id={`${listId}-${s.label}`} className="times-group label">{s.label}</span>
                <div className="times-grid">
                  {s.slots.map((t) => {
                    const i = SLOTS.indexOf(t);
                    const cls = ["slot", i === active && "on", !inHours(t) && "off-hours"].filter(Boolean).join(" ");
                    return (
                      <div
                        key={t}
                        id={optId(i)}
                        role="option"
                        aria-selected={t === value}
                        className={cls}
                        onPointerMove={() => i !== active && setActive(i)}
                        onClick={() => choose(i)}
                      >
                        {time12(t).replace(" ", " ")}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          <p className="times-note">{note}</p>
        </div>
      )}
    </div>
  );
}
