import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'glitch' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
}

const sizeStyles: { sm: string; md: string; lg: string } = {
  sm: 'px-3 py-1 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
}

const variantStyles: { default: string; secondary: string; outline: string; ghost: string; glitch: string; destructive: string } = {
  default: 'bg-transparent border-2 border-accent text-accent hover:bg-accent hover:text-background chamfer-sm',
  secondary: 'bg-transparent border-2 border-accent-secondary text-accent-secondary hover:bg-accent-secondary hover:text-background chamfer-sm',
  outline: 'bg-transparent border border-border text-foreground hover:border-accent hover:text-accent chamfer-sm',
  ghost: 'bg-transparent text-foreground hover:bg-accent hover:bg-opacity-10 hover:text-accent',
  glitch: 'bg-accent text-background border border-accent uppercase font-bold hover:brightness-125 chamfer-sm relative',
  destructive: 'bg-destructive text-background border border-destructive hover:bg-opacity-90 chamfer-sm',
}

const hoverGlowStyles: { default: string; secondary: string; outline: string; ghost: string; glitch: string; destructive: string } = {
  default: 'hover:shadow-neon',
  secondary: 'hover:shadow-neon-secondary',
  outline: 'hover:shadow-neon',
  ghost: '',
  glitch: 'hover:shadow-neon-lg',
  destructive: '',
}

const baseStyles = 'font-mono uppercase tracking-widest transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed'

export const Button = ({
  variant = 'default',
  size = 'md',
  children,
  className = '',
  ...props
}: ButtonProps) => {

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${hoverGlowStyles[variant]} ${className}`}
      data-text={typeof children === 'string' ? children : ''}
      {...props}
    >
      {children}
    </button>
  )
}
