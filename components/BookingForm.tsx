"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { BRAND, whatsappUrl } from "@/lib/brand";
import { CARS, formatPrice, getCar } from "@/lib/cars";
import { sendBookingEnquiry } from "@/app/actions/enquiry";
import { Arrow } from "./icons";

export const ANY_CAR = "any";
export const RESERVE_EVENT = "reserve:car";

// Today's date for the date inputs' `min`. Read on the client only, so a page
// prerendered at build time doesn't carry a stale date.
const noop = () => () => {};
const today = () => new Date().toLocaleDateString("en-CA");

const readable = (date: string, time: string) =>
  `${new Date(`${date}T00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}, ${time}`;

interface Props {
  defaultCarId?: string;
  /** Home page only: follow "Reserve this car" links on the page. */
  listen?: boolean;
  idPrefix: string;
}

// The request is sent by a server action (published to SNS). If that fails, the
// visitor can still send the same request as a pre-filled WhatsApp message.
export default function BookingForm({ defaultCarId = ANY_CAR, listen, idPrefix }: Props) {
  const [carId, setCarId] = useState(defaultCarId);
  const [error, setError] = useState<{ text: string; whatsapp?: string } | null>(null);
  const [pending, setPending] = useState(false);
  const [sentTo, setSentTo] = useState<string | null>(null);
  const min = useSyncExternalStore(noop, today, () => undefined);

  useEffect(() => {
    if (!listen) return;
    const pick = (e: Event) => {
      setCarId((e as CustomEvent<string>).detail);
      setSentTo(null);
    };
    window.addEventListener(RESERVE_EVENT, pick);
    return () => window.removeEventListener(RESERVE_EVENT, pick);
  }, [listen]);

  const car = getCar(carId);
  const carName = car?.name ?? "Any available car";
  const id = (name: string) => `${idPrefix}-${name}`;

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const f = Object.fromEntries(data) as Record<string, string>;
    if (`${f.untilDate}T${f.untilTime}` <= `${f.fromDate}T${f.fromTime}`) {
      setError({ text: "The return has to be after the pick-up." });
      return;
    }
    setError(null);
    setPending(true);
    const result = await sendBookingEnquiry(data).catch(() => null);
    setPending(false);
    if (result?.ok) {
      setSentTo(f.phone);
      return;
    }
    const message = [
      `Hi ${BRAND.name}! I'd like to reserve a car.`,
      "",
      `Car: ${carName}${car ? ` (${formatPrice(car.pricePerDay)} / day)` : ""}`,
      `Name: ${f.name}`,
      `Deliver to: ${f.deliverTo}`,
      `Collect from: ${f.collectFrom}`,
      `From: ${readable(f.fromDate, f.fromTime)}`,
      `Until: ${readable(f.untilDate, f.untilTime)}`,
    ].join("\n");
    setError({ text: result?.error ?? "We couldn't send that just now.", whatsapp: whatsappUrl(message) });
  };

  if (sentTo) {
    return (
      <div className="thanks" role="status">
        <span className="label" style={{ color: "var(--muted-on-ink)" }}>Request sent</span>
        <h3 className="display">
          Thank <em className="ital">you.</em>
        </h3>
        <p>{`We've got your request for the ${carName}. We'll call or WhatsApp you on ${sentTo} to confirm availability and the price.`}</p>
        <div className="actions">
          <button type="button" className="ghost" onClick={() => setSentTo(null)}>
            Send another request
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={submit}>
      <div className="field">
        <label className="label" htmlFor={id("car")}>Car</label>
        <select className="inp" id={id("car")} name="carId" value={carId} onChange={(e) => setCarId(e.target.value)}>
          <option value={ANY_CAR}>Any available car</option>
          {CARS.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name} · {formatPrice(c.pricePerDay)} / day
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label className="label" htmlFor={id("name")}>Your name</label>
        <input className="inp" id={id("name")} name="name" type="text" autoComplete="name" required minLength={2} maxLength={100} placeholder="Full name" />
      </div>

      <div className="field">
        <label className="label" htmlFor={id("phone")}>Phone or WhatsApp</label>
        <input className="inp" id={id("phone")} name="phone" type="tel" autoComplete="tel" required pattern="\+?[0-9\s\-]{10,16}" title="10 to 16 digits, with an optional country code" placeholder="+91 98765 43210" />
      </div>

      <div className="hp" aria-hidden="true">
        <label htmlFor={id("website")}>Leave this empty</label>
        <input id={id("website")} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="row2">
        <div className="field">
          <label className="label" htmlFor={id("where")}>Where should we bring it?</label>
          <input className="inp" id={id("where")} name="deliverTo" type="text" required placeholder="Villa, hotel or airport" />
        </div>
        <div className="field">
          <label className="label" htmlFor={id("return")}>Where do we collect it?</label>
          <input className="inp" id={id("return")} name="collectFrom" type="text" required placeholder="Same place, or elsewhere" />
        </div>
      </div>

      <div className="row2">
        <div className="field">
          <label className="label" htmlFor={id("from")}>From</label>
          <input className="inp" id={id("from")} name="fromDate" type="date" required min={min} />
        </div>
        <div className="field">
          <label className="label" htmlFor={id("from-time")}>At</label>
          <input className="inp" id={id("from-time")} name="fromTime" type="time" required defaultValue="10:00" />
        </div>
      </div>

      <div className="row2">
        <div className="field">
          <label className="label" htmlFor={id("until")}>Until</label>
          <input className="inp" id={id("until")} name="untilDate" type="date" required min={min} />
        </div>
        <div className="field">
          <label className="label" htmlFor={id("until-time")}>At</label>
          <input className="inp" id={id("until-time")} name="untilTime" type="time" required defaultValue="10:00" />
        </div>
      </div>

      {error && (
        <p className="form-error" role="alert">
          {error.text}
          {error.whatsapp && (
            <>
              {" "}
              <a className="ul" href={error.whatsapp} target="_blank" rel="noopener noreferrer">Send it on WhatsApp instead</a>.
            </>
          )}
        </p>
      )}

      <button type="submit" className="send" disabled={pending}>
        <span>{pending ? "Sending…" : "Request this car"}</span>
        <Arrow size={26} />
      </button>
      <p className="fine">No payment now. We confirm availability first, then share payment details.</p>
    </form>
  );
}
