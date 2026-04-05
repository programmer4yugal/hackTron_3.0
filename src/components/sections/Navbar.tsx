import { useState } from 'react'
import { Button } from '../Button'
import { Menu, X } from 'lucide-react'

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed w-full top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="text-h3 font-heading text-accent">
              &gt;_
            </div>
            <span className="font-heading text-xl font-bold text-foreground uppercase">Cyber</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            <a href="#features" className="text-foreground hover:text-accent transition-colors font-mono">
              Features
            </a>
            <a href="#pricing" className="text-foreground hover:text-accent transition-colors font-mono">
              Pricing
            </a>
            <a href="#faq" className="text-foreground hover:text-accent transition-colors font-mono">
              FAQ
            </a>
            <Button variant="glitch" size="sm">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-accent hover:text-accent-secondary"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden border-t border-border pb-4 animate-in">
            <a href="#features" className="block py-2 text-foreground hover:text-accent font-mono text-sm">
              Features
            </a>
            <a href="#pricing" className="block py-2 text-foreground hover:text-accent font-mono text-sm">
              Pricing
            </a>
            <a href="#faq" className="block py-2 text-foreground hover:text-accent font-mono text-sm">
              FAQ
            </a>
            <div className="py-2">
              <Button variant="glitch" size="sm" className="w-full">
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
