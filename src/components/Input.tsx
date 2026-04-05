import { InputHTMLAttributes, ReactNode } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  prefix?: string
  icon?: ReactNode
}

export const Input = ({
  label,
  error,
  prefix = '>',
  icon,
  className = '',
  ...props
}: InputProps) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-label text-accent mb-2 uppercase tracking-widest">
          {label}
        </label>
      )}
      <div className="relative">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-accent font-mono text-label pointer-events-none">
            {prefix}
          </span>
        )}
        <input
          className={`
            w-full px-4 py-2 pl-8 
            bg-input border border-border
            text-accent font-mono text-base
            placeholder:text-muted-foreground placeholder:opacity-50
            focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background
            focus:border-accent
            chamfer-sm
            transition-all
            ${error ? 'border-destructive focus:ring-destructive' : ''}
            ${icon ? 'pr-10' : ''}
            ${className}
          `}
          {...props}
        />
        {icon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-accent pointer-events-none">
            {icon}
          </div>
        )}
      </div>
      {error && (
        <p className="text-destructive text-sm mt-1 font-mono">{error}</p>
      )}
    </div>
  )
}
