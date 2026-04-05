import { motion } from "framer-motion";
import React from "react";

// Cyberpunk/Glitch styled workflow pipeline
const steps = [
  { name: "Idea", desc: "You bring the raw concept." },
  { name: "AI Interrogation", desc: "We ask the hard questions." },
  { name: "Build/Kill Decision", desc: "The cold hard truth." },
  { name: "Deep Research", desc: "Market & competitor mapping." },
  { name: "Project Plan", desc: "Step-by-step execution." },
  { name: "Final Output", desc: "Code, copy, and next steps." }
];

export default function Workflow() {
  return (
    <section id="workflow" className="w-full max-w-5xl mx-auto py-24 relative px-4">
      {/* Glitchy vertical connector line */}
      <div className="absolute left-1/2 top-32 bottom-24 w-px bg-gradient-to-b from-accent/20 via-accent/80 to-accentTertiary/20 blur-[1px] hidden md:block pointer-events-none" />
      <h2 className="text-4xl md:text-6xl font-heading font-black text-center mb-16 uppercase tracking-widest cyber-glitch">
        The Validation <span className="bg-gradient-to-r from-accentSecondary to-accentTertiary bg-clip-text text-transparent">Pipeline</span>
      </h2>
      <div className="flex flex-col gap-8 md:gap-16">
        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
            viewport={{ once: true }}
            className={`flex flex-col md:flex-row items-center gap-6 md:gap-12 ${idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
          >
            {/* Step Card */}
            <div className={`flex-1 text-center ${idx % 2 === 0 ? "md:text-right" : "md:text-left"} md:w-1/2`}>
              <div className="p-6 rounded-none border border-accent/30 bg-card/80 backdrop-blur-xl shadow-[var(--box-shadow-neon-sm)] hover:shadow-[var(--box-shadow-neon-lg)] cyber-chamfer transition-all duration-300">
                <span className="text-xs font-accent text-accentTertiary tracking-[0.2em] mb-2 block">
                  STEP 0{idx + 1}
                </span>
                <h3 className="text-2xl font-bold mb-2 text-accentSecondary cyber-glitch">
                  {step.name}
                </h3>
                <p className="text-base text-foreground/80 font-body">
                  {step.desc}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}