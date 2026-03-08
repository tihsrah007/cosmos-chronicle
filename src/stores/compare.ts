const COMPARE_KEY = "terranova_compare";

export interface CompareSelection {
  itemA?: string;
  itemB?: string;
}

export function loadCompare(): CompareSelection {
  try {
    const raw = sessionStorage.getItem(COMPARE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveCompare(state: CompareSelection) {
  try {
    sessionStorage.setItem(COMPARE_KEY, JSON.stringify(state));
  } catch {}
}

export function clearCompare() {
  sessionStorage.removeItem(COMPARE_KEY);
}
