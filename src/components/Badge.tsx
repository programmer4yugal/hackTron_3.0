import { HTMLAttributes, ReactNode } from 'react'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'tertiary' | 'destructive'
  children: ReactNode
}

const variantStyles: { default: string; secondary: string; tertiary: string; destructive: string } = {
  default: 'bg-accent text-background',
  secondary: 'bg-accent-secondary text-background',
  tertiary: 'bg-accent-tertiary text-background',
  destructive: 'bg-destructive text-background',
}

export const Badge = ({
  variant = 'default',
  children,
  className = '',
  ...props
}: BadgeProps) => {

  return (
    <span
      className={`
        inline-block px-3 py-1 
        text-label font-mono uppercase
        ${variantStyles[variant]}
        chamfer-sm
        ${className}
      `}
      {...props}
    >
      {children}
    </span>
  )
}
