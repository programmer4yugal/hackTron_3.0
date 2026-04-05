import { HTMLAttributes, ReactNode } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'terminal' | 'holographic'
  children: ReactNode
  hoverEffect?: boolean
}

const baseStyles = 'rounded-none transition-all'

const variantStyles: { default: string; terminal: string; holographic: string } = {
  default: 'bg-card border border-border chamfer hover-glow',
  terminal: `bg-background border border-border chamfer relative
    before:content-[""] before:absolute before:top-0 before:left-0 before:right-0 before:h-6 before:bg-gradient-to-r before:from-red-600 before:via-yellow-500 before:to-green-500 before:rounded-tl-none before:clip-path-terminal-header
    before:z-10`,
  holographic: 'bg-muted bg-opacity-30 border border-accent border-opacity-30 chamfer backdrop-blur-sm hover-glow',
}

export const Card = ({
  variant = 'default',
  children,
  hoverEffect = false,
  className = '',
  ...props
}: CardProps) => {

  const hover = hoverEffect ? 'hover:-translate-y-1 hover:border-accent' : ''

  return (
    <div
      className={`${baseStyles} ${variantStyles[variant]} ${hover} ${className}`}
      {...props}
    >
      {variant === 'terminal' && <div className="pt-8">{children}</div>}
      {variant !== 'terminal' && children}
    </div>
  )
}
