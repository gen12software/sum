const RATE_LIMIT_MAX = 5;
const WINDOW_MS = 60 * 1000;
const MAX_ENTRIES = 500;

const store = new Map<string, { count: number; firstRequest: number }>();

function evictOldEntries() {
  if (store.size < MAX_ENTRIES) return;
  const now = Date.now();
  for (const [key, entry] of store) {
    if (now - entry.firstRequest > WINDOW_MS) store.delete(key);
    if (store.size < MAX_ENTRIES / 2) break;
  }
}

export function checkRateLimit(identifier: string): boolean {
  evictOldEntries();
  const now = Date.now();
  const entry = store.get(identifier);

  if (!entry || now - entry.firstRequest > WINDOW_MS) {
    store.set(identifier, { count: 1, firstRequest: now });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) return false;

  entry.count++;
  return true;
}
