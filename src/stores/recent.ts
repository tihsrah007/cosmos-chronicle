const RECENT_KEY = "terranova_recent";
const MAX_RECENT = 15;

export interface RecentItem {
  path: string;
  label: string;
  domain?: string;
  visitedAt: number;
}

export function loadRecent(): RecentItem[] {
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addRecent(item: Omit<RecentItem, "visitedAt">) {
  try {
    let list = loadRecent();
    // Remove existing entry for same path
    list = list.filter((r) => r.path !== item.path);
    list.unshift({ ...item, visitedAt: Date.now() });
    if (list.length > MAX_RECENT) list = list.slice(0, MAX_RECENT);
    localStorage.setItem(RECENT_KEY, JSON.stringify(list));
  } catch {}
}

export function clearRecent() {
  localStorage.removeItem(RECENT_KEY);
}
