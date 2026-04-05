import React from 'react';

type CardProps = {
  children: React.ReactNode;
  variant?: 'default' | 'terminal' | 'holographic';
  className?: string;
  hoverEffect?: boolean;
};

export function Card({
  children,
  variant = 'default',
  className = '',
  hoverEffect = false,
}: CardProps) {
  let base =
    'p-6 cyber-chamfer transition-all duration-300';
  let variantClass = '';
  switch (variant) {
    case 'default':
      variantClass =
        'bg-card border border-border shadow-[var(--box-shadow-neon-sm)]';
      break;
    case 'terminal':
      variantClass =
        'bg-background border border-border relative pt-10 shadow-[var(--box-shadow-neon-tertiary)]';
      break;
    case 'holographic':
      variantClass =
        'bg-muted/30 border border-accent/30 shadow-[var(--box-shadow-neon-lg)] backdrop-blur-lg relative';
      break;
    default:
      break;
  }
  let hoverClass = hoverEffect
    ? 'hover:-translate-y-1 hover:border-accent hover:shadow-[var(--box-shadow-neon)]'
    : '';

  return (
    <div className={`${base} ${variantClass} ${hoverClass} ${className}`}>
      {/* Terminal header bar */}
      {variant === 'terminal' && (
        <div className="absolute left-0 top-0 w-full h-8 flex items-center gap-2 px-4 bg-muted/60 border-b border-border/40 cyber-chamfer z-10">
          <span className="w-3 h-3 rounded-full bg-destructive/80 border border-destructive/60" />
          <span className="w-3 h-3 rounded-full bg-accent/80 border border-accent/60" />
          <span className="w-3 h-3 rounded-full bg-accentTertiary/80 border border-accentTertiary/60" />
        </div>
      )}
      {/* Holographic corner accents */}
      {variant === 'holographic' && (
        <>
          <span className="absolute left-0 top-0 w-4 h-4 border-t-2 border-l-2 border-accent/40" />
          <span className="absolute right-0 top-0 w-4 h-4 border-t-2 border-r-2 border-accent/40" />
          <span className="absolute left-0 bottom-0 w-4 h-4 border-b-2 border-l-2 border-accent/40" />
          <span className="absolute right-0 bottom-0 w-4 h-4 border-b-2 border-r-2 border-accent/40" />
        </>
      )}
      {children}
    </div>
  );
}
