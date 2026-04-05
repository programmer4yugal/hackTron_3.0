import React, { useState } from 'react';
import { Navbar } from './components/sections/Navbar';
import { Hero } from './components/sections/Hero';
import { Features } from './components/sections/Features';
import { Pricing } from './components/sections/Pricing';
import { FAQ } from './components/sections/FAQ';
import { Footer } from './components/sections/Footer';
import Workflow from './components/Workflow';
import InputBox from './components/InputBox';
import ResultCard from './components/ResultCard';

function App() {
  const [workflowResult, setWorkflowResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <Navbar />
      <Hero />
      <Features />
      
      {/* Workflow Pipeline Visualization */}
      <Workflow />
      
      {/* Idea Submission Form */}
      <section className="py-24 px-4 bg-background/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-heading font-black uppercase tracking-widest text-center mb-12 cyber-glitch bg-gradient-to-r from-accentSecondary to-accentTertiary bg-clip-text text-transparent">
            Start Your Analysis
          </h2>
          <InputBox 
            onAnalyze={setWorkflowResult}
            onLoading={setIsProcessing}
          />
          {workflowResult && <ResultCard result={workflowResult} />}
        </div>
      </section>
      
      <Pricing />
      <FAQ />
      <Footer />
    </div>
  );
}

export default App;
