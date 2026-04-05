import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'glitch' | 'destructive';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
};

export function Button({
  children,
  variant = 'default',
  className = '',
  onClick,
  type = 'button',
  disabled = false,
}: ButtonProps) {
  let base =
    'px-6 py-2 font-accent uppercase tracking-widest transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background cyber-chamfer';
  let variantClass = '';
  switch (variant) {
    case 'default':
      variantClass =
        'bg-transparent border-2 border-accent text-accent hover:bg-accent hover:text-background shadow-[var(--box-shadow-neon-sm)] hover:shadow-[var(--box-shadow-neon)]';
      break;
    case 'secondary':
      variantClass =
        'bg-transparent border-2 border-accentSecondary text-accentSecondary hover:bg-accentSecondary hover:text-background shadow-[var(--box-shadow-neon-secondary)]';
      break;
    case 'outline':
      variantClass =
        'bg-transparent border border-border text-foreground hover:border-accent hover:text-accent shadow-none hover:shadow-[var(--box-shadow-neon-sm)]';
      break;
    case 'ghost':
      variantClass =
        'bg-transparent border-none text-accent hover:bg-accent/10 shadow-none';
      break;
    case 'glitch':
      variantClass =
        'bg-accent text-background cyber-glitch shadow-[var(--box-shadow-neon)] hover:brightness-110';
      break;
    case 'destructive':
      variantClass =
        'bg-destructive text-background border-2 border-destructive shadow-[var(--box-shadow-neon-secondary)] hover:brightness-110';
      break;
    default:
      break;
  }
  return (
    <button
      type={type}
      className={`${base} ${variantClass} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
