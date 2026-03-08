import { useState } from "react";
import { Route, Plus, Check } from "lucide-react";
import { useTrails, type TrailStep } from "@/stores/trails";

interface AddToTrailButtonProps {
  step: Omit<TrailStep, "id" | "addedAt">;
  compact?: boolean;
}

const AddToTrailButton = ({ step, compact }: AddToTrailButtonProps) => {
  const { trails, activeTrailId, addStep, createTrail } = useTrails();
  const [showPicker, setShowPicker] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = (trailId: string) => {
    addStep(trailId, step);
    setJustAdded(true);
    setShowPicker(false);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const handleNewTrail = () => {
    const id = createTrail("New Research Trail");
    addStep(id, step);
    setJustAdded(true);
    setShowPicker(false);
    setTimeout(() => setJustAdded(false), 1500);
  };

  if (justAdded) {
    return (
      <span className={`inline-flex items-center gap-1 text-primary font-body ${compact ? "text-[10px]" : "text-xs"}`}>
        <Check className="h-3 w-3" /> Added to trail
      </span>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => {
          if (activeTrailId) {
            handleAdd(activeTrailId);
          } else if (trails.length === 0) {
            handleNewTrail();
          } else {
            setShowPicker(!showPicker);
          }
        }}
        className={`inline-flex items-center gap-1 ${compact ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-[11px]"} rounded-md bg-secondary border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 font-body font-medium transition-colors`}
        title="Add to research trail"
        aria-label="Add to research trail"
      >
        <Route className="h-3 w-3" />
        {!compact && "Trail"}
      </button>

      {showPicker && (
        <div className="absolute top-full left-0 mt-1 z-50 min-w-[180px] rounded-lg bg-popover border border-border shadow-lg p-2">
          {trails.map((t) => (
            <button
              key={t.id}
              onClick={() => handleAdd(t.id)}
              className="w-full text-left px-2.5 py-1.5 rounded-md font-body text-xs text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors truncate"
            >
              {t.title} ({t.steps.length})
            </button>
          ))}
          <button
            onClick={handleNewTrail}
            className="w-full text-left px-2.5 py-1.5 rounded-md font-body text-xs text-primary hover:bg-primary/10 transition-colors flex items-center gap-1.5 mt-1 border-t border-border pt-1.5"
          >
            <Plus className="h-3 w-3" /> New Trail
          </button>
        </div>
      )}
    </div>
  );
};

export default AddToTrailButton;
