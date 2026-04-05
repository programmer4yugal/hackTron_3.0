import React from 'react';
import ShaderBackground from '../ui/shader-background';

export function Hero() {
  return (
    <section className="relative min-h-[70vh] flex flex-col items-center justify-center overflow-hidden py-24">
      {/* Animated cyberpunk background */}
      <ShaderBackground />
      {/* Scanline overlay */}
      <div className="pointer-events-none absolute inset-0 z-10" style={{background: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.3) 2px,rgba(0,0,0,0.3) 4px)'}} />
      <div className="relative z-20 flex flex-col items-center justify-center text-center gap-6">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black uppercase tracking-widest cyber-glitch animate-glitch bg-gradient-to-r from-accentSecondary via-accent to-accentTertiary bg-clip-text text-transparent drop-shadow-[0_0_20px_#00ff88]">
          Build or Kill AI
        </h1>
        <p className="text-lg md:text-2xl font-body text-foreground/80 max-w-2xl mx-auto mt-4 cyber-glitch">
          Convert raw ideas into structured execution packages. Validate before you build.
          <span className="inline-block w-2 h-6 align-middle bg-accent ml-2 animate-blink" />
        </p>
        <a href="#features" className="mt-8">
          <button className="px-8 py-4 font-accent uppercase tracking-widest bg-accent text-background cyber-chamfer shadow-[var(--box-shadow-neon)] hover:brightness-110 transition-all text-lg">
            Get Started
          </button>
        </a>
      </div>
    </section>
  );
}
