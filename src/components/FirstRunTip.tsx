import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, X } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/use-ui";

const STORAGE_KEY = "terranova_help_tip_dismissed";

interface FirstRunTipProps {
  onOpenHelp: () => void;
}

const FirstRunTip = ({ onOpenHelp }: FirstRunTipProps) => {
  const [visible, setVisible] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        setVisible(true);
      }
    } catch {
      // localStorage unavailable
    }
  }, []);

  const dismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // noop
    }
  };

  const handleOpen = () => {
    dismiss();
    onOpenHelp();
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.3, delay: 1.5 }}
          className="fixed bottom-6 right-6 z-50 max-w-xs rounded-lg border border-border bg-background/95 backdrop-blur-lg shadow-lg p-4"
        >
          <button
            onClick={dismiss}
            className="absolute top-2 right-2 p-1 rounded-sm text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Dismiss tip"
          >
            <X className="h-3.5 w-3.5" />
          </button>
          <div className="flex items-start gap-3 pr-4">
            <HelpCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-foreground mb-1">New to Terranova?</p>
              <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                Press <kbd className="px-1 py-0.5 rounded bg-muted border border-border text-[10px] font-mono">?</kbd> anytime for help & shortcuts.
              </p>
              <button
                onClick={handleOpen}
                className="text-xs font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Open Help →
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FirstRunTip;
