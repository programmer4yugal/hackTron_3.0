import React, { useState } from "react";
import { submitWorkflow } from "../services/api";

export default function InputBox({ onAnalyze, onLoading }) {
  const [idea, setIdea] = useState("");
  const [userType, setUserType] = useState("founder");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (!idea.trim()) {
      setError("Please enter an idea");
      return;
    }

    setIsLoading(true);
    setError(null);
    onLoading?.(true);

    try {
      const result = await submitWorkflow(idea, userType);
      onAnalyze?.(result);
      setIdea("");
    } catch (err) {
      setError(err.message || "Failed to process idea");
      console.error(err);
    } finally {
      setIsLoading(false);
      onLoading?.(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.ctrlKey && idea.trim() && !isLoading) {
      handleSubmit();
    }
  };

  return (
    <div className="relative group w-full max-w-2xl mx-auto">
      <div className="absolute -inset-1 bg-gradient-to-r from-accentSecondary to-accentTertiary rounded-none cyber-chamfer blur opacity-30 group-hover:opacity-50 transition duration-700 group-hover:duration-200 pointer-events-none" />
      
      <div className="relative flex flex-col bg-input border border-accent/40 cyber-chamfer p-4 shadow-[var(--box-shadow-neon-sm)]">
        
        {/* User Type Selector */}
        <div className="mb-4 flex gap-4 flex-wrap">
          {["student", "founder", "creator"].map((type) => (
            <label key={type} className="flex items-center gap-2 cursor-pointer text-sm">
              <input
                type="radio"
                name="userType"
                value={type}
                checked={userType === type}
                onChange={(e) => setUserType(e.target.value)}
                disabled={isLoading}
                className="w-4 h-4"
              />
              <span className="font-accent uppercase capitalize text-foreground/80">{type}</span>
            </label>
          ))}
        </div>

        {/* Idea Input */}
        <textarea
          className="w-full bg-transparent text-accent font-mono p-4 resize-none outline-none text-lg min-h-[100px] placeholder:text-mutedForeground/70 cyber-glitch border-b border-accent/20 mb-4"
          placeholder="> Enter your idea... (e.g. A marketplace for trading custom CSS snippets)"
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          aria-label="Enter your idea"
        />

        {/* Error Message */}
        {error && (
          <div className="text-destructive text-sm mb-4 font-mono">{`> Error: ${error}`}</div>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!idea.trim() || isLoading}
          className="px-5 py-3 rounded-none cyber-chamfer font-accent uppercase tracking-widest bg-accent text-background shadow-[var(--box-shadow-neon)] hover:brightness-110 transition-all duration-150 disabled:opacity-50 disabled:pointer-events-none self-end"
          aria-label="Submit idea"
        >
          {isLoading ? <span className="animate-pulse">Processing...</span> : "► Analyze Idea"}
        </button>
      </div>

      {/* Scanline overlay */}
      <div className="pointer-events-none absolute inset-0 z-10" style={{background: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.3) 2px,rgba(0,0,0,0.3) 4px)'}} />
    </div>
  );
}