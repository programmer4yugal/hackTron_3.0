import React from 'react';

type BadgeProps = {
  children: React.ReactNode;
  variant?: 'default' | 'glitch' | 'secondary';
  className?: string;
};

export function Badge({
  children,
  variant = 'default',
  className = '',
}: BadgeProps) {
  let base =
    'px-3 py-1 font-accent text-xs uppercase tracking-[0.2em] cyber-chamfer select-none';
  let variantClass = '';
  switch (variant) {
    case 'default':
      variantClass = 'bg-accent text-background shadow-[var(--box-shadow-neon-sm)]';
      break;
    case 'secondary':
      variantClass = 'bg-accentSecondary text-background shadow-[var(--box-shadow-neon-secondary)]';
      break;
    case 'glitch':
      variantClass = 'bg-accent text-background cyber-glitch shadow-[var(--box-shadow-neon)]';
      break;
    default:
      break;
  }
  return (
    <span className={`${base} ${variantClass} ${className}`}>{children}</span>
  );
}
