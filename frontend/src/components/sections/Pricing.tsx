import React from 'react';
import { Card } from '../Card';
import { Badge } from '../Badge';

const tiers = [
  {
    name: 'Idea Validator',
    price: 'Free',
    features: ['1 idea per month', 'Core 6-stage pipeline', 'JSON execution package'],
    highlight: false,
  },
  {
    name: 'Builder',
    price: '$29/mo',
    features: ['Unlimited ideas', 'Priority processing', 'Full API access', 'YouTube enrichment'],
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    features: ['Team collaboration', 'Batch processing', 'Execution history', 'Dedicated support'],
    highlight: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative py-24 bg-background/95 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-heading font-black uppercase tracking-widest text-center mb-16 cyber-glitch bg-gradient-to-r from-accentSecondary to-accentTertiary bg-clip-text text-transparent">
          Pricing
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {tiers.map((tier, i) => (
            <Card
              key={i}
              hoverEffect
              className={`flex flex-col items-center text-center ${
                tier.highlight ? 'scale-105 border-accent shadow-[var(--box-shadow-neon-lg)] z-20' : 'border-border shadow-[var(--box-shadow-neon-sm)]'
              }`}
              variant={tier.highlight ? 'holographic' : 'default'}
            >
              {tier.highlight && <Badge variant="glitch" className="mb-4">Most Popular</Badge>}
              <h3 className="text-2xl font-accent font-bold text-accentTertiary mb-2 uppercase tracking-wide cyber-glitch">
                {tier.name}
              </h3>
              <div className="text-4xl font-black text-accent mb-4">{tier.price}</div>
              <ul className="flex flex-col gap-2 mb-6">
                {tier.features.map((f, j) => (
                  <li key={j} className="text-foreground/80 font-body">{f}</li>
                ))}
              </ul>
              <button className="px-6 py-2 font-accent uppercase tracking-widest bg-accent text-background cyber-chamfer shadow-[var(--box-shadow-neon)] hover:brightness-110 transition-all text-base">
                Choose
              </button>
            </Card>
          ))}
        </div>
      </div>
      {/* Scanline overlay */}
      <div className="pointer-events-none absolute inset-0 z-20" style={{background: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.3) 2px,rgba(0,0,0,0.3) 4px)'}} />
    </section>
  );
}
