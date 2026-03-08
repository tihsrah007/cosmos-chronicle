import { create } from "zustand";

export interface StudyBoardItem {
  id: string; // `${domain}-${name}`
  name: string;
  domain: string;
  category: string;
  description: string;
  details?: string;
  facts?: string[];
  keyFigures?: { label: string; value: string }[];
  sources?: { label: string; url?: string }[];
  coordinates?: [number, number];
  addedAt: number;
}

interface StudyBoardState {
  items: StudyBoardItem[];
  addItem: (item: Omit<StudyBoardItem, "id" | "addedAt">) => void;
  removeItem: (id: string) => void;
  moveItem: (fromIdx: number, toIdx: number) => void;
  hasItem: (id: string) => boolean;
  clear: () => void;
}

const STORAGE_KEY = "terranova_study_board";

function loadFromStorage(): StudyBoardItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveToStorage(items: StudyBoardItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {}
}

export const useStudyBoard = create<StudyBoardState>((set, get) => ({
  items: loadFromStorage(),

  addItem: (item) => {
    const id = `${item.domain}-${item.name}`;
    if (get().items.some((i) => i.id === id)) return;
    const newItems = [...get().items, { ...item, id, addedAt: Date.now() }];
    saveToStorage(newItems);
    set({ items: newItems });
  },

  removeItem: (id) => {
    const newItems = get().items.filter((i) => i.id !== id);
    saveToStorage(newItems);
    set({ items: newItems });
  },

  moveItem: (fromIdx, toIdx) => {
    const items = [...get().items];
    const [moved] = items.splice(fromIdx, 1);
    items.splice(toIdx, 0, moved);
    saveToStorage(items);
    set({ items });
  },

  hasItem: (id) => get().items.some((i) => i.id === id),

  clear: () => {
    saveToStorage([]);
    set({ items: [] });
  },
}));

export function makeStudyBoardId(domain: string, name: string) {
  return `${domain}-${name}`;
}
