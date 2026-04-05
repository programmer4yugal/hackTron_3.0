import React from 'react';
import { Card } from '../Card';

const features = [
  {
    title: 'INTERROGATION',
    desc: 'Extracts problem, target users, unique value, risks, and assumptions from raw idea into structured fields.',
  },
  {
    title: 'VALIDATION',
    desc: 'Scores viability against market reality. Returns BUILD or KILL decision with confidence and recommendations.',
  },
  {
    title: 'RESEARCH',
    desc: 'Produces market trends, competitor framing, market gaps, pricing strategy, and GTM direction.',
  },
  {
    title: 'PROJECT PLANNING',
    desc: 'Generates phases, timeline, milestones, resources, budget, team structure, and risk assessment.',
  },
  {
    title: 'CONTENT GENERATION',
    desc: 'Creates pitch deck, landing copy, social posts, email sequences, and messaging framework.',
  },
  {
    title: 'LEARNING PATH',
    desc: 'Generates skill roadmap, courses, milestones, tools, communities, and mentorship resources.',
  },
];

export function Features() {
  return (
    <section
      id="features"
      className="relative py-24 overflow-hidden"
    >
      {/* Circuit/grid background */}
      <div className="pointer-events-none absolute inset-0 z-0" style={{backgroundImage: 'linear-gradient(rgba(0,255,136,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,136,0.03) 1px,transparent 1px)', backgroundSize: '50px 50px'}} />
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-heading font-black uppercase tracking-widest text-center mb-16 cyber-glitch bg-gradient-to-r from-accentSecondary to-accentTertiary bg-clip-text text-transparent">
          Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 -skew-y-1">
          {features.map((feature, i) => (
            <Card key={i} hoverEffect className="h-full">
              <h3 className="text-2xl font-accent font-bold text-accentTertiary mb-4 uppercase tracking-wide cyber-glitch">
                {feature.title}
              </h3>
              <p className="text-base text-foreground/80 font-body">
                {feature.desc}
              </p>
            </Card>
          ))}
        </div>
      </div>
      {/* Scanline overlay */}
      <div className="pointer-events-none absolute inset-0 z-20" style={{background: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.3) 2px,rgba(0,0,0,0.3) 4px)'}} />
    </section>
  );
}
