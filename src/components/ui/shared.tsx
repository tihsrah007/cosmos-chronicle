import { type ReactNode } from "react";
import { type LucideIcon } from "lucide-react";

/* ─── Section Header ─── */

interface SectionHeaderProps {
  icon?: LucideIcon;
  title: string;
  trailing?: ReactNode;
  className?: string;
}

export const SectionHeader = ({ icon: Icon, title, trailing, className }: SectionHeaderProps) => (
  <div className={`flex items-center gap-2 mb-4 ${className || ""}`}>
    {Icon && <Icon className="h-4 w-4 text-primary" />}
    <h2 className="font-display text-xl font-bold text-foreground">{title}</h2>
    {trailing && <span className="ml-auto">{trailing}</span>}
  </div>
);

/* ─── Domain Badge ─── */

interface DomainBadgeProps {
  label: string;
  color: string;
  size?: "xs" | "sm";
  className?: string;
}

export const DomainBadge = ({ label, color, size = "xs", className }: DomainBadgeProps) => (
  <span
    className={`inline-block rounded-md font-body font-semibold uppercase tracking-wider ${
      size === "sm" ? "px-2.5 py-0.5 text-xs" : "px-2 py-0.5 text-[10px]"
    } ${className || ""}`}
    style={{ backgroundColor: `${color}20`, color }}
  >
    {label}
  </span>
);

/* ─── Empty State ─── */

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  children?: ReactNode;
}

export const EmptyState = ({ icon: Icon, title, description, children }: EmptyStateProps) => (
  <div className="flex flex-col items-center py-20">
    <div className="h-16 w-16 rounded-2xl bg-secondary/60 border border-border flex items-center justify-center mb-5">
      <Icon className="h-7 w-7 text-muted-foreground/40" />
    </div>
    <h3 className="font-display text-lg font-bold text-foreground mb-2">{title}</h3>
    {description && (
      <p className="font-body text-sm text-muted-foreground text-center max-w-sm mb-6">{description}</p>
    )}
    {children}
  </div>
);

/* ─── Loading Spinner ─── */

interface LoadingSpinnerProps {
  label?: string;
}

export const LoadingSpinner = ({ label = "Loading…" }: LoadingSpinnerProps) => (
  <div className="flex flex-col items-center justify-center py-24">
    <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin mb-3" />
    <p className="font-body text-sm text-muted-foreground">{label}</p>
  </div>
);

/* ─── Page Shell (standard page layout with nav + back) ─── */

interface PageShellProps {
  children: ReactNode;
}

export const PageShell = ({ children }: PageShellProps) => (
  <div className="min-h-screen bg-background">{children}</div>
);

/* ─── Skeleton block ─── */

interface SkeletonBlockProps {
  lines?: number;
  className?: string;
}

export const SkeletonBlock = ({ lines = 3, className }: SkeletonBlockProps) => (
  <div className={`animate-pulse space-y-2 ${className || ""}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <div
        key={i}
        className="h-3 rounded bg-secondary/60"
        style={{ width: `${85 - i * 10}%` }}
      />
    ))}
  </div>
);

/* ─── Page Header (icon + title + description) ─── */

interface PageHeaderProps {
  icon: LucideIcon;
  title: string;
  highlight?: string;
  description?: string;
  trailing?: ReactNode;
}

export const PageHeader = ({ icon: Icon, title, highlight, description, trailing }: PageHeaderProps) => (
  <div className="flex items-start justify-between gap-4">
    <div>
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
          {title}{highlight && <span className="text-primary"> {highlight}</span>}
        </h1>
      </div>
      {description && (
        <p className="font-body text-muted-foreground max-w-2xl">{description}</p>
      )}
    </div>
    {trailing && <div className="shrink-0 pt-2">{trailing}</div>}
  </div>
);

/* ─── Back Button ─── */

import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BackButtonProps {
  label?: string;
  to?: string;
  className?: string;
}

export const BackButton = ({ label = "Back", to, className }: BackButtonProps) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => (to ? navigate(to) : navigate(-1))}
      className={`flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors font-body text-sm mb-6 print:hidden ${className || ""}`}
    >
      <ChevronLeft className="h-4 w-4" /> {label}
    </button>
  );
};

/* ─── Action Chip Button ─── */

interface ActionChipProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  variant?: "default" | "primary" | "destructive";
  className?: string;
}

export const ActionChip = ({
  icon: Icon,
  label,
  onClick,
  active,
  disabled,
  variant = "default",
  className,
}: ActionChipProps) => {
  const base = "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-body text-[11px] font-medium transition-colors";
  const variants = {
    default: active
      ? "bg-primary/10 text-primary cursor-default"
      : "bg-secondary border border-border text-muted-foreground hover:text-foreground hover:border-primary/30",
    primary: "bg-primary text-primary-foreground",
    destructive: "bg-secondary border border-border text-muted-foreground hover:text-destructive hover:border-destructive/30",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || active}
      className={`${base} ${variants[variant]} ${className || ""}`}
    >
      <Icon className="h-3 w-3" />
      {label}
    </button>
  );
};
