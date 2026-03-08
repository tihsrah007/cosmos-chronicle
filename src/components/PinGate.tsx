import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Compass, Lock, AlertCircle } from "lucide-react";
import { useAccessConfig, verifyPin } from "@/hooks/use-access";

interface PinGateProps {
  children: React.ReactNode;
}

const PIN_STORAGE_KEY = "terranova_pin_valid";

const PinGate = ({ children }: PinGateProps) => {
  const { data: config, isLoading: configLoading, isError } = useAccessConfig();
  const [pin, setPin] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [granted, setGranted] = useState(() => {
    try {
      return sessionStorage.getItem(PIN_STORAGE_KEY) === "true";
    } catch {
      return false;
    }
  });

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!pin.trim()) return;
      setError(null);
      setIsVerifying(true);
      try {
        const result = await verifyPin(pin.trim());
        if (result.valid) {
          setGranted(true);
          try {
            sessionStorage.setItem(PIN_STORAGE_KEY, "true");
          } catch {}
        } else {
          setError(result.message || "Invalid PIN. Please try again.");
        }
      } catch {
        setError("Could not verify PIN. Please try again later.");
      } finally {
        setIsVerifying(false);
      }
    },
    [pin]
  );

  // Loading config
  if (configLoading) {
    return (
      <div className="fixed inset-0 bg-background flex items-center justify-center">
        <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // No PIN required or already granted
  if (!config?.pinRequired || granted) {
    return <>{children}</>;
  }

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10 pointer-events-none bg-[radial-gradient(circle,hsl(38,90%,55%),transparent_70%)]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-sm mx-4"
      >
        <div className="text-center mb-8">
          <Compass className="h-10 w-10 text-primary mx-auto mb-4" />
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            {config?.title || "Terranova"}
          </h1>
          <p className="font-body text-sm text-muted-foreground">
            {config?.message || "Enter the access PIN to explore the atlas."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="password"
              inputMode="numeric"
              autoComplete="off"
              maxLength={12}
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                setError(null);
              }}
              placeholder="Enter PIN"
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-card border border-border font-body text-base text-foreground text-center tracking-[0.3em] placeholder:text-muted-foreground placeholder:tracking-normal focus:outline-none focus:ring-2 focus:ring-primary/40"
              autoFocus
            />
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-destructive/10 border border-destructive/20"
            >
              <AlertCircle className="h-3.5 w-3.5 text-destructive shrink-0" />
              <p className="font-body text-xs text-destructive">{error}</p>
            </motion.div>
          )}

          <button
            type="submit"
            disabled={isVerifying || !pin.trim()}
            className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-body text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:pointer-events-none"
          >
            {isVerifying ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                Verifying…
              </span>
            ) : (
              "Enter Atlas"
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default PinGate;
