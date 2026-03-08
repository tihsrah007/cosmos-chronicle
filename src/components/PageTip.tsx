import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, X } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/use-ui";

const STORAGE_PREFIX = "terranova_page_tip_";

interface PageTipProps {
  /** Unique key per page, e.g. "compare", "trails" */
  pageKey: string;
  /** Tip text shown to first-time visitors */
  tip: string;
}

const PageTip = ({ pageKey, tip }: PageTipProps) => {
  const [visible, setVisible] = useState(false);
  const reduced = usePrefersReducedMotion();
  const key = STORAGE_PREFIX + pageKey;

  useEffect(() => {
    try {
      if (!localStorage.getItem(key)) setVisible(true);
    } catch {}
  }, [key]);

  const dismiss = () => {
    setVisible(false);
    try { localStorage.setItem(key, "1"); } catch {}
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={reduced ? { opacity: 1 } : { opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, height: 0 }}
          transition={{ duration: 0.25 }}
          className="mb-4 overflow-hidden"
        >
          <div className="flex items-start gap-3 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3">
            <Lightbulb className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
            <p className="font-body text-sm text-foreground/80 leading-relaxed flex-1">{tip}</p>
            <button
              onClick={dismiss}
              className="p-1 rounded-sm text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
              aria-label="Dismiss tip"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageTip;
