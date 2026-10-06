"use client";

import { useState } from "react";

type Problem = "valueMissing" | "typeMismatch" | "patternMismatch" | "tooShort" | "tooLong";
export type FieldMessages = Record<string, Partial<Record<Problem, string>>>;

const ORDER: Problem[] = ["valueMissing", "typeMismatch", "patternMismatch", "tooShort", "tooLong"];

// Our own messages under each field in place of the browser's validation bubbles. The form
// keeps its required/pattern/minLength rules (with noValidate), and they're read from here.
export function useFieldErrors(messages: FieldMessages) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const messageFor = (el: HTMLInputElement | HTMLTextAreaElement) => {
    // Browsers only enforce minLength on text a person typed, and count spaces; check it here instead.
    const len = el.value.trim().length;
    const short = el.minLength > 0 && len > 0 && len < el.minLength;
    const problem = len === 0 && el.required ? "valueMissing" : short ? "tooShort" : ORDER.find((p) => el.validity[p]);
    return problem ? (messages[el.name]?.[problem] ?? "Please check this.") : null;
  };

  /** Checks every field; `extra` adds errors the browser can't see (such as the date pickers). */
  const check = (form: HTMLFormElement, extra: Record<string, string> = {}) => {
    const next: Record<string, string> = {};
    for (const el of Array.from(form.elements)) {
      if (!(el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) || !(el.name in messages)) continue;
      const msg = messageFor(el);
      if (msg) next[el.name] = msg;
    }
    Object.assign(next, extra);
    setErrors(next);
    return next;
  };

  // Clears a field's message as soon as what's typed is acceptable.
  const onInput = (e: React.FormEvent<HTMLFormElement>) => {
    const el = e.target;
    if (!(el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) || !errors[el.name]) return;
    if (!messageFor(el)) clear(el.name);
  };

  const clear = (name: string) =>
    setErrors((prev) => {
      if (!(name in prev)) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });

  /** Props for a field and its message, linked for screen readers. */
  const field = (name: string, id: string) => ({
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${id}-error` : undefined,
  });

  return { errors, check, onInput, clear, field };
}

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p className="field-error" id={`${id}-error`}>
      {message}
    </p>
  );
}
