// Two-digit numbers for the design's numbered lists (01, 02, 03).
export function listNum(n: number) {
  return String(n).padStart(2, "0");
}

// Splits a heading so its last word can be set in italic: "Mahindra Thar" -> ["Mahindra", "Thar"].
export function splitLast(text: string): [string, string] {
  const i = text.lastIndexOf(" ");
  return i < 0 ? ["", text] : [text.slice(0, i), text.slice(i + 1)];
}

export function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
