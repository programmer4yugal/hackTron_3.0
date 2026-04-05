import { Button } from '../Button'
import { Badge } from '../Badge'
import { Zap } from 'lucide-react'

export const Hero = () => {
  return (
    <section className="relative w-full min-h-screen bg-background circuit-grid overflow-hidden pt-16">
      {/* Ambient background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent opacity-5 blur-3xl rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-secondary opacity-5 blur-3xl rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-screen">
          {/* Left Content - 60% */}
          <div>
            {/* Badge */}
            <div className="mb-6">
              <Badge variant="secondary" className="flex items-center gap-2 w-fit">
                <Zap size={14} />
                High-Tech, Low-Life
              </Badge>
            </div>

            {/* Main Headline with glitch effect */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-heading font-black uppercase tracking-widest text-accent mb-6 leading-none">
              <span className="block mb-4">Welcome</span>
              <span className="block text-glitch" data-text="To The Sprawl">
                To The Sprawl
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-base md:text-lg text-muted-foreground font-mono mb-8 leading-relaxed max-w-lg">
              Experience the collision of advanced technology and societal decay. Dive into a digital dystopia where danger meets elegance, and every interface feels alive with electric potential.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <Button variant="glitch" size="lg">
                Access Terminal
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>

            {/* Stats bar */}
            <div className="mt-16 grid grid-cols-3 gap-4 pt-8 border-t border-border">
              <div>
                <div className="text-2xl font-heading text-accent">100%</div>
                <p className="text-muted-foreground text-sm font-mono">Neon Powered</p>
              </div>
              <div>
                <div className="text-2xl font-heading text-accent-secondary">24/7</div>
                <p className="text-muted-foreground text-sm font-mono">Always Online</p>
              </div>
              <div>
                <div className="text-2xl font-heading text-accent-tertiary">∞</div>
                <p className="text-muted-foreground text-sm font-mono">Infinite Glitch</p>
              </div>
            </div>
          </div>

          {/* Right Content - 40% HUD Panel */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative w-full max-w-md">
              {/* Holographic card with corner accents */}
              <div className="bg-muted bg-opacity-20 border-2 border-accent border-opacity-40 p-8 chamfer backdrop-blur-sm">
                {/* Corner accents */}
                <div className="absolute top-3 left-3 w-8 h-8 border-2 border-accent opacity-60"></div>
                <div className="absolute top-3 right-3 w-8 h-8 border-2 border-accent-secondary opacity-60"></div>
                <div className="absolute bottom-3 left-3 w-8 h-8 border-2 border-accent-tertiary opacity-60"></div>
                <div className="absolute bottom-3 right-3 w-8 h-8 border-2 border-accent opacity-60"></div>

                <div className="space-y-6">
                  {/* Terminal-style header */}
                  <div className="border-b border-border pb-4">
                    <div className="text-label text-accent font-mono">
                      &gt;_ system_status.exe
                    </div>
                  </div>

                  {/* Status lines */}
                  <div className="space-y-3 font-mono text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">&gt; status:</span>
                      <span className="text-accent animate-pulse">ACTIVE</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">&gt; signal:</span>
                      <span className="text-accent-secondary">STRONG</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">&gt; network:</span>
                      <span className="text-accent-tertiary">ONLINE</span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="pt-4 border-t border-border">
                    <div className="text-label text-muted-foreground mb-2">LOADING EXPERIENCE</div>
                    <div className="h-1 bg-border overflow-hidden">
                      <div className="h-full w-3/4 bg-gradient-to-r from-accent to-accent-secondary animate-pulse"></div>
                    </div>
                  </div>

                  {/* Terminal cursor */}
                  <div className="pt-2">
                    <span className="text-accent font-bold animate-blink">_</span>
                  </div>
                </div>
              </div>

              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-accent via-accent-secondary to-accent-tertiary opacity-10 blur-3xl pointer-events-none chamfer"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent"></div>
    </section>
  )
}
