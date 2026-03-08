import { useState, useMemo, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  BarChart3,
  BookOpen,
  ExternalLink,
  ArrowLeftRight,
  ArrowRightLeft,
  MapPin,
  X,
  Trash2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useStudyBoard, type StudyBoardItem } from "@/stores/study-board";
import NotesSection from "@/components/NotesSection";
import { loadCompare, saveCompare, clearCompare } from "@/stores/compare";

const domainColors: Record<string, string> = {
  history: "hsl(38, 90%, 55%)",
  geopolitics: "hsl(210, 70%, 55%)",
  geology: "hsl(25, 70%, 50%)",
  cosmology: "hsl(270, 70%, 60%)",
};

const domainRoutes: Record<string, string> = {
  history: "/history",
  geopolitics: "/geopolitics",
  geology: "/geology",
  cosmology: "/cosmology",
};

function loadPersistedCompare(): { itemA?: string; itemB?: string } {
  return loadCompare();
}

function persistCompare(state: { itemA?: string; itemB?: string }) {
  saveCompare(state);
}

const ComparePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { items } = useStudyBoard();
  const locState = location.state as { itemA?: string; itemB?: string } | null;

  // Merge location state with persisted state (location state takes priority)
  const [selection, setSelection] = useState<{ itemA?: string; itemB?: string }>(() => {
    const persisted = loadPersistedCompare();
    return {
      itemA: locState?.itemA || persisted.itemA,
      itemB: locState?.itemB || persisted.itemB,
    };
  });

  // Persist selection changes
  useEffect(() => {
    persistCompare(selection);
  }, [selection]);

  const selectedA = useMemo(() => items.find((i) => i.id === selection.itemA) || null, [items, selection.itemA]);
  const selectedB = useMemo(() => items.find((i) => i.id === selection.itemB) || null, [items, selection.itemB]);

  const handleSwap = () => {
    setSelection((s) => ({ itemA: s.itemB, itemB: s.itemA }));
  };

  const handleClear = () => {
    setSelection({});
    clearCompare();
  };

  const selectItem = (id: string, side: "A" | "B") => {
    setSelection((s) => ({
      ...s,
      [side === "A" ? "itemA" : "itemB"]: id,
    }));
  };

  const clearSide = (side: "A" | "B") => {
    setSelection((s) => ({
      ...s,
      [side === "A" ? "itemA" : "itemB"]: undefined,
    }));
  };

  const renderItemColumn = (item: StudyBoardItem | null, side: "A" | "B") => {
    if (!item) {
      const otherSideId = side === "A" ? selection.itemB : selection.itemA;
      const pickable = items.filter((i) => i.id !== otherSideId);
      return (
        <div className="flex-1 rounded-xl border border-dashed border-border bg-card/50 p-5 flex flex-col min-h-[300px]">
          <p className="font-body text-sm text-muted-foreground mb-3">
            Select an item to compare
          </p>
          {pickable.length === 0 ? (
            <p className="font-body text-xs text-muted-foreground/60">
              Your Study Board is empty. Add items from any map first.
            </p>
          ) : (
            <div className="space-y-2 max-h-80 overflow-y-auto flex-1">
              {pickable.map((i) => (
                <button
                  key={i.id}
                  onClick={() => selectItem(i.id, side)}
                  className="w-full text-left px-3 py-2.5 rounded-lg bg-secondary/50 border border-border hover:border-primary/30 transition-colors"
                >
                  <p className="font-body text-sm text-foreground truncate">{i.name}</p>
                  <p className="font-body text-[10px] text-muted-foreground capitalize">
                    {i.domain} · {i.category}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>
      );
    }

    const color = domainColors[item.domain] || "hsl(38, 90%, 55%)";

    return (
      <div className="flex-1 rounded-xl border border-border bg-card p-5 min-w-0">
        {/* Header with clear button */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <span
            className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-body font-semibold"
            style={{ backgroundColor: `${color}20`, color }}
          >
            {item.category}
          </span>
          <button
            onClick={() => clearSide(side)}
            className="p-1 rounded text-muted-foreground hover:text-foreground transition-colors"
            title="Remove from compare"
            aria-label="Remove from compare"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        <h3 className="font-display text-lg font-bold text-foreground mb-1">{item.name}</h3>
        <p className="font-body text-[10px] text-muted-foreground capitalize mb-3">
          {item.domain}
        </p>
        <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
          {item.description}
        </p>

        {/* Key Figures */}
        {item.keyFigures && item.keyFigures.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-1.5 mb-2">
              <BarChart3 className="h-3.5 w-3.5 text-primary" />
              <span className="font-body text-xs font-semibold text-foreground uppercase tracking-wider">
                Key Figures
              </span>
            </div>
            <div className="space-y-1.5">
              {item.keyFigures.map((fig, i) => (
                <div
                  key={i}
                  className="rounded-lg bg-secondary/60 border border-border/50 px-3 py-2"
                >
                  <p className="font-body text-[10px] text-muted-foreground uppercase tracking-wider">
                    {fig.label}
                  </p>
                  <p className="font-display text-sm font-bold text-foreground">
                    {fig.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Facts */}
        {item.facts && item.facts.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-1.5 mb-2">
              <BookOpen className="h-3.5 w-3.5 text-primary" />
              <span className="font-body text-xs font-semibold text-foreground uppercase tracking-wider">
                Facts
              </span>
            </div>
            <div className="space-y-1.5">
              {item.facts.map((fact, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 px-3 py-2 rounded-lg bg-secondary/40 border border-border/30"
                >
                  <span className="text-primary font-body text-xs mt-0.5">→</span>
                  <p className="font-body text-xs text-muted-foreground leading-relaxed">
                    {fact}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Details */}
        {item.details && (
          <div className="mb-4">
            <p className="font-body text-xs text-muted-foreground leading-relaxed">
              {item.details}
            </p>
          </div>
        )}

        {/* Sources */}
        {item.sources && item.sources.length > 0 && (
          <div className="border-t border-border pt-3 mb-4">
            <span className="font-body text-[10px] text-muted-foreground/60 uppercase tracking-wider">
              Sources
            </span>
            <div className="mt-1 space-y-0.5">
              {item.sources.map((src, i) => (
                <div key={i}>
                  {src.url ? (
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-body text-[11px] text-primary hover:underline inline-flex items-center gap-1"
                    >
                      {src.label} <ExternalLink className="h-2.5 w-2.5" />
                    </a>
                  ) : (
                    <span className="font-body text-[11px] text-muted-foreground">
                      {src.label}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Notes */}
        <NotesSection itemId={item.id} compact />

        {/* Open on Map */}
        {item.coordinates && (
          <button
            onClick={() => {
              const route = domainRoutes[item.domain];
              if (route) {
                navigate(route, {
                  state: { focusItem: item.name, focusCoordinates: item.coordinates },
                });
              }
            }}
            className="mt-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary border border-border font-body text-[11px] text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
          >
            <MapPin className="h-3 w-3" />
            Open on Map
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors font-body text-sm mb-6"
            >
              <ChevronLeft className="h-4 w-4" /> Back
            </button>

            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <ArrowLeftRight className="h-5 w-5 text-primary" />
                  </div>
                  <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                    Compare
                  </h1>
                </div>
                <p className="font-body text-muted-foreground max-w-2xl">
                  Select two items from your Study Board to compare them side by side.
                </p>
              </div>

              {/* Controls */}
              {(selectedA || selectedB) && (
                <div className="flex items-center gap-2 shrink-0">
                  {selectedA && selectedB && (
                    <button
                      onClick={handleSwap}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary border border-border font-body text-xs text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="Swap sides"
                    >
                      <ArrowRightLeft className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">Swap</span>
                    </button>
                  )}
                  <button
                    onClick={handleClear}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary border border-border font-body text-xs text-muted-foreground hover:text-destructive transition-colors"
                    aria-label="Clear compare"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Clear</span>
                  </button>
                </div>
              )}
            </div>
          </motion.div>

          {items.length === 0 ? (
            <div className="flex flex-col items-center py-16">
              <p className="font-body text-sm text-muted-foreground mb-4">
                Your Study Board is empty. Add items from any map to start comparing.
              </p>
              <button
                onClick={() => navigate("/study-board")}
                className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-body text-sm font-medium"
              >
                Go to Study Board
              </button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col md:flex-row gap-4"
            >
              {renderItemColumn(selectedA, "A")}
              <div className="hidden md:flex items-center justify-center">
                <div className="w-px h-full bg-border relative">
                  {selectedA && selectedB && (
                    <button
                      onClick={handleSwap}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2 rounded-full bg-card border border-border text-muted-foreground hover:text-primary transition-colors shadow-lg"
                      aria-label="Swap sides"
                    >
                      <ArrowRightLeft className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
              {renderItemColumn(selectedB, "B")}
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ComparePage;
