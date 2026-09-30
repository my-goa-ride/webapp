const NUMERALS = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x", "xi", "xii"];

// Lower-case roman numerals for the design's numbered lists (i., ii., iii.).
export function roman(n: number) {
  return NUMERALS[n - 1] ?? String(n);
}

// Splits a heading so its last word can be set in italic: "Mahindra Thar" -> ["Mahindra", "Thar"].
export function splitLast(text: string): [string, string] {
  const i = text.lastIndexOf(" ");
  return i < 0 ? ["", text] : [text.slice(0, i), text.slice(i + 1)];
}

export function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
