import { AlertTriangle, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

interface MapErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

const MapErrorState = ({
  message = "Failed to load map data",
  onRetry,
}: MapErrorStateProps) => (
  <div className="fixed inset-0 bg-background flex items-center justify-center">
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center gap-4 text-center px-6"
    >
      <AlertTriangle className="h-8 w-8 text-destructive" />
      <p className="font-body text-sm text-muted-foreground max-w-xs">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary border border-border font-body text-sm text-foreground hover:bg-secondary/80 transition-colors"
        >
          <RefreshCw className="h-4 w-4" />
          Retry
        </button>
      )}
    </motion.div>
  </div>
);

export default MapErrorState;
