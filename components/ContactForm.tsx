"use client";

import { useState } from "react";
import { sendContactEnquiry } from "@/app/actions/enquiry";
import { BRAND } from "@/lib/brand";
import { Arrow } from "./icons";
import { FieldError, useFieldErrors } from "./useFieldErrors";

const MESSAGES = {
  name: { valueMissing: "Please tell us your name.", tooShort: "Please write your full name." },
  email: { valueMissing: "We need your email to reply.", typeMismatch: "That email doesn't look right." },
  message: { valueMissing: "Write us a short message.", tooShort: "A few more words, please (at least 10 characters)." },
};

// The message is sent by a server action (published to SNS). If that fails, the
// visitor is pointed to our email address instead.
export default function ContactForm() {
  const [sentBy, setSentBy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const v = useFieldErrors(MESSAGES);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = v.check(e.currentTarget);
    const first = ["name", "email", "message"].find((n) => errors[n]);
    if (first) {
      document.getElementById({ name: "c-name", email: "c-email", message: "c-msg" }[first]!)?.focus();
      return;
    }
    const data = new FormData(e.currentTarget);
    setError(null);
    setPending(true);
    const result = await sendContactEnquiry(data).catch(() => null);
    setPending(false);
    if (result?.ok) setSentBy(String(data.get("name")).trim().split(" ")[0]);
    else setError(result?.error ?? "We couldn't send that just now.");
  };

  if (sentBy) {
    return (
      <div className="lthanks" role="status">
        <span className="label muted">Message sent</span>
        <h2 className="display">
          Thank <em className="ital">you.</em>
        </h2>
        <p>{`Thanks, ${sentBy}. We'll reply to your email soon.`}</p>
        <button type="button" className="btn btn-ghost" style={{ alignSelf: "flex-start" }} onClick={() => setSentBy(null)}>
          Write another message
        </button>
      </div>
    );
  }

  return (
    <form className="lform" onSubmit={submit} onInput={v.onInput} noValidate>
      <div className="field">
        <label className="label" htmlFor="c-name">Your name</label>
        <input className="inp-light" id="c-name" name="name" autoComplete="name" required minLength={2} maxLength={100} {...v.field("name", "c-name")} />
        <FieldError id="c-name" message={v.errors.name} />
      </div>
      <div className="field">
        <label className="label" htmlFor="c-email">Email</label>
        <input className="inp-light" id="c-email" name="email" type="email" autoComplete="email" required maxLength={254} {...v.field("email", "c-email")} />
        <FieldError id="c-email" message={v.errors.email} />
      </div>
      <div className="field">
        <label className="label" htmlFor="c-msg">Message</label>
        <textarea className="inp-light" id="c-msg" name="message" required minLength={10} maxLength={2000} placeholder="How can we help?" {...v.field("message", "c-msg")} />
        <FieldError id="c-msg" message={v.errors.message} />
      </div>
      <div className="hp" aria-hidden="true">
        <label htmlFor="c-website">Leave this empty</label>
        <input id="c-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      {error && (
        <p className="form-error" role="alert">
          {error} You can also write to us at <a className="ul" href={`mailto:${BRAND.email}`}>{BRAND.email}</a>.
        </p>
      )}
      <button type="submit" className="btn" style={{ alignSelf: "flex-start" }} disabled={pending}>
        {pending ? "Sending…" : "Send message"} <Arrow />
      </button>
    </form>
  );
}
