import React, { useState } from 'react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/40 cyber-chamfer">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 cyber-chamfer bg-gradient-to-br from-accentSecondary to-accentTertiary flex items-center justify-center text-background font-black text-lg shadow-[var(--box-shadow-neon-secondary)]">
            <span className="cyber-glitch">⚡</span>
          </div>
          <span className="font-heading text-lg tracking-widest bg-gradient-to-r from-foreground to-accentTertiary bg-clip-text text-transparent uppercase cyber-glitch">
            Build or Kill
          </span>
        </a>
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-accent uppercase tracking-widest">
          <a href="#workflow" className="text-mutedForeground hover:text-accent transition-colors">Workflow</a>
          <a href="#features" className="text-mutedForeground hover:text-accent transition-colors">Features</a>
          <a href="#pricing" className="text-mutedForeground hover:text-accent transition-colors">Pricing</a>
          <a href="#faq" className="text-mutedForeground hover:text-accent transition-colors">FAQ</a>
          <a href="/auth" className="px-4 py-2 rounded-none cyber-chamfer bg-accent text-background border border-accent/40 shadow-[var(--box-shadow-neon)] hover:brightness-110 transition-all font-semibold">Sign In</a>
        </div>
        {/* Mobile Toggle */}
        <button className="md:hidden text-accentTertiary" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          <span className="text-2xl">{isOpen ? "✕" : "☰"}</span>
        </button>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background/95 border-t border-border/30 px-6 py-4 flex flex-col gap-4 font-accent uppercase tracking-widest animate-in fade-in slide-in-from-top-4 duration-300">
          <a href="#workflow" className="text-mutedForeground hover:text-accent transition-colors" onClick={() => setIsOpen(false)}>Workflow</a>
          <a href="#features" className="text-mutedForeground hover:text-accent transition-colors" onClick={() => setIsOpen(false)}>Features</a>
          <a href="#pricing" className="text-mutedForeground hover:text-accent transition-colors" onClick={() => setIsOpen(false)}>Pricing</a>
          <a href="#faq" className="text-mutedForeground hover:text-accent transition-colors" onClick={() => setIsOpen(false)}>FAQ</a>
          <a href="/auth" className="px-4 py-2 rounded-none cyber-chamfer bg-accent text-background border border-accent/40 shadow-[var(--box-shadow-neon)] hover:brightness-110 transition-all font-semibold" onClick={() => setIsOpen(false)}>Sign In</a>
        </div>
      )}
    </nav>
  );
}
