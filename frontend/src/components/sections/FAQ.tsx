import React, { useState } from 'react';
import { Card } from '../Card';

const faqs = [
  {
    q: 'What happens if validation returns KILL?',
    a: 'You get a detailed termination report with pivot recommendations. Stop losses fast.',
  },
  {
    q: 'How long does a full pipeline run?',
    a: '2–5 minutes depending on model latency. One API call returns all 6 stages.',
  },
  {
    q: 'What format is the execution package?',
    a: 'JSON object with all interrogation, validation, research, project, content, and learning outputs.',
  },
  {
    q: 'Can I export or integrate the results?',
    a: 'Yes. JSON export, API webhooks, and Zapier integration for downstream tools.',
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="faq" className="relative py-24 bg-background/95 overflow-hidden">
      <div className="relative z-10 max-w-3xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-heading font-black uppercase tracking-widest text-center mb-16 cyber-glitch bg-gradient-to-r from-accentSecondary to-accentTertiary bg-clip-text text-transparent">
          FAQ
        </h2>
        <div className="flex flex-col gap-6">
          {faqs.map((faq, i) => (
            <Card key={i} variant="terminal" hoverEffect className="overflow-hidden">
              <button
                className="w-full text-left flex items-center justify-between font-accent text-accentTertiary text-lg uppercase tracking-widest focus:outline-none"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                aria-controls={`faq-panel-${i}`}
              >
                <span>{faq.q}</span>
                <span className="ml-4 text-accentTertiary">{open === i ? '-' : '>'}</span>
              </button>
              <div
                id={`faq-panel-${i}`}
                className={`transition-all duration-300 text-foreground/80 font-body mt-2 ${open === i ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
                aria-hidden={open !== i}
              >
                <div className="py-2 pl-6 border-l-2 border-accent/40">
                  {faq.a}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      {/* Scanline overlay */}
      <div className="pointer-events-none absolute inset-0 z-20" style={{ background: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.3) 2px,rgba(0,0,0,0.3) 4px)' }} />
    </section>
  );
}
