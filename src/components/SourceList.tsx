import { ExternalLink } from "lucide-react";
import { SourceConfidenceBadge, CopyCitationButton, inferSourceType } from "@/components/SourceBadge";

interface Source {
  label: string;
  url?: string;
}

interface SourceListProps {
  sources: Source[];
  showBadges?: boolean;
  showCopy?: boolean;
  compact?: boolean;
}

const SourceList = ({ sources, showBadges = true, showCopy = true, compact }: SourceListProps) => {
  if (!sources || sources.length === 0) return null;

  return (
    <div className={compact ? "" : "border-t border-border pt-3"}>
      <span className="font-body text-[10px] text-muted-foreground/60 uppercase tracking-wider">
        Sources
      </span>
      <div className="mt-1.5 space-y-1.5">
        {sources.map((src, i) => {
          const srcType = inferSourceType(src.label, src.url);
          return (
            <div key={i} className="flex items-center gap-1.5 flex-wrap">
              {showBadges && <SourceConfidenceBadge type={srcType} />}
              {src.url ? (
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-[11px] text-primary hover:underline inline-flex items-center gap-1"
                >
                  {src.label}
                  <ExternalLink className="h-2.5 w-2.5" />
                </a>
              ) : (
                <span className="font-body text-[11px] text-muted-foreground">{src.label}</span>
              )}
              {showCopy && <CopyCitationButton label={src.label} url={src.url} />}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SourceList;
