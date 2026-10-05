"use server";

import { headers } from "next/headers";
import { PublishCommand, SNSClient } from "@aws-sdk/client-sns";
import { formatPrice } from "@/lib/cars";
import { checkRateLimit } from "@/lib/rate-limit";
import { getVehicle } from "@/lib/vehicles";

// Form submissions are published to an SNS topic; whoever is subscribed to it
// (email, SMS) gets the enquiry. This runs on the server, so the AWS keys never
// reach the browser. See .env.example for the settings it needs.

export type EnquiryResult = { ok: true } | { ok: false; error: string };

// Not named AWS_*: Amplify reserves that prefix for its own variables.
const sns = new SNSClient({
  region: process.env.SNS_REGION,
  credentials:
    process.env.SNS_ACCESS_KEY_ID && process.env.SNS_SECRET_ACCESS_KEY
      ? { accessKeyId: process.env.SNS_ACCESS_KEY_ID, secretAccessKey: process.env.SNS_SECRET_ACCESS_KEY }
      : undefined, // fall back to the host's own role, if it has one
});

const PHONE = /^\+?[0-9\s-]{10,16}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const TIME = /^\d{2}:\d{2}$/;

const RULE = "━━━━━━━━━━━━━━━━━━━━━━━━━━━";

const field = (form: FormData, name: string) => {
  const value = form.get(name);
  return typeof value === "string" ? value.trim() : "";
};

const readable = (date: string, time: string) =>
  `${new Date(`${date}T00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}, ${time}`;

// SNS subjects must be plain ASCII on one line and under 100 characters.
const subjectLine = (text: string) =>
  text.replace(/[^\x20-\x7E]/g, "").replace(/\s+/g, " ").trim().slice(0, 99);

async function guard(form: FormData): Promise<EnquiryResult | "bot" | null> {
  // Honeypot: a hidden field people never see, but form-filling bots do.
  if (field(form, "website")) return "bot";

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const limit = checkRateLimit(ip);
  if (!limit.allowed) {
    return { ok: false, error: `Too many requests. Please try again in ${Math.ceil(limit.retryAfterMs / 1000)} seconds.` };
  }
  return null;
}

async function publish(subject: string, message: string): Promise<EnquiryResult> {
  const topicArn = process.env.SNS_TOPIC_ARN;
  if (!topicArn) {
    console.error("[enquiry] SNS_TOPIC_ARN is not set; the enquiry was not sent.");
    return { ok: false, error: "We couldn't send that just now." };
  }
  try {
    await sns.send(new PublishCommand({ TopicArn: topicArn, Subject: subjectLine(subject), Message: message }));
    return { ok: true };
  } catch (err) {
    console.error("[enquiry] SNS publish failed:", err);
    return { ok: false, error: "We couldn't send that just now." };
  }
}

export async function sendBookingEnquiry(form: FormData): Promise<EnquiryResult> {
  const blocked = await guard(form);
  if (blocked === "bot") return { ok: true }; // let the bot think it worked
  if (blocked) return blocked;

  const f = {
    name: field(form, "name"),
    phone: field(form, "phone"),
    deliverTo: field(form, "deliverTo"),
    collectFrom: field(form, "collectFrom"),
    fromDate: field(form, "fromDate"),
    fromTime: field(form, "fromTime"),
    untilDate: field(form, "untilDate"),
    untilTime: field(form, "untilTime"),
  };

  if (f.name.length < 2 || f.name.length > 100) return { ok: false, error: "Please enter your name." };
  if (!PHONE.test(f.phone)) return { ok: false, error: "Please enter a valid phone number." };
  if (!f.deliverTo || f.deliverTo.length > 200 || !f.collectFrom || f.collectFrom.length > 200) {
    return { ok: false, error: "Please tell us where to deliver and collect the car." };
  }
  if (![f.fromDate, f.untilDate].every((d) => DATE.test(d)) || ![f.fromTime, f.untilTime].every((t) => TIME.test(t))) {
    return { ok: false, error: "Please pick the dates and times." };
  }
  if (`${f.untilDate}T${f.untilTime}` <= `${f.fromDate}T${f.fromTime}`) {
    return { ok: false, error: "The return has to be after the pick-up." };
  }

  // Look the vehicle up here rather than trusting a name or price sent by the browser.
  const car = getVehicle(field(form, "carId"));
  const carName = car?.name ?? "Any available car";

  const message = [
    "New booking request",
    RULE,
    `Vehicle:       ${carName}${car ? ` (${formatPrice(car.pricePerDay)} / day)` : ""}`,
    "",
    `Name:          ${f.name}`,
    `Phone:         ${f.phone}`,
    "",
    `Deliver to:    ${f.deliverTo}`,
    `From:          ${readable(f.fromDate, f.fromTime)}`,
    "",
    `Collect from:  ${f.collectFrom}`,
    `Until:         ${readable(f.untilDate, f.untilTime)}`,
    RULE,
  ].join("\n");

  return publish(`Booking request - ${carName} - ${f.name}`, message);
}

export async function sendContactEnquiry(form: FormData): Promise<EnquiryResult> {
  const blocked = await guard(form);
  if (blocked === "bot") return { ok: true };
  if (blocked) return blocked;

  const name = field(form, "name");
  const email = field(form, "email");
  const text = field(form, "message");

  if (name.length < 2 || name.length > 100) return { ok: false, error: "Please enter your name." };
  if (!EMAIL.test(email) || email.length > 254) return { ok: false, error: "Please enter a valid email address." };
  if (text.length < 10 || text.length > 2000) {
    return { ok: false, error: "Please write a message between 10 and 2,000 characters." };
  }

  const message = [
    "New message from the contact form",
    RULE,
    `Name:   ${name}`,
    `Email:  ${email}`,
    "",
    text,
    RULE,
  ].join("\n");

  return publish(`Contact form - ${name}`, message);
}
