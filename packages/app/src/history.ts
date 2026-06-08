const KEY = "recipe-history";
const MAX = 20;

export interface HistoryEntry {
  id: string;
  title: string;
  href: string;
  viewedAt: string;
}

export function pushHistory(entry: Omit<HistoryEntry, "viewedAt">) {
  const list = getHistory().filter((e) => e.id !== entry.id);
  list.unshift({ ...entry, viewedAt: new Date().toISOString() });
  localStorage.setItem(KEY, JSON.stringify(list.slice(0, MAX)));
}

export function getHistory(): HistoryEntry[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}
