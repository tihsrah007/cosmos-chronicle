import { create } from "zustand";

export interface Note {
  id: string;
  itemId: string; // e.g. "geology-Himalayas"
  text: string;
  pinned: boolean;
  createdAt: number;
  updatedAt: number;
}

interface NotesState {
  notes: Note[];
  addNote: (itemId: string, text: string) => void;
  updateNote: (id: string, text: string) => void;
  deleteNote: (id: string) => void;
  togglePin: (id: string) => void;
  getNotesForItem: (itemId: string) => Note[];
  searchNotes: (query: string) => Note[];
}

const STORAGE_KEY = "terranova_notes";

function load(): Note[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function save(notes: Note[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch {}
}

export const useNotes = create<NotesState>((set, get) => ({
  notes: load(),

  addNote: (itemId, text) => {
    const note: Note = {
      id: `note-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      itemId,
      text,
      pinned: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    const next = [...get().notes, note];
    save(next);
    set({ notes: next });
  },

  updateNote: (id, text) => {
    const next = get().notes.map((n) =>
      n.id === id ? { ...n, text, updatedAt: Date.now() } : n
    );
    save(next);
    set({ notes: next });
  },

  deleteNote: (id) => {
    const next = get().notes.filter((n) => n.id !== id);
    save(next);
    set({ notes: next });
  },

  togglePin: (id) => {
    const next = get().notes.map((n) =>
      n.id === id ? { ...n, pinned: !n.pinned } : n
    );
    save(next);
    set({ notes: next });
  },

  getNotesForItem: (itemId) =>
    get().notes.filter((n) => n.itemId === itemId),

  searchNotes: (query) => {
    const q = query.toLowerCase();
    return get().notes.filter((n) => n.text.toLowerCase().includes(q));
  },
}));
