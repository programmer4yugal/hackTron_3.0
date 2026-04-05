import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  prefix?: string;
  className?: string;
};

export function Input({ prefix = '>', className = '', ...props }: InputProps) {
  return (
    <div className="relative w-full">
      {/* Prefix symbol */}
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-accent font-accent pointer-events-none select-none">
        {prefix}
      </span>
      <input
        className={`w-full pl-8 pr-3 py-2 bg-input border border-border cyber-chamfer font-mono text-accent placeholder:text-mutedForeground/70 focus:border-accent focus:shadow-[var(--box-shadow-neon-sm)] outline-none transition-all duration-200 ${className}`}
        {...props}
      />
    </div>
  );
}
