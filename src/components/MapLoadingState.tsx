import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface MapLoadingStateProps {
  message?: string;
}

const MapLoadingState = ({ message = "Loading map data…" }: MapLoadingStateProps) => (
  <div className="fixed inset-0 bg-background flex items-center justify-center">
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center gap-4"
    >
      <Loader2 className="h-8 w-8 text-primary animate-spin" />
      <p className="font-body text-sm text-muted-foreground">{message}</p>
    </motion.div>
  </div>
);

export default MapLoadingState;
