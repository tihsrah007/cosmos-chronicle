import { Copy, Check } from "lucide-react";
import { useState } from "react";

export type SourceConfidence =
  | "agency"
  | "research"
  | "media"
  | "government"
  | "observatory";

const BADGE_STYLES: Record<SourceConfidence, { bg: string; text: string; label: string }> = {
  agency: { bg: "hsla(38, 90%, 55%, 0.15)", text: "hsl(38, 90%, 55%)", label: "Agency" },
  research: { bg: "hsla(210, 70%, 55%, 0.15)", text: "hsl(210, 70%, 55%)", label: "Research" },
  media: { bg: "hsla(280, 60%, 55%, 0.15)", text: "hsl(280, 60%, 55%)", label: "Media" },
  government: { bg: "hsla(160, 60%, 45%, 0.15)", text: "hsl(160, 60%, 45%)", label: "Govt" },
  observatory: { bg: "hsla(340, 70%, 50%, 0.15)", text: "hsl(340, 70%, 50%)", label: "Observatory" },
};

/** Infer source type from URL or label heuristic */
export function inferSourceType(label: string, url?: string): SourceConfidence {
  const text = `${label} ${url || ""}`.toLowerCase();
  if (/\.gov|government|congress|parliament|ministry/.test(text)) return "government";
  if (/observatory|telescope|ligo|eso\b|esa\b/.test(text)) return "observatory";
  if (/nasa|usgs|noaa|eia\b|iea\b|smithsonian|cfr\b|unesco/.test(text)) return "agency";
  if (/nature\b|science\b|journal|arxiv|research|university|academic/.test(text)) return "research";
  return "media";
}

interface SourceBadgeProps {
  type: SourceConfidence;
  className?: string;
}

export const SourceConfidenceBadge = ({ type, className }: SourceBadgeProps) => {
  const style = BADGE_STYLES[type];
  return (
    <span
      className={`inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-body font-semibold uppercase tracking-wider ${className || ""}`}
      style={{ backgroundColor: style.bg, color: style.text }}
    >
      {style.label}
    </span>
  );
};

interface CopyCitationProps {
  label: string;
  url?: string;
}

export const CopyCitationButton = ({ label, url }: CopyCitationProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const citation = url ? `${label}. ${url}` : label;
    navigator.clipboard.writeText(citation).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <button
      onClick={handleCopy}
      className="p-0.5 rounded text-muted-foreground/50 hover:text-primary transition-colors"
      title="Copy citation"
      aria-label="Copy citation"
    >
      {copied ? <Check className="h-2.5 w-2.5 text-primary" /> : <Copy className="h-2.5 w-2.5" />}
    </button>
  );
};
