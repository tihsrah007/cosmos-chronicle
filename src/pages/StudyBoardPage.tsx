import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Trash2,
  ChevronUp,
  ChevronDown,
  MapPin,
  Globe,
  Mountain,
  Landmark,
  Telescope,
  ExternalLink,
  BarChart3,
  X,
  ArrowLeftRight,
  Zap,
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useStudyBoard, type StudyBoardItem } from "@/stores/study-board";
import { usePulse } from "@/hooks/use-pulse";
import NotesSection from "@/components/NotesSection";

const domainMeta: Record<string, { icon: typeof Globe; color: string; route: string; label: string }> = {
  history: { icon: Landmark, color: "hsl(38, 90%, 55%)", route: "/history", label: "History" },
  geopolitics: { icon: Globe, color: "hsl(210, 70%, 55%)", route: "/geopolitics", label: "Geopolitics" },
  geology: { icon: Mountain, color: "hsl(25, 70%, 50%)", route: "/geology", label: "Geology" },
  cosmology: { icon: Telescope, color: "hsl(270, 70%, 60%)", route: "/cosmology", label: "Cosmology" },
};

const StudyBoardPage = () => {
  const { items, removeItem, moveItem, clear } = useStudyBoard();
  const navigate = useNavigate();
  const [confirmClear, setConfirmClear] = useState(false);
  const [compareSelection, setCompareSelection] = useState<string[]>([]);
  const { data: pulseUpdates } = usePulse();

  const newThisWeek = useMemo(() => {
    if (!pulseUpdates) return [];
    const weekAgo = Date.now() - 7 * 86400_000;
    return pulseUpdates
      .filter((u) => new Date(u.publishedAt).getTime() > weekAgo)
      .slice(0, 4);
  }, [pulseUpdates]);

  const grouped = useMemo(() => {
    const groups: Record<string, StudyBoardItem[]> = {};
    for (const item of items) {
      (groups[item.domain] ??= []).push(item);
    }
    return groups;
  }, [items]);

  const globalIndex = (item: StudyBoardItem) => items.findIndex((i) => i.id === item.id);

  const handleOpenOnMap = (item: StudyBoardItem) => {
    const meta = domainMeta[item.domain];
    if (!meta) return;
    navigate(meta.route, {
      state: { focusItem: item.name, focusCoordinates: item.coordinates },
    });
  };

  const toggleCompare = (id: string) => {
    setCompareSelection((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 2) return [prev[1], id];
      return [...prev, id];
    });
  };

  const launchCompare = () => {
    if (compareSelection.length === 2) {
      navigate("/compare", {
        state: { itemA: compareSelection[0], itemB: compareSelection[1] },
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-6 px-4">
        <div className="container max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <BookOpen className="h-7 w-7 text-primary" />
                <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                  Study Board
                </h1>
              </div>
              <p className="font-body text-base text-muted-foreground max-w-xl">
                Your personal collection of atlas items. Saved on this device only — add items from any map or the explore page.
              </p>
            </div>
            <div className="shrink-0 pt-2 flex items-center gap-2">
              {compareSelection.length === 2 && (
                <button
                  onClick={launchCompare}
                  className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground font-body text-xs font-medium flex items-center gap-1.5"
                >
                  <ArrowLeftRight className="h-3.5 w-3.5" /> Compare ({compareSelection.length})
                </button>
              )}
              {items.length > 0 && (
                <>
                  {confirmClear ? (
                    <div className="flex items-center gap-2">
                      <span className="font-body text-xs text-muted-foreground">Clear all?</span>
                      <button
                        onClick={() => { clear(); setConfirmClear(false); }}
                        className="px-3 py-1.5 rounded-lg bg-destructive text-destructive-foreground font-body text-xs font-medium"
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => setConfirmClear(false)}
                        className="px-3 py-1.5 rounded-lg bg-secondary border border-border font-body text-xs text-muted-foreground"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setConfirmClear(true)}
                      className="px-3 py-1.5 rounded-lg bg-secondary border border-border font-body text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Clear All
                    </button>
                  )}
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* New This Week Widget */}
      {newThisWeek.length > 0 && (
        <section className="container max-w-5xl mx-auto px-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-primary/20 bg-primary/5 p-4"
          >
            <div className="flex items-center gap-2 mb-3">
              <Zap className="h-4 w-4 text-primary" />
              <span className="font-body text-sm font-semibold text-foreground">New This Week from Pulse</span>
              <Link to="/pulse" className="ml-auto font-body text-xs text-primary hover:underline">
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {newThisWeek.map((u) => (
                <div
                  key={u.id}
                  className="rounded-lg bg-card border border-border p-3 hover:border-primary/30 transition-colors"
                >
                  <h4 className="font-display text-xs font-bold text-foreground mb-1 line-clamp-1">{u.title}</h4>
                  <p className="font-body text-[10px] text-muted-foreground line-clamp-1 mb-2">{u.summary}</p>
                  <div className="flex items-center gap-2">
                    {u.sourceUrl && (
                      <a
                        href={u.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-body text-[10px] text-primary hover:underline inline-flex items-center gap-0.5"
                      >
                        <ExternalLink className="h-2.5 w-2.5" /> Source
                      </a>
                    )}
                    {u.mapDomain && (
                      <button
                        onClick={() => navigate(`/${u.mapDomain}`, { state: { focusItem: u.mapTarget, focusCoordinates: u.coordinates } })}
                        className="font-body text-[10px] text-primary hover:underline inline-flex items-center gap-0.5"
                      >
                        <MapPin className="h-2.5 w-2.5" /> Map
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>
      )}

      {/* Content */}
      <section className="container max-w-5xl mx-auto px-4 pb-16">
        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center py-20"
          >
            <div className="h-16 w-16 rounded-2xl bg-secondary/60 border border-border flex items-center justify-center mb-5">
              <BookOpen className="h-7 w-7 text-muted-foreground/40" />
            </div>
            <h3 className="font-display text-lg font-bold text-foreground mb-2">Nothing here yet</h3>
            <p className="font-body text-sm text-muted-foreground text-center max-w-sm mb-6">
              Add items from the detail panel on any map, or from the explore page.
            </p>
            <div className="flex gap-3">
              <Link
                to="/explore"
                className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-body text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Browse Explore
              </Link>
              <Link
                to="/"
                className="px-4 py-2 rounded-lg bg-secondary border border-border font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Back to Atlas
              </Link>
            </div>
          </motion.div>
        ) : (
          <div className="space-y-8">
            {compareSelection.length < 2 && items.length >= 2 && (
              <p className="font-body text-xs text-muted-foreground">
                💡 Click the compare icon on any two cards to compare them side-by-side.
              </p>
            )}
            <AnimatePresence mode="popLayout">
              {Object.entries(grouped).map(([domain, domainItems]) => {
                const meta = domainMeta[domain];
                if (!meta) return null;
                const Icon = meta.icon;
                return (
                  <motion.div
                    key={domain}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {/* Domain header */}
                    <div className="flex items-center gap-2 mb-4">
                      <Icon className="h-4 w-4" style={{ color: meta.color }} />
                      <h2 className="font-display text-lg font-bold text-foreground capitalize">{meta.label}</h2>
                      <span className="font-body text-xs text-muted-foreground/60">
                        {domainItems.length} item{domainItems.length !== 1 ? "s" : ""}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <AnimatePresence mode="popLayout">
                        {domainItems.map((item) => {
                          const idx = globalIndex(item);
                          const isCompareSelected = compareSelection.includes(item.id);
                          return (
                            <motion.div
                              key={item.id}
                              layout
                              initial={{ opacity: 0, scale: 0.97 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              className={`rounded-xl border bg-card overflow-hidden transition-colors ${
                                isCompareSelected ? "border-primary/50 ring-1 ring-primary/20" : "border-border"
                              }`}
                            >
                              <div className="p-5">
                                {/* Header row */}
                                <div className="flex items-start justify-between gap-2 mb-3">
                                  <div className="flex-1 min-w-0">
                                    <span
                                      className="inline-block px-2 py-0.5 rounded-md text-[10px] font-body font-semibold mb-2"
                                      style={{
                                        backgroundColor: `${meta.color}20`,
                                        color: meta.color,
                                      }}
                                    >
                                      {item.category}
                                    </span>
                                    <h3 className="font-display text-base font-bold text-foreground truncate">
                                      {item.name}
                                    </h3>
                                  </div>
                                  <div className="flex items-center gap-1 shrink-0">
                                    <button
                                      onClick={() => toggleCompare(item.id)}
                                      className={`p-1 rounded transition-colors ${
                                        isCompareSelected
                                          ? "text-primary bg-primary/10"
                                          : "text-muted-foreground hover:text-foreground"
                                      }`}
                                      title="Compare"
                                    >
                                      <ArrowLeftRight className="h-3.5 w-3.5" />
                                    </button>
                                    {idx > 0 && (
                                      <button
                                        onClick={() => moveItem(idx, idx - 1)}
                                        className="p-1 rounded text-muted-foreground hover:text-foreground transition-colors"
                                        title="Move up"
                                      >
                                        <ChevronUp className="h-3.5 w-3.5" />
                                      </button>
                                    )}
                                    {idx < items.length - 1 && (
                                      <button
                                        onClick={() => moveItem(idx, idx + 1)}
                                        className="p-1 rounded text-muted-foreground hover:text-foreground transition-colors"
                                        title="Move down"
                                      >
                                        <ChevronDown className="h-3.5 w-3.5" />
                                      </button>
                                    )}
                                    <button
                                      onClick={() => removeItem(item.id)}
                                      className="p-1 rounded text-muted-foreground hover:text-destructive transition-colors"
                                      title="Remove from board"
                                    >
                                      <X className="h-3.5 w-3.5" />
                                    </button>
                                  </div>
                                </div>

                                {/* Summary */}
                                <p className="font-body text-xs text-muted-foreground leading-relaxed line-clamp-3 mb-3">
                                  {item.description}
                                </p>

                                {/* Key Figures */}
                                {item.keyFigures && item.keyFigures.length > 0 && (
                                  <div className="grid grid-cols-2 gap-1.5 mb-3">
                                    {item.keyFigures.slice(0, 4).map((fig, i) => (
                                      <div key={i} className="rounded-lg bg-secondary/50 border border-border/40 px-2.5 py-1.5">
                                        <p className="font-body text-[9px] text-muted-foreground/60 uppercase tracking-wider">{fig.label}</p>
                                        <p className="font-display text-xs font-bold text-foreground">{fig.value}</p>
                                      </div>
                                    ))}
                                  </div>
                                )}

                                {/* Top Facts */}
                                {item.facts && item.facts.length > 0 && (
                                  <div className="space-y-1 mb-3">
                                    {item.facts.slice(0, 3).map((fact, i) => (
                                      <div key={i} className="flex items-start gap-1.5">
                                        <span className="text-primary font-body text-xs mt-0.5">→</span>
                                        <p className="font-body text-[11px] text-muted-foreground/70 leading-relaxed">{fact}</p>
                                      </div>
                                    ))}
                                  </div>
                                )}

                                {/* Sources */}
                                {item.sources && item.sources.length > 0 && (
                                  <div className="border-t border-border/50 pt-2 mb-3">
                                    <span className="font-body text-[9px] text-muted-foreground/50 uppercase tracking-wider">Sources</span>
                                    <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5">
                                      {item.sources.slice(0, 3).map((src, i) => (
                                        <span key={i} className="font-body text-[10px] text-muted-foreground/60">
                                          {src.url ? (
                                            <a href={src.url} target="_blank" rel="noopener noreferrer" className="hover:text-primary inline-flex items-center gap-0.5">
                                              {src.label} <ExternalLink className="h-2 w-2" />
                                            </a>
                                          ) : src.label}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {/* Notes */}
                                <div className="mb-3">
                                  <NotesSection itemId={item.id} compact />
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2 pt-1">
                                  <button
                                    onClick={() => handleOpenOnMap(item)}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary border border-border font-body text-[11px] text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
                                  >
                                    <MapPin className="h-3 w-3" />
                                    Open on map
                                  </button>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default StudyBoardPage;
