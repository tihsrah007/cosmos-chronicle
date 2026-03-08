import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Route,
  Plus,
  Trash2,
  Pencil,
  Check,
  X,
  ChevronUp,
  ChevronDown,
  MapPin,
  Lightbulb,
  Zap,
  StickyNote,
  ArrowLeftRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTrails, type ResearchTrail } from "@/stores/trails";
import { BackButton, PageHeader, EmptyState } from "@/components/ui/shared";

const stepTypeIcons: Record<string, typeof MapPin> = {
  topic: Lightbulb,
  "map-item": MapPin,
  pulse: Zap,
  note: StickyNote,
  compare: ArrowLeftRight,
};

const stepTypeColors: Record<string, string> = {
  topic: "hsl(38, 90%, 55%)",
  "map-item": "hsl(160, 70%, 45%)",
  pulse: "hsl(270, 60%, 60%)",
  note: "hsl(210, 70%, 55%)",
  compare: "hsl(25, 70%, 50%)",
};

function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60_000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

const TrailsPage = () => {
  const { trails, createTrail, deleteTrail, renameTrail, removeStep, reorderSteps, activeTrailId, setActive } = useTrails();
  const [newTitle, setNewTitle] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");

  const handleCreate = () => {
    const title = newTitle.trim() || "Untitled Trail";
    createTrail(title);
    setNewTitle("");
  };

  const startRename = (trail: ResearchTrail) => {
    setEditingId(trail.id);
    setEditTitle(trail.title);
  };

  const saveRename = () => {
    if (editingId && editTitle.trim()) {
      renameTrail(editingId, editTitle.trim());
    }
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <BackButton />
            <PageHeader
              icon={Route}
              title="Research Trails"
              description="Connect topics, map items, pulse updates, and notes into ordered research paths. Saved locally on this device."
            />
          </motion.div>

          {/* Create new */}
          <div className="flex gap-2 mb-8 mt-8">
            <input
              type="text"
              placeholder="New trail title…"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreate()}
              className="flex-1 px-4 py-2.5 rounded-lg bg-secondary border border-border font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button
              onClick={handleCreate}
              className="px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-body text-sm font-medium flex items-center gap-1.5"
            >
              <Plus className="h-4 w-4" /> Create
            </button>
          </div>

          {/* Trail list */}
          {trails.length === 0 ? (
            <EmptyState
              icon={Route}
              title="No trails yet"
              description="Create one above and add steps from topic hubs, maps, or pulse."
            />
          ) : (
            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {trails.map((trail) => {
                  const isActive = activeTrailId === trail.id;
                  return (
                    <motion.div
                      key={trail.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`rounded-xl border p-5 transition-colors ${
                        isActive ? "border-primary/40 bg-primary/5" : "border-border bg-card"
                      }`}
                    >
                      {/* Trail header */}
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div className="flex-1 min-w-0">
                          {editingId === trail.id ? (
                            <div className="flex items-center gap-2">
                              <input
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") saveRename();
                                  if (e.key === "Escape") setEditingId(null);
                                }}
                                className="flex-1 px-2 py-1 rounded bg-secondary border border-border font-display text-base font-bold text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                                autoFocus
                              />
                              <button onClick={saveRename} className="p-1 text-primary" aria-label="Save name"><Check className="h-4 w-4" /></button>
                              <button onClick={() => setEditingId(null)} className="p-1 text-muted-foreground" aria-label="Cancel rename"><X className="h-4 w-4" /></button>
                            </div>
                          ) : (
                            <h3 className="font-display text-base font-bold text-foreground">{trail.title}</h3>
                          )}
                          <p className="font-body text-[10px] text-muted-foreground mt-0.5">
                            {trail.steps.length} step{trail.steps.length !== 1 ? "s" : ""} · Updated {timeAgo(trail.updatedAt)}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => setActive(isActive ? null : trail.id)}
                            className={`px-2 py-1 rounded-md font-body text-[10px] font-medium transition-colors border ${
                              isActive
                                ? "bg-primary text-primary-foreground border-primary"
                                : "bg-secondary text-muted-foreground border-border hover:text-foreground"
                            }`}
                          >
                            {isActive ? "Active" : "Set Active"}
                          </button>
                          <button
                            onClick={() => startRename(trail)}
                            className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                            aria-label="Rename trail"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => deleteTrail(trail.id)}
                            className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                            aria-label="Delete trail"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Steps */}
                      {trail.steps.length === 0 ? (
                        <p className="font-body text-xs text-muted-foreground/60 italic">
                          No steps yet. Add steps from Topic Hubs, maps, Pulse, or Compare.
                        </p>
                      ) : (
                        <div className="space-y-1.5">
                          {trail.steps.map((step, si) => {
                            const Icon = stepTypeIcons[step.type] || MapPin;
                            const color = stepTypeColors[step.type] || "hsl(38,90%,55%)";
                            return (
                              <div
                                key={step.id}
                                className="group flex items-center gap-2.5 px-3 py-2 rounded-lg bg-secondary/40 border border-border/30"
                              >
                                <span
                                  className="flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-body font-bold"
                                  style={{ backgroundColor: `${color}20`, color }}
                                >
                                  {si + 1}
                                </span>
                                <Icon className="h-3 w-3 shrink-0" style={{ color }} />
                                <span className="font-body text-xs text-foreground truncate flex-1">
                                  {step.label}
                                </span>
                                <span className="font-body text-[9px] text-muted-foreground/50 capitalize shrink-0">
                                  {step.type}
                                </span>
                                <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                  {si > 0 && (
                                    <button
                                      onClick={() => reorderSteps(trail.id, si, si - 1)}
                                      className="p-0.5 rounded text-muted-foreground hover:text-foreground"
                                      aria-label="Move step up"
                                    >
                                      <ChevronUp className="h-3 w-3" />
                                    </button>
                                  )}
                                  {si < trail.steps.length - 1 && (
                                    <button
                                      onClick={() => reorderSteps(trail.id, si, si + 1)}
                                      className="p-0.5 rounded text-muted-foreground hover:text-foreground"
                                      aria-label="Move step down"
                                    >
                                      <ChevronDown className="h-3 w-3" />
                                    </button>
                                  )}
                                  <button
                                    onClick={() => removeStep(trail.id, step.id)}
                                    className="p-0.5 rounded text-muted-foreground hover:text-destructive"
                                    aria-label="Remove step"
                                  >
                                    <X className="h-3 w-3" />
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TrailsPage;
