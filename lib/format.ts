// Two-digit numbers for the design's numbered lists (01, 02, 03).
export function listNum(n: number) {
  return String(n).padStart(2, "0");
}

const VARIANT_WORDS = new Set(["Automatic", "Sunroof"]);

/**
 * Splits a heading so its last word can be set in italic: "Mahindra Thar" -> ["Mahindra", "Thar", ""].
 * Trailing variant words ("Sunroof Automatic") are returned as the tail so the model name keeps the accent.
 */
export function splitLast(text: string): [string, string, string] {
  const words = text.split(" ");
  let end = words.length;
  while (end > 1 && VARIANT_WORDS.has(words[end - 1])) end--;
  return [words.slice(0, end - 1).join(" "), words[end - 1], words.slice(end).join(" ")];
}

export function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
