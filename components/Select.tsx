"use client";

import { useEffect, useId, useRef, useState } from "react";
import { stopEscape, usePopover } from "./usePopover";

export interface Option<T extends string | number> {
  value: T;
  label: string;
}

// A small dropdown for the light pages (the fleet filters), in place of a native <select>.
export default function Select<T extends string | number>({ id, labelId, value, options, onChange, alignEnd }: {
  id: string;
  labelId: string;
  value: T;
  options: Option<T>[];
  onChange: (value: T) => void;
  /** Open the panel from the right edge, for a field on the right of the screen. */
  alignEnd?: boolean;
}) {
  const { open, up, root, button, show: openPopover, hide } = usePopover(options.length * 44 + 16);
  const [active, setActive] = useState(0);
  const list = useRef<HTMLUListElement>(null);
  const listId = useId();
  const optId = (i: number) => `${listId}-${i}`;
  const current = options.find((o) => o.value === value) ?? options[0];

  const show = () => {
    setActive(Math.max(0, options.indexOf(current)));
    openPopover();
  };
  const choose = (i: number) => {
    onChange(options[i].value);
    hide();
  };

  useEffect(() => {
    if (open) list.current?.focus({ preventScroll: true });
  }, [open]);

  const onKey = (e: React.KeyboardEvent) => {
    const step: Record<string, number> = { ArrowDown: 1, ArrowUp: -1, Home: -Infinity, End: Infinity };
    if (e.key in step) {
      e.preventDefault();
      setActive((a) => Math.min(Math.max(a + step[e.key], 0), options.length - 1));
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
    <div className={open ? "sel open" : "sel"} ref={root}>
      <button
        ref={button}
        id={id}
        type="button"
        className="sel-btn"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-labelledby={`${labelId} ${id}`}
        onClick={() => (open ? hide() : show())}
        onKeyDown={(e) => (e.key === "ArrowDown" || e.key === "ArrowUp") && (e.preventDefault(), show())}
      >
        <span>{current.label}</span>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
          <path d="M2 5l5 5 5-5" />
        </svg>
      </button>
      {open && (
        <ul
          ref={list}
          id={listId}
          className={["sel-list", up && "up", alignEnd && "end"].filter(Boolean).join(" ")}
          role="listbox"
          tabIndex={-1}
          aria-labelledby={labelId}
          aria-activedescendant={optId(active)}
          onKeyDown={onKey}
        >
          {options.map((o, i) => (
            <li
              key={o.value}
              id={optId(i)}
              role="option"
              aria-selected={o.value === value}
              className={i === active ? "on" : undefined}
              onPointerMove={() => i !== active && setActive(i)}
              onClick={() => choose(i)}
            >
              {o.label}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                <path d="M2 7.5l3.2 3L12 3.5" />
              </svg>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
