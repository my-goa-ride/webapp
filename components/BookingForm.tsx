"use client";

import { useState, useSyncExternalStore } from "react";
import { BRAND, POLICY, whatsappUrl } from "@/lib/brand";
import { formatPrice } from "@/lib/cars";
import { addDays, time12 } from "@/lib/dates";
import { getVehicle } from "@/lib/vehicles";
import { sendBookingEnquiry } from "@/app/actions/enquiry";
import DateField from "./DateField";
import { Arrow } from "./icons";
import TimeField from "./TimeField";
import { FieldError, useFieldErrors } from "./useFieldErrors";
import VehicleSelect from "./VehicleSelect";

export const ANY_CAR = "any";
export const RESERVE_EVENT = "reserve:car";

// Today's date for the calendars. Read on the client only, so a page prerendered
// at build time doesn't carry a stale date.
const noop = () => () => {};
const todayIso = () => new Date().toLocaleDateString("en-CA");

const readable = (date: string, time: string) =>
  `${new Date(`${date}T00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}, ${time12(time)}`;

const MESSAGES = {
  name: { valueMissing: "Please tell us your name.", tooShort: "Please write your full name." },
  phone: {
    valueMissing: "We need a number to confirm the booking on.",
    patternMismatch: "That number doesn't look right. Use 10 to 16 digits, with the country code if you like.",
  },
  deliverTo: { valueMissing: "Tell us where to bring it." },
  collectFrom: { valueMissing: "Tell us where to collect it." },
};

interface Props {
  defaultCarId?: string;
  idPrefix: string;
  /** Told when the visitor picks another vehicle, so a surrounding title can follow. */
  onVehicleChange?: (id: string) => void;
}

// The request is sent by a server action (published to SNS). If that fails, the
// visitor can still send the same request as a pre-filled WhatsApp message.
export default function BookingForm({ defaultCarId = ANY_CAR, idPrefix, onVehicleChange }: Props) {
  const [carId, setCarId] = useState(defaultCarId);
  const [error, setError] = useState<{ text: string; whatsapp?: string } | null>(null);
  const [pending, setPending] = useState(false);
  const [sentTo, setSentTo] = useState<string | null>(null);
  const today = useSyncExternalStore(noop, todayIso, () => undefined);
  const [fromDate, setFromDate] = useState("");
  const [untilDate, setUntilDate] = useState("");
  const [fromTime, setFromTime] = useState("10:00");
  const [untilTime, setUntilTime] = useState<string>(POLICY.returnBy);
  const v = useFieldErrors(MESSAGES);

  const car = getVehicle(carId);
  const carName = car?.name ?? "Any available car";
  const noun = car?.kind === "bike" ? "bike" : "car";
  const id = (name: string) => `${idPrefix}-${name}`;

  // A new pick-up date after the return clears the return, rather than keeping a backwards booking.
  const pickFrom = (d: string) => {
    setFromDate(d);
    v.clear("fromDate");
    if (untilDate && untilDate < d) setUntilDate("");
  };
  const pickUntil = (d: string) => {
    setUntilDate(d);
    v.clear("untilDate");
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const f = Object.fromEntries(data) as Record<string, string>;
    const errors = v.check(e.currentTarget, {
      ...(!fromDate && { fromDate: "Choose a pick-up date." }),
      ...(!untilDate && { untilDate: "Choose a return date." }),
    });
    // Focus the first field with a problem, in the order they appear.
    const first = ["name", "phone", "deliverTo", "collectFrom", "fromDate", "untilDate"].find((n) => errors[n]);
    if (first) {
      const ids: Record<string, string> = { name: "name", phone: "phone", deliverTo: "where", collectFrom: "return", fromDate: "from", untilDate: "until" };
      document.getElementById(id(ids[first]))?.focus();
      return;
    }
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
      `Hi ${BRAND.name}! I'd like to reserve a ${noun}.`,
      "",
      `Vehicle: ${carName}${car ? ` (${formatPrice(car.pricePerDay)} / day)` : ""}`,
      `Name: ${f.name}`,
      `Deliver to: ${f.deliverTo}`,
      `Collect from: ${f.collectFrom}`,
      `From: ${readable(f.fromDate, f.fromTime)}`,
      `Until: ${readable(f.untilDate, f.untilTime)}${f.untilTime > POLICY.returnBy ? " (after the return cut-off, so that day is charged)" : ""}`,
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
    <form className="form" onSubmit={submit} onInput={v.onInput} noValidate>
      <div className="field">
        <label className="label" id={id("car-label")} htmlFor={id("car")}>Vehicle</label>
        <VehicleSelect id={id("car")} labelId={id("car-label")} name="carId" value={carId} onChange={(v) => { setCarId(v); onVehicleChange?.(v); }} />
      </div>

      <div className="row2">
        <div className="field">
          <label className="label" htmlFor={id("name")}>Your name</label>
          <input className="inp" id={id("name")} name="name" type="text" autoComplete="name" required minLength={2} maxLength={100} placeholder="Full name" {...v.field("name", id("name"))} />
          <FieldError id={id("name")} message={v.errors.name} />
        </div>
        <div className="field">
          <label className="label" htmlFor={id("phone")}>Phone or WhatsApp</label>
          <input className="inp" id={id("phone")} name="phone" type="tel" autoComplete="tel" required pattern="\+?[0-9\s\-]{10,16}" placeholder="+91 00000 00000" {...v.field("phone", id("phone"))} />
          <FieldError id={id("phone")} message={v.errors.phone} />
        </div>
      </div>

      <div className="hp" aria-hidden="true">
        <label htmlFor={id("website")}>Leave this empty</label>
        <input id={id("website")} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="row2">
        <div className="field">
          <label className="label" htmlFor={id("where")}>Deliver to</label>
          <input className="inp" id={id("where")} name="deliverTo" type="text" required placeholder="Hotel or airport" {...v.field("deliverTo", id("where"))} />
          <FieldError id={id("where")} message={v.errors.deliverTo} />
        </div>
        <div className="field">
          <label className="label" htmlFor={id("return")}>Collect from</label>
          <input className="inp" id={id("return")} name="collectFrom" type="text" required placeholder="Same place?" {...v.field("collectFrom", id("return"))} />
          <FieldError id={id("return")} message={v.errors.collectFrom} />
        </div>
      </div>

      {/* Pick-up and return: one line each, or side by side in the booking dialog. */}
      <div className="whens">
        <div className="row2 when">
          <div className="field">
            <label className="label" id={id("from-label")} htmlFor={id("from")}>From</label>
            <DateField
              id={id("from")} labelId={id("from-label")} name="fromDate" dialogLabel="Choose the pick-up date"
              value={fromDate} onChange={pickFrom} today={today}
              rangeStart={fromDate} rangeEnd={untilDate}
              quick={today ? [{ label: "Today", value: today }, { label: "Tomorrow", value: addDays(today, 1) }] : undefined}
              invalid={!!v.errors.fromDate}
            />
            <FieldError id={id("from")} message={v.errors.fromDate} />
          </div>
          <div className="field">
            <label className="label" id={id("from-time-label")} htmlFor={id("from-time")}>At</label>
            <TimeField id={id("from-time")} labelId={id("from-time-label")} name="fromTime" dialogLabel="Pick-up time" value={fromTime} onChange={setFromTime} />
          </div>
        </div>

        <div className="row2 when">
          <div className="field">
            <label className="label" id={id("until-label")} htmlFor={id("until")}>Until</label>
            <DateField
              id={id("until")} labelId={id("until-label")} name="untilDate" dialogLabel="Choose the return date"
              value={untilDate} onChange={pickUntil} today={today} min={fromDate || today}
              rangeStart={fromDate} rangeEnd={untilDate}
              quick={fromDate ? [{ label: "3 days", value: addDays(fromDate, 3) }, { label: "5 days", value: addDays(fromDate, 5) }, { label: "A week", value: addDays(fromDate, 7) }] : undefined}
              invalid={!!v.errors.untilDate}
            />
            <FieldError id={id("until")} message={v.errors.untilDate} />
          </div>
          <div className="field">
            <label className="label" id={id("until-time-label")} htmlFor={id("until-time")}>At</label>
            <TimeField id={id("until-time")} labelId={id("until-time-label")} name="untilTime" dialogLabel="Return time" value={untilTime} onChange={setUntilTime}
              note={`Return by ${time12(POLICY.returnBy)}; a later return is charged for that day as well.`}
            />
          </div>
        </div>
      </div>

      {untilTime > POLICY.returnBy && (
        <p className="fine">{`Returns after ${time12(POLICY.returnBy)} are charged for the return day as well.`}</p>
      )}

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
        <span>{pending ? "Sending…" : `Request this ${noun}`}</span>
        <Arrow size={26} />
      </button>
      <p className="fine">No payment now. We confirm availability first, then share payment details.</p>
    </form>
  );
}
