"use client";

import { useState } from "react";
import { sendContactEnquiry } from "@/app/actions/enquiry";
import { BRAND } from "@/lib/brand";
import { Arrow } from "./icons";

// The message is sent by a server action (published to SNS). If that fails, the
// visitor is pointed to our email address instead.
export default function ContactForm() {
  const [sentBy, setSentBy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
    <form className="lform" onSubmit={submit}>
      <div className="field">
        <label className="label" htmlFor="c-name">Your name</label>
        <input className="inp-light" id="c-name" name="name" autoComplete="name" required minLength={2} maxLength={100} />
      </div>
      <div className="field">
        <label className="label" htmlFor="c-email">Email</label>
        <input className="inp-light" id="c-email" name="email" type="email" autoComplete="email" required maxLength={254} />
      </div>
      <div className="field">
        <label className="label" htmlFor="c-msg">Message</label>
        <textarea className="inp-light" id="c-msg" name="message" required minLength={10} maxLength={2000} placeholder="How can we help?" />
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
