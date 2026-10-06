"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { BIKES } from "@/lib/bikes";
import { CARS, formatPrice } from "@/lib/cars";
import { splitLast } from "@/lib/format";
import { stopEscape, usePopover } from "./usePopover";

interface Option {
  id: string;
  name: string;
  detail: string;
  price?: number;
  image?: string;
  group?: "Cars" | "Bikes";
}

const ANY: Option = { id: "any", name: "Any available car", detail: "We'll suggest what's free on your dates" };
const OPTIONS: Option[] = [
  ANY,
  ...CARS.map((c): Option => ({
    id: c.id, name: c.name, price: c.pricePerDay, image: c.image, group: "Cars",
    detail: `${c.type} · ${c.transmission} · ${c.seats} seats`,
  })),
  ...BIKES.map((b): Option => ({
    id: b.id, name: b.name, price: b.pricePerDay, image: b.image, group: "Bikes",
    detail: `${b.type} · ${b.engine}`,
  })),
];

// The list's sections: "any" on its own, then cars and bikes under sticky labels.
const GROUPS = [
  { label: undefined, options: [ANY] },
  { label: "Cars", options: OPTIONS.filter((o) => o.group === "Cars") },
  { label: "Bikes", options: OPTIONS.filter((o) => o.group === "Bikes") },
];

function Thumb({ o }: { o: Option }) {
  if (o.id === ANY.id) return <span className="vs-thumb vs-any display" aria-hidden="true">{CARS.length}</span>;
  return (
    <span className="vs-thumb" aria-hidden="true">
      {o.image && <Image src={o.image} alt="" width={112} height={80} sizes="56px" />}
    </span>
  );
}

function Name({ name }: { name: string }) {
  const [head, last] = splitLast(name);
  return <>{head} <em className="ital">{last}</em></>;
}

function Chevron() {
  return (
    <svg className="vs-chev" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
      <path d="M2 5l5 5 5-5" />
    </svg>
  );
}

// The booking form's vehicle picker: a listbox with photos and prices in place of a
// plain <select>. The chosen id is submitted through a hidden input named `name`.
export default function VehicleSelect({ id, labelId, name, value, onChange }: {
  id: string;
  labelId: string;
  name: string;
  value: string;
  onChange: (id: string) => void;
}) {
  const { open, up, root, button, show: openPopover, hide } = usePopover(460);
  const [active, setActive] = useState(0);
  const list = useRef<HTMLUListElement>(null);
  const typed = useRef({ text: "", at: 0 });
  const listId = useId();

  const selected = OPTIONS.find((o) => o.id === value) ?? ANY;
  const optId = (i: number) => `${listId}-${i}`;

  const show = () => {
    setActive(Math.max(0, OPTIONS.indexOf(selected)));
    openPopover();
  };
  const choose = (i: number) => {
    onChange(OPTIONS[i].id);
    hide();
  };

  useEffect(() => {
    if (open) list.current?.focus({ preventScroll: true });
  }, [open]);

  // Keep the highlighted option in view by scrolling the list only, never the page.
  useEffect(() => {
    const l = list.current;
    const el = open && l && document.getElementById(optId(active));
    if (!l || !el) return;
    const header = 40; // room for the sticky group label
    if (el.offsetTop - header < l.scrollTop) l.scrollTop = el.offsetTop - header;
    else if (el.offsetTop + el.offsetHeight > l.scrollTop + l.clientHeight) l.scrollTop = el.offsetTop + el.offsetHeight - l.clientHeight + 6;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, active]);

  const onListKey = (e: React.KeyboardEvent) => {
    const last = OPTIONS.length - 1;
    const step: Record<string, number> = { ArrowDown: 1, ArrowUp: -1, PageDown: 5, PageUp: -5, Home: -Infinity, End: Infinity };
    if (e.key in step) {
      e.preventDefault();
      setActive((a) => Math.min(Math.max(a + step[e.key], 0), last));
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      choose(active);
    } else if (e.key === "Escape") {
      stopEscape(e);
      hide();
    } else if (e.key === "Tab") {
      hide(false);
    } else if (e.key.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey) {
      // Type-ahead: jump to the next vehicle whose name starts with what was typed.
      const now = e.timeStamp;
      typed.current = { text: (now - typed.current.at < 700 ? typed.current.text : "") + e.key.toLowerCase(), at: now };
      const q = typed.current.text;
      // A fresh letter starts searching after the current option, so repeats cycle through matches.
      const from = q.length === 1 ? active + 1 : active;
      const order = [...OPTIONS.keys()].map((k) => (from + k) % OPTIONS.length);
      const hit = order.find((k) => OPTIONS[k].name.toLowerCase().startsWith(q));
      if (hit !== undefined) setActive(hit);
    }
  };

  const onButtonKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      show();
    }
  };

  return (
    <div className={open ? "vs open" : "vs"} ref={root}>
      <input type="hidden" name={name} value={value} />
      <button
        ref={button}
        id={id}
        type="button"
        className="vs-btn"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-labelledby={`${labelId} ${id}`}
        onClick={() => (open ? hide() : show())}
        onKeyDown={onButtonKey}
      >
        <Thumb o={selected} />
        <span className="vs-txt">
          <span className="vs-name display"><Name name={selected.name} /></span>
          <span className="vs-detail">{selected.detail}</span>
        </span>
        {selected.price && (
          <span className="vs-price">
            <span className="display">{formatPrice(selected.price)}</span>
            <span className="vs-detail">/ day</span>
          </span>
        )}
        <Chevron />
      </button>

      {open && (
        <ul
          ref={list}
          id={listId}
          className={up ? "pop vs-list up" : "pop vs-list"}
          role="listbox"
          tabIndex={-1}
          aria-labelledby={labelId}
          aria-activedescendant={optId(active)}
          onKeyDown={onListKey}
        >
          {GROUPS.map(({ label, options }) => (
            <li key={label ?? "any"} role={label ? "group" : "presentation"} aria-labelledby={label && `${listId}-${label}`}>
              {label && <span id={`${listId}-${label}`} className="vs-group label">{label}</span>}
              {options.map((o) => {
                const i = OPTIONS.indexOf(o);
                return (
                  <div
                    key={o.id}
                    id={optId(i)}
                    role="option"
                    aria-selected={o.id === selected.id}
                    className={i === active ? "vs-opt on" : "vs-opt"}
                    onPointerMove={() => i !== active && setActive(i)}
                    onClick={() => choose(i)}
                  >
                    <Thumb o={o} />
                    <span className="vs-txt">
                      <span className="vs-name"><Name name={o.name} /></span>
                      <span className="vs-detail">{o.detail}</span>
                    </span>
                    {o.price && <span className="vs-price">{formatPrice(o.price)}</span>}
                    <svg className="vs-check" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                      <path d="M2 7.5l3.2 3L12 3.5" />
                    </svg>
                  </div>
                );
              })}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
