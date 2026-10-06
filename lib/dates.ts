// Calendar dates as "yyyy-mm-dd" strings in local time, the format the booking form submits.

const pad = (n: number) => String(n).padStart(2, "0");

export function iso(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function parseIso(s: string) {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function addDays(s: string, n: number) {
  const d = parseIso(s);
  d.setDate(d.getDate() + n);
  return iso(d);
}

// Same day in another month, clamped to that month's length (31 Jan + 1 month = 28/29 Feb).
export function addMonths(s: string, n: number) {
  const d = parseIso(s);
  const day = d.getDate();
  d.setDate(1);
  d.setMonth(d.getMonth() + n);
  d.setDate(Math.min(day, new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate()));
  return iso(d);
}

/** "Tue, 20 Oct" */
export function shortDate(s: string) {
  return parseIso(s).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });
}

/** "09:30" -> "9:30 AM" */
export function time12(t: string) {
  const [h, m] = t.split(":").map(Number);
  return `${h % 12 || 12}:${pad(m)} ${h < 12 ? "AM" : "PM"}`;
}
