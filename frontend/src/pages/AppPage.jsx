import { useState } from "react";
import InputBox from "../components/InputBox";
import ResultCard from "../components/ResultCard";
import { Code, Layout, Palette, LayoutDashboard, Rocket } from "lucide-react";

export default function AppPage() {
  const [idea, setIdea] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = () => {
    if (!idea.trim()) return;
    
    setIsLoading(true);
    setResult(null);

    // Simulate AI Processing and fake intelligence logic based on length/words
    setTimeout(() => {
      const isGoodIdea = idea.length > 20 && !idea.toLowerCase().includes("clone");
      
      const score = isGoodIdea ? Math.floor(Math.random() * 20) + 80 : Math.floor(Math.random() * 30) + 30;
      
      setResult({
        verdict: isGoodIdea ? "BUILD" : "KILL",
        score: score,
        plan: isGoodIdea ? [
          "Define MVP Scope - Strip down to core 1 feature.",
          "Setup Next.js / Supabase boilerplate",
          "Create marketing landing page to collect emails",
          "Launch on Product Hunt within 7 days"
        ] : [
          "Too saturated or undefined.",
          "Pivot to a niche subset.",
          "Find a problem you actually have.",
          "Don't write any code yet."
        ],
        content: isGoodIdea 
          ? `The idea shows promise. The market for this is actively growing, but execution is everything. Focus on a tight feedback loop and don't over-engineer the initial tech stack.`
          : `This is a tar pit idea. Many have tried, but distribution will be your biggest bottleneck. Consider pivoting to a B2B angle or solving a microscopic niche first.`
      });
      setIsLoading(false);
    }, 2000);
  };

  const quickActions = [
    { name: "Generate Code", icon: <Code size={16} /> },
    { name: "Launch App", icon: <Rocket size={16} /> },
    { name: "UI Components", icon: <Layout size={16} /> },
    { name: "Theme Ideas", icon: <Palette size={16} /> },
    { name: "User Dashboard", icon: <LayoutDashboard size={16} /> },
  ];

  return (
    <div className="min-h-screen pt-24 px-6 pb-20 max-w-4xl mx-auto relative">
      
      {/* Top Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent inline-block">
          Build something amazing
        </h1>
        <p className="text-white/50 mt-2">— just start typing below.</p>
      </div>

      {/* Main interaction */}
      <div className="flex flex-col gap-6 w-full relative z-10">
        <InputBox 
          value={idea} 
          onChange={(e) => setIdea(e.target.value)} 
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3 justify-center">
          {quickActions.map((action, i) => (
            <button 
              key={i} 
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-sm text-white/80 hover:text-white transition-colors"
            >
              {action.icon}
              {action.name}
            </button>
          ))}
        </div>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="mt-20 flex flex-col items-center justify-center text-cyan-400 animate-pulse">
          <div className="w-12 h-12 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin mb-4" />
          <p className="font-semibold tracking-widest uppercase text-sm">Running AI Interrogation...</p>
        </div>
      )}

      {/* Result presentation */}
      <ResultCard result={result} />

    </div>
  );
}