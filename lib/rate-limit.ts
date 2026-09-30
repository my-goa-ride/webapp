import "server-only";

// In-memory sliding window: a few submissions per visitor per minute. It lives in
// the server's memory, so on hosting that runs several instances each one counts
// separately. Good enough to stop a form being hammered, not a hard guarantee.

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 3;

const hits = new Map<string, number[]>();

export function checkRateLimit(key: string): { allowed: true } | { allowed: false; retryAfterMs: number } {
  const now = Date.now();

  // Drop anything outside the window, so the map can't grow without bound.
  for (const [k, times] of hits) {
    const recent = times.filter((t) => now - t < WINDOW_MS);
    if (recent.length) hits.set(k, recent);
    else hits.delete(k);
  }

  const times = hits.get(key) ?? [];
  if (times.length >= MAX_REQUESTS) {
    return { allowed: false, retryAfterMs: WINDOW_MS - (now - times[0]) };
  }
  hits.set(key, [...times, now]);
  return { allowed: true };
}
