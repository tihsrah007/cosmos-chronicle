import { create } from "zustand";

export interface TrailStep {
  id: string;
  type: "topic" | "map-item" | "pulse" | "note" | "compare";
  label: string;
  /** e.g. slug, itemId, or pulse id */
  ref: string;
  domain?: string;
  addedAt: number;
}

export interface ResearchTrail {
  id: string;
  title: string;
  steps: TrailStep[];
  createdAt: number;
  updatedAt: number;
}

interface TrailsState {
  trails: ResearchTrail[];
  activeTrailId: string | null;
  createTrail: (title: string) => string;
  deleteTrail: (id: string) => void;
  renameTrail: (id: string, title: string) => void;
  addStep: (trailId: string, step: Omit<TrailStep, "id" | "addedAt">) => void;
  removeStep: (trailId: string, stepId: string) => void;
  reorderSteps: (trailId: string, fromIdx: number, toIdx: number) => void;
  setActive: (id: string | null) => void;
  getTrail: (id: string) => ResearchTrail | undefined;
}

const STORAGE_KEY = "terranova_trails";

function load(): ResearchTrail[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function save(trails: ResearchTrail[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trails));
  } catch {}
}

function uid() {
  return `trail-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
}

export const useTrails = create<TrailsState>((set, get) => ({
  trails: load(),
  activeTrailId: null,

  createTrail: (title) => {
    const id = uid();
    const trail: ResearchTrail = {
      id,
      title,
      steps: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    const next = [...get().trails, trail];
    save(next);
    set({ trails: next, activeTrailId: id });
    return id;
  },

  deleteTrail: (id) => {
    const next = get().trails.filter((t) => t.id !== id);
    save(next);
    set({ trails: next, activeTrailId: get().activeTrailId === id ? null : get().activeTrailId });
  },

  renameTrail: (id, title) => {
    const next = get().trails.map((t) =>
      t.id === id ? { ...t, title, updatedAt: Date.now() } : t
    );
    save(next);
    set({ trails: next });
  },

  addStep: (trailId, step) => {
    const next = get().trails.map((t) => {
      if (t.id !== trailId) return t;
      return {
        ...t,
        steps: [
          ...t.steps,
          { ...step, id: `step-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`, addedAt: Date.now() },
        ],
        updatedAt: Date.now(),
      };
    });
    save(next);
    set({ trails: next });
  },

  removeStep: (trailId, stepId) => {
    const next = get().trails.map((t) => {
      if (t.id !== trailId) return t;
      return { ...t, steps: t.steps.filter((s) => s.id !== stepId), updatedAt: Date.now() };
    });
    save(next);
    set({ trails: next });
  },

  reorderSteps: (trailId, fromIdx, toIdx) => {
    const next = get().trails.map((t) => {
      if (t.id !== trailId) return t;
      const steps = [...t.steps];
      const [moved] = steps.splice(fromIdx, 1);
      steps.splice(toIdx, 0, moved);
      return { ...t, steps, updatedAt: Date.now() };
    });
    save(next);
    set({ trails: next });
  },

  setActive: (id) => set({ activeTrailId: id }),

  getTrail: (id) => get().trails.find((t) => t.id === id),
}));
