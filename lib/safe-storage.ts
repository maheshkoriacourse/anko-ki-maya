/**
 * Anko Ki Maya — safe localStorage helpers (shared by storage.ts + lang.tsx).
 */

export function safeGet<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    void err;
    return null;
  }
}

export function safeSet(key: string, value: unknown): boolean {
  if (typeof window === "undefined") return false;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}