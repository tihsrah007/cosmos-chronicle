import { useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, BarChart3, BookOpen, ExternalLink, ArrowLeftRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useStudyBoard, type StudyBoardItem } from "@/stores/study-board";

const domainColors: Record<string, string> = {
  history: "hsl(38, 90%, 55%)",
  geopolitics: "hsl(210, 70%, 55%)",
  geology: "hsl(25, 70%, 50%)",
  cosmology: "hsl(270, 70%, 60%)",
};

const ComparePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { items } = useStudyBoard();
  const state = location.state as { itemA?: string; itemB?: string } | null;

  const [selectedA, selectedB] = useMemo(() => {
    const a = items.find((i) => i.id === state?.itemA) || null;
    const b = items.find((i) => i.id === state?.itemB) || null;
    return [a, b];
  }, [items, state]);

  // If no items pre-selected, let user pick from study board
  const pickableItems = items;

  const [pickA, setPickA] = useMemo(() => {
    // We need state, use URL params via location.state
    return [selectedA, () => {}] as const;
  }, [selectedA]);

  const renderItemColumn = (item: StudyBoardItem | null, label: string) => {
    if (!item) {
      return (
        <div className="flex-1 rounded-xl border border-dashed border-border bg-card/50 p-6 flex flex-col items-center justify-center min-h-[300px]">
          <p className="font-body text-sm text-muted-foreground mb-3">Select {label} from your Study Board</p>
          <div className="space-y-2 max-h-60 overflow-y-auto w-full">
            {pickableItems.map((i) => (
              <button
                key={i.id}
                onClick={() => {
                  const newState = { ...state };
                  if (label === "Item A") newState.itemA = i.id;
                  else newState.itemB = i.id;
                  navigate("/compare", { state: newState, replace: true });
                }}
                className="w-full text-left px-3 py-2 rounded-lg bg-secondary/50 border border-border hover:border-primary/30 transition-colors"
              >
                <p className="font-body text-sm text-foreground truncate">{i.name}</p>
                <p className="font-body text-[10px] text-muted-foreground capitalize">{i.domain} · {i.category}</p>
              </button>
            ))}
          </div>
        </div>
      );
    }

    const color = domainColors[item.domain] || "hsl(38, 90%, 55%)";

    return (
      <div className="flex-1 rounded-xl border border-border bg-card p-5 min-w-0">
        <span
          className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-body font-semibold mb-2"
          style={{ backgroundColor: `${color}20`, color }}
        >
          {item.category}
        </span>
        <h3 className="font-display text-lg font-bold text-foreground mb-2">{item.name}</h3>
        <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">{item.description}</p>

        {/* Key Figures */}
        {item.keyFigures && item.keyFigures.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-1.5 mb-2">
              <BarChart3 className="h-3.5 w-3.5 text-primary" />
              <span className="font-body text-xs font-semibold text-foreground uppercase tracking-wider">Key Figures</span>
            </div>
            <div className="space-y-1.5">
              {item.keyFigures.map((fig, i) => (
                <div key={i} className="rounded-lg bg-secondary/60 border border-border/50 px-3 py-2">
                  <p className="font-body text-[10px] text-muted-foreground uppercase tracking-wider">{fig.label}</p>
                  <p className="font-display text-sm font-bold text-foreground">{fig.value}</p>
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
              <span className="font-body text-xs font-semibold text-foreground uppercase tracking-wider">Facts</span>
            </div>
            <div className="space-y-1.5">
              {item.facts.map((fact, i) => (
                <div key={i} className="flex items-start gap-2 px-3 py-2 rounded-lg bg-secondary/40 border border-border/30">
                  <span className="text-primary font-body text-xs mt-0.5">→</span>
                  <p className="font-body text-xs text-muted-foreground leading-relaxed">{fact}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Details */}
        {item.details && (
          <div className="mb-4">
            <p className="font-body text-xs text-muted-foreground leading-relaxed">{item.details}</p>
          </div>
        )}

        {/* Sources */}
        {item.sources && item.sources.length > 0 && (
          <div className="border-t border-border pt-3">
            <span className="font-body text-[10px] text-muted-foreground/60 uppercase tracking-wider">Sources</span>
            <div className="mt-1 space-y-0.5">
              {item.sources.map((src, i) => (
                <div key={i}>
                  {src.url ? (
                    <a href={src.url} target="_blank" rel="noopener noreferrer" className="font-body text-[11px] text-primary hover:underline inline-flex items-center gap-1">
                      {src.label} <ExternalLink className="h-2.5 w-2.5" />
                    </a>
                  ) : (
                    <span className="font-body text-[11px] text-muted-foreground">{src.label}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
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

            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <ArrowLeftRight className="h-5 w-5 text-primary" />
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Compare
              </h1>
            </div>
            <p className="font-body text-muted-foreground max-w-2xl mb-8">
              Select two items from your Study Board to compare them side by side.
            </p>
          </motion.div>

          {items.length < 2 ? (
            <div className="flex flex-col items-center py-16">
              <p className="font-body text-sm text-muted-foreground mb-4">
                Add at least 2 items to your Study Board to use Compare mode.
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
              {renderItemColumn(selectedA, "Item A")}
              <div className="hidden md:flex items-center">
                <div className="w-px h-full bg-border" />
              </div>
              {renderItemColumn(selectedB, "Item B")}
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ComparePage;
