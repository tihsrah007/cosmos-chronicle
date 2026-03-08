import { useState } from "react";
import { GLOSSARY_MAP } from "@/data/glossary";

interface GlossaryTooltipProps {
  /** The full text to scan for glossary terms */
  text: string;
  className?: string;
}

/**
 * Renders text with inline glossary tooltips for recognized terms.
 * Keeps interactions subtle — hover/focus to reveal definition.
 */
const GlossaryTooltip = ({ text, className }: GlossaryTooltipProps) => {
  const [activeTerm, setActiveTerm] = useState<string | null>(null);

  // Build regex from glossary terms (longest first to avoid partial matches)
  const terms = Array.from(GLOSSARY_MAP.keys()).sort((a, b) => b.length - a.length);
  if (terms.length === 0) return <span className={className}>{text}</span>;

  const pattern = new RegExp(
    `\\b(${terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})\\b`,
    "gi"
  );

  const parts: { text: string; isTerm: boolean }[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ text: text.slice(lastIndex, match.index), isTerm: false });
    }
    parts.push({ text: match[0], isTerm: true });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push({ text: text.slice(lastIndex), isTerm: false });
  }

  if (parts.length === 0) return <span className={className}>{text}</span>;

  return (
    <span className={className}>
      {parts.map((part, i) => {
        if (!part.isTerm) return <span key={i}>{part.text}</span>;

        const entry = GLOSSARY_MAP.get(part.text.toLowerCase());
        if (!entry) return <span key={i}>{part.text}</span>;

        const isActive = activeTerm === `${i}-${entry.term}`;

        return (
          <span
            key={i}
            className="relative inline-block"
            onMouseEnter={() => setActiveTerm(`${i}-${entry.term}`)}
            onMouseLeave={() => setActiveTerm(null)}
            onFocus={() => setActiveTerm(`${i}-${entry.term}`)}
            onBlur={() => setActiveTerm(null)}
            tabIndex={0}
            role="button"
            aria-label={`Definition: ${entry.term}`}
          >
            <span className="border-b border-dotted border-primary/40 text-foreground cursor-help">
              {part.text}
            </span>
            {isActive && (
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-60 px-3 py-2 rounded-lg bg-popover border border-border shadow-lg pointer-events-none">
                <span className="font-display text-xs font-bold text-foreground block mb-0.5">
                  {entry.term}
                </span>
                <span className="font-body text-[10px] text-muted-foreground leading-relaxed block">
                  {entry.definition}
                </span>
              </span>
            )}
          </span>
        );
      })}
    </span>
  );
};

export default GlossaryTooltip;
