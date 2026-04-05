import React, { useState, Suspense, lazy } from 'react';
import { Navbar } from './components/sections/Navbar';
import { Hero } from './components/sections/Hero';
import { Features } from './components/sections/Features';
import { Pricing } from './components/sections/Pricing';
import { FAQ } from './components/sections/FAQ';
import { Footer } from './components/sections/Footer';

const Workflow = lazy(() => import('./components/Workflow'));
const InputBox = lazy(() => import('./components/InputBox'));
const ResultCard = lazy(() => import('./components/ResultCard'));

function App() {
  const [workflowResult, setWorkflowResult] = useState(null);

  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <Navbar />
      <Hero />
      <Features />
      
      <Suspense fallback={null}>
        <Workflow />
      </Suspense>
      
      <section className="py-24 px-4 bg-background/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-heading font-black uppercase tracking-widest text-center mb-12 cyber-glitch bg-gradient-to-r from-accentSecondary to-accentTertiary bg-clip-text text-transparent">
            Start Your Analysis
          </h2>
          <Suspense fallback={null}>
            <InputBox 
              onAnalyze={setWorkflowResult}
              onLoading={() => {}}
            />
            {workflowResult && <ResultCard result={workflowResult} />}
          </Suspense>
        </div>
      </section>
      
      <Pricing />
      <FAQ />
      <Footer />
    </div>
  );
}

export default App;
