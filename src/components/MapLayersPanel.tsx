import { memo } from "react";
import { motion } from "framer-motion";
import { Layers, Eye, EyeOff, Link2, Focus, X } from "lucide-react";

interface MapLayersPanelProps {
  categories: readonly string[];
  activeCategories: Set<string>;
  onToggleCategory: (cat: string) => void;
  categoryColors: Record<string, string>;
  fallbackColor: string;
  poiCounts: Record<string, number>;
  sourceOnlyMode: boolean;
  onToggleSourceOnly: () => void;
  focusMode: boolean;
  onToggleFocusMode: () => void;
  selectedCategory: string | null;
  onClose: () => void;
}

const MapLayersPanel = ({
  categories,
  activeCategories,
  onToggleCategory,
  categoryColors,
  fallbackColor,
  poiCounts,
  sourceOnlyMode,
  onToggleSourceOnly,
  focusMode,
  onToggleFocusMode,
  selectedCategory,
  onClose,
}: MapLayersPanelProps) => {
  const allActive = categories.every((c) => activeCategories.has(c));

  const handleToggleAll = () => {
    if (allActive) {
      // deactivate all
      categories.forEach((c) => {
        if (activeCategories.has(c)) onToggleCategory(c);
      });
    } else {
      // activate all
      categories.forEach((c) => {
        if (!activeCategories.has(c)) onToggleCategory(c);
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.25 }}
      className="absolute top-4 left-4 z-30 w-64 rounded-xl border border-border bg-card/95 backdrop-blur-xl shadow-lg overflow-hidden flex flex-col max-h-[calc(100%-2rem)]"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <Layers className="h-4 w-4 text-primary" />
          <h3 className="font-display text-sm font-bold text-foreground">
            Layers & Legend
          </h3>
        </div>
        <button
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Toggles */}
      <div className="px-4 py-3 border-b border-border space-y-2">
        <ToggleRow
          icon={<Link2 className="h-3.5 w-3.5" />}
          label="Sources only"
          description="Show items with source links"
          active={sourceOnlyMode}
          onToggle={onToggleSourceOnly}
        />
        <ToggleRow
          icon={<Focus className="h-3.5 w-3.5" />}
          label="Focus mode"
          description="Dim unselected categories"
          active={focusMode}
          onToggle={onToggleFocusMode}
        />
      </div>

      {/* Category Legend */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <div className="px-4 pt-3 pb-1 flex items-center justify-between">
          <span className="font-body text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Categories
          </span>
          <button
            onClick={handleToggleAll}
            className="font-body text-[10px] text-primary hover:underline"
          >
            {allActive ? "Hide all" : "Show all"}
          </button>
        </div>
        <div className="px-2 pb-3 space-y-0.5">
          {categories.map((cat) => {
            const color = categoryColors[cat] || fallbackColor;
            const isActive = activeCategories.has(cat);
            const count = poiCounts[cat] || 0;
            const isFocused = !focusMode || !selectedCategory || selectedCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => onToggleCategory(cat)}
                className={`w-full flex items-center gap-2.5 px-2 py-1.5 rounded-lg transition-all font-body text-xs ${
                  isActive
                    ? "hover:bg-secondary/50"
                    : "opacity-40 hover:opacity-60"
                } ${!isFocused && isActive ? "opacity-50" : ""}`}
              >
                <span
                  className="w-3 h-3 rounded-sm flex-shrink-0 border"
                  style={{
                    backgroundColor: isActive ? color : "transparent",
                    borderColor: color,
                  }}
                />
                <span
                  className={`flex-1 text-left truncate ${
                    isActive ? "text-foreground" : "text-muted-foreground line-through"
                  }`}
                >
                  {cat}
                </span>
                <span className="text-muted-foreground tabular-nums">{count}</span>
                {isActive ? (
                  <Eye className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                ) : (
                  <EyeOff className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Compact Legend Footer */}
      <div className="px-4 py-2.5 border-t border-border bg-secondary/30">
        <div className="flex flex-wrap gap-1.5">
          {categories
            .filter((c) => activeCategories.has(c))
            .map((cat) => (
              <span
                key={cat}
                className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded font-body text-[10px]"
                style={{
                  backgroundColor: `${categoryColors[cat] || fallbackColor}15`,
                  color: categoryColors[cat] || fallbackColor,
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: categoryColors[cat] || fallbackColor }}
                />
                {cat}
              </span>
            ))}
        </div>
      </div>
    </motion.div>
  );
};

const ToggleRow = ({
  icon,
  label,
  description,
  active,
  onToggle,
}: {
  icon: React.ReactNode;
  label: string;
  description: string;
  active: boolean;
  onToggle: () => void;
}) => (
  <button
    onClick={onToggle}
    className="w-full flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-secondary/50 transition-colors"
  >
    <span className={active ? "text-primary" : "text-muted-foreground"}>{icon}</span>
    <div className="flex-1 text-left">
      <p className={`font-body text-xs font-medium ${active ? "text-foreground" : "text-muted-foreground"}`}>
        {label}
      </p>
      <p className="font-body text-[10px] text-muted-foreground leading-tight">{description}</p>
    </div>
    <div
      className={`w-7 h-4 rounded-full transition-colors flex items-center ${
        active ? "bg-primary justify-end" : "bg-secondary justify-start"
      }`}
    >
      <span
        className={`w-3 h-3 rounded-full mx-0.5 transition-colors ${
          active ? "bg-primary-foreground" : "bg-muted-foreground"
        }`}
      />
    </div>
  </button>
);

export default memo(MapLayersPanel);
