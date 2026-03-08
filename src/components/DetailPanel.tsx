import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { X, ChevronDown, ChevronUp, ExternalLink, BarChart3, BookOpen, Link2, Globe, Plus, Check } from "lucide-react";
import type { MapPOI } from "./FullPageMap";
import { useWikipediaSnapshot } from "@/hooks/use-wikipedia";
import { useStudyBoard, makeStudyBoardId } from "@/stores/study-board";

interface DetailPanelProps {
  item: MapPOI;
  accentColor: string;
  domainSlug: string;
  onClose: () => void;
  onSelectRelated?: (name: string) => void;
}

const DetailPanel = ({ item, accentColor, domainSlug, onClose, onSelectRelated }: DetailPanelProps) => {
  const [expandedDetails, setExpandedDetails] = useState(false);
  const [showWiki, setShowWiki] = useState(false);
  const { data: wiki, isLoading: wikiLoading } = useWikipediaSnapshot(item.name);
  const { addItem, hasItem } = useStudyBoard();
  const itemId = makeStudyBoardId(domainSlug, item.name);
  const isOnBoard = hasItem(itemId);

  const handleRelatedClick = useCallback((name: string) => {
    if (onSelectRelated) {
      onSelectRelated(name);
    }
  }, [onSelectRelated]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="absolute top-4 left-4 z-30 max-w-sm w-full rounded-xl border border-border bg-card/95 backdrop-blur-xl shadow-lg overflow-hidden flex flex-col max-h-[calc(100%-2rem)]"
    >
      {/* Header */}
      <div className="p-5 pb-0">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
        <span
          className="inline-block px-2.5 py-0.5 rounded-md text-xs font-body font-semibold mb-3"
          style={{
            backgroundColor: `${accentColor}20`,
            color: accentColor,
          }}
        >
          {item.category}
        </span>
        <h3 className="font-display text-xl font-bold text-foreground mb-2 pr-6">
          {item.name}
        </h3>
        {/* Add to Study Board */}
        <button
          onClick={() => addItem({
            name: item.name,
            domain: domainSlug,
            category: item.category,
            description: item.description,
            details: item.details,
            facts: item.facts,
            keyFigures: item.keyFigures,
            sources: item.sources,
            coordinates: item.coordinates,
          })}
          disabled={isOnBoard}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-body text-[11px] font-medium transition-colors ${
            isOnBoard
              ? "bg-primary/10 text-primary cursor-default"
              : "bg-secondary border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
          }`}
        >
          {isOnBoard ? <><Check className="h-3 w-3" /> On Board</> : <><Plus className="h-3 w-3" /> Study Board</>}
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-5 pb-5">
        {/* Summary */}
        <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
          {item.description}
        </p>

        {/* Key Figures / Stats */}
        {item.keyFigures && item.keyFigures.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-1.5 mb-2">
              <BarChart3 className="h-3.5 w-3.5 text-primary" />
              <span className="font-body text-xs font-semibold text-foreground uppercase tracking-wider">Key Figures</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {item.keyFigures.map((fig, i) => (
                <div key={i} className="rounded-lg bg-secondary/60 border border-border/50 px-3 py-2">
                  <p className="font-body text-[10px] text-muted-foreground uppercase tracking-wider">{fig.label}</p>
                  <p className="font-display text-sm font-bold text-foreground">{fig.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Fact Cards */}
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

        {/* Extended Details (expandable) */}
        {item.details && (
          <div className="mb-4 border-t border-border pt-3">
            <button
              onClick={() => setExpandedDetails(!expandedDetails)}
              className="flex items-center gap-1.5 w-full text-left mb-2"
            >
              <span className="font-body text-xs font-semibold text-foreground uppercase tracking-wider">Read More</span>
              {expandedDetails ? (
                <ChevronUp className="h-3.5 w-3.5 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
              )}
            </button>
            <motion.div
              initial={false}
              animate={{ height: expandedDetails ? "auto" : 0, opacity: expandedDetails ? 1 : 0 }}
              className="overflow-hidden"
            >
              <p className="font-body text-xs text-muted-foreground leading-relaxed">
                {item.details}
              </p>
            </motion.div>
          </div>
        )}

        {/* Related Items */}
        {item.relatedItems && item.relatedItems.length > 0 && (
          <div className="mb-4 border-t border-border pt-3">
            <div className="flex items-center gap-1.5 mb-2">
              <Link2 className="h-3.5 w-3.5 text-primary" />
              <span className="font-body text-xs font-semibold text-foreground uppercase tracking-wider">Related</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {item.relatedItems.map((name, i) => (
                <button
                  key={i}
                  onClick={() => handleRelatedClick(name)}
                  className="px-2.5 py-1 rounded-md bg-secondary border border-border/50 font-body text-xs text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors cursor-pointer"
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Wikipedia Enrichment */}
        {(wiki || wikiLoading) && (
          <div className="mb-4 border-t border-border pt-3">
            <button
              onClick={() => setShowWiki(!showWiki)}
              className="flex items-center gap-1.5 w-full text-left mb-2"
            >
              <Globe className="h-3.5 w-3.5 text-primary" />
              <span className="font-body text-xs font-semibold text-foreground uppercase tracking-wider">Wikipedia</span>
              {showWiki ? (
                <ChevronUp className="h-3.5 w-3.5 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
              )}
            </button>
            <motion.div
              initial={false}
              animate={{ height: showWiki ? "auto" : 0, opacity: showWiki ? 1 : 0 }}
              className="overflow-hidden"
            >
              {wikiLoading ? (
                <div className="flex items-center gap-2 py-2">
                  <div className="h-3 w-3 border border-primary border-t-transparent rounded-full animate-spin" />
                  <span className="font-body text-xs text-muted-foreground">Loading snapshot…</span>
                </div>
              ) : wiki ? (
                <div>
                  <p className="font-body text-xs text-muted-foreground leading-relaxed mb-2">
                    {wiki.summary}
                  </p>
                  <a
                    href={wiki.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-[11px] text-primary hover:underline inline-flex items-center gap-1"
                  >
                    Read on Wikipedia <ExternalLink className="h-2.5 w-2.5" />
                  </a>
                </div>
              ) : null}
            </motion.div>
          </div>
        )}

        {/* Sources / Attribution */}
        {item.sources && item.sources.length > 0 && (
          <div className="border-t border-border pt-3">
            <span className="font-body text-[10px] text-muted-foreground/60 uppercase tracking-wider">Sources</span>
            <div className="mt-1.5 space-y-1">
              {item.sources.map((src, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  {src.url ? (
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-body text-[11px] text-primary hover:underline flex items-center gap-1"
                    >
                      {src.label}
                      <ExternalLink className="h-2.5 w-2.5" />
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
    </motion.div>
  );
};

export default DetailPanel;
