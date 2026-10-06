"use client";

import { useEffect, useRef, useState } from "react";
import { addDays, addMonths, iso, parseIso, shortDate } from "@/lib/dates";
import { stopEscape, usePopover } from "./usePopover";

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const weekday = (d: string) => (parseIso(d).getDay() + 6) % 7; // 0 = Monday

// Calendar keys, as in a native date grid.
const MOVES: Record<string, (d: string) => string> = {
  ArrowLeft: (d) => addDays(d, -1),
  ArrowRight: (d) => addDays(d, 1),
  ArrowUp: (d) => addDays(d, -7),
  ArrowDown: (d) => addDays(d, 7),
  Home: (d) => addDays(d, -weekday(d)),
  End: (d) => addDays(d, 6 - weekday(d)),
  PageUp: (d) => addMonths(d, -1),
  PageDown: (d) => addMonths(d, 1),
};

function CalendarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
      <rect x="1.5" y="2.5" width="13" height="12" rx="1.5" />
      <path d="M1.5 6.5h13M5 1v3M11 1v3" />
    </svg>
  );
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
      <path d={dir === "left" ? "M9 2L4 7l5 5" : "M5 2l5 5-5 5"} />
    </svg>
  );
}

interface Props {
  id: string;
  labelId: string;
  name: string;
  value: string;
  onChange: (date: string) => void;
  /** Today, read on the client. Until it's known the calendar can't open. */
  today?: string;
  /** Earliest choosable day; defaults to today. */
  min?: string;
  /** The booking's other end, to draw the range between pick-up and return. */
  rangeStart?: string;
  rangeEnd?: string;
  /** Shortcut chips under the calendar. */
  quick?: { label: string; value: string }[];
  invalid?: boolean;
  dialogLabel: string;
}

// A calendar in a panel in place of the browser's date input. Submits "yyyy-mm-dd"
// through a hidden input named `name`.
export default function DateField({ id, labelId, name, value, onChange, today, min, rangeStart, rangeEnd, quick, invalid, dialogLabel }: Props) {
  const { open, up, root, button, show: openPopover, hide } = usePopover(400);
  const floor = min ?? today ?? "";
  const [focusDay, setFocusDay] = useState(value || floor);
  const grid = useRef<HTMLDivElement>(null);

  const clamp = (d: string) => (d < floor ? floor : d);
  const show = () => {
    if (!today) return;
    setFocusDay(clamp(value || floor));
    openPopover();
  };
  const choose = (d: string) => {
    onChange(d);
    hide();
  };

  // Move keyboard focus to the focused day whenever it changes while open.
  useEffect(() => {
    if (open) grid.current?.querySelector<HTMLButtonElement>(`[data-day="${focusDay}"]`)?.focus({ preventScroll: true });
  }, [open, focusDay]);

  const onGridKey = (e: React.KeyboardEvent) => {
    const move = MOVES[e.key];
    if (!move) return;
    e.preventDefault();
    setFocusDay((day) => clamp(move(day)));
  };

  // The month on show follows the focused day.
  const first = parseIso(focusDay || floor || "2000-01-01");
  first.setDate(1);
  const monthIso = iso(first);
  const lead = (first.getDay() + 6) % 7;
  const days = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate();
  const cells: (string | null)[] = [
    ...Array<null>(lead).fill(null),
    ...Array.from({ length: days }, (_, i) => addDays(monthIso, i)),
  ];
  while (cells.length % 7) cells.push(null);
  const weeks = Array.from({ length: cells.length / 7 }, (_, w) => cells.slice(w * 7, w * 7 + 7));
  const canPrev = !floor || monthIso > floor.slice(0, 8) + "01";
  // The pick-up day is marked even before a return is chosen; the band needs both ends.
  const lo = rangeStart && (!rangeEnd || rangeStart < rangeEnd) ? rangeStart : undefined;
  const hi = lo && rangeEnd ? rangeEnd : undefined;

  const go = (n: number) => setFocusDay(clamp(addMonths(focusDay, n)));

  return (
    <div className={`pick${open ? " open" : ""}`} ref={root}>
      <input type="hidden" name={name} value={value} />
      <button
        ref={button}
        id={id}
        type="button"
        className={`pick-btn${value ? "" : " is-empty"}${invalid ? " invalid" : ""}`}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-labelledby={`${labelId} ${id}`}
        aria-describedby={invalid ? `${id}-error` : undefined}
        onClick={() => (open ? hide() : show())}
        onKeyDown={(e) => e.key === "ArrowDown" && (e.preventDefault(), show())}
      >
        <span>{value ? shortDate(value) : "Choose date"}</span>
        <CalendarIcon />
      </button>

      {open && (
        <div
          className={`pop cal${up ? " up" : ""}`}
          role="dialog"
          aria-label={dialogLabel}
          onKeyDown={(e) => e.key === "Escape" && (stopEscape(e), hide())}
        >
          <div className="cal-head">
            <button type="button" className="cal-nav" onClick={() => go(-1)} disabled={!canPrev} aria-label="Previous month">
              <Chevron dir="left" />
            </button>
            <span className="cal-title display" aria-live="polite">
              {first.toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
            </span>
            <button type="button" className="cal-nav" onClick={() => go(1)} aria-label="Next month">
              <Chevron dir="right" />
            </button>
          </div>
          <div className="cal-grid" role="grid" ref={grid} onKeyDown={onGridKey}>
            <div className="cal-row" role="row">
              {WEEKDAYS.map((d) => <span key={d} className="cal-wd" role="columnheader">{d}</span>)}
            </div>
            {weeks.map((week, w) => (
              <div key={w} className="cal-row" role="row">
                {week.map((d, i) => {
                  if (!d) return <span key={i} role="gridcell" />;
                  const off = d < floor;
                  const cls = [
                    "cal-day",
                    d === value && "sel",
                    d === today && "today",
                    lo && hi && d > lo && d < hi && "in",
                    lo && d === lo && (hi ? "lo ranged" : "lo"),
                    hi && d === hi && "hi",
                  ].filter(Boolean).join(" ");
                  return (
                    <span key={d} role="gridcell" className={cls} aria-selected={d === value}>
                      <button
                        type="button"
                        data-day={d}
                        tabIndex={d === focusDay ? 0 : -1}
                        disabled={off}
                        aria-label={parseIso(d).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                        onClick={() => choose(d)}
                        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), choose(d))}
                      >
                        {Number(d.slice(8))}
                      </button>
                    </span>
                  );
                })}
              </div>
            ))}
          </div>
          {quick && quick.length > 0 && (
            <div className="cal-quick">
              {quick.map((q) => (
                <button key={q.label} type="button" className={q.value === value ? "on" : undefined} onClick={() => choose(q.value)}>
                  {q.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
