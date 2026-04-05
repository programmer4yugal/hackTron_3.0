import React, { useState } from "react";

export default function ResultCard({ result }) {
  const [activeTab, setActiveTab] = useState("overview");

  if (!result) return null;

  const isTerminated = result.stage === "TERMINATED";
  const isBuild = result.executionPackage?.validation?.decision === "BUILD";

  const tabs = result.executionPackage
    ? Object.keys(result.executionPackage).filter((key) => result.executionPackage[key])
    : [];

  const renderContent = (key) => {
    const data = result.executionPackage[key];
    if (!data) return null;

    return (
      <div className="space-y-4">
        {typeof data === "object" ? (
          <pre className="bg-foreground/5 p-4 rounded text-xs overflow-auto max-h-96 text-foreground/80 font-mono">
            {JSON.stringify(data, null, 2)}
          </pre>
        ) : (
          <p className="text-foreground/80">{String(data)}</p>
        )}
      </div>
    );
  };

  return (
    <div className="w-full mt-12 mb-20 flex flex-col gap-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Verdict Block */}
      <div
        className={`p-8 md:p-12 cyber-chamfer border text-center transition-all duration-300 shadow-[var(--box-shadow-neon-lg)] ${
          isTerminated
            ? "bg-destructive/10 border-destructive/40"
            : isBuild
            ? "bg-accent/10 border-accent/40"
            : "bg-destructive/10 border-destructive/40"
        }`}
      >
        <p className="text-mutedForeground text-xs tracking-widest uppercase mb-2 font-accent">
          {isTerminated ? "Pipeline Terminated" : "Final Decision"}
        </p>
        <h1
          className={`text-5xl md:text-7xl font-black mb-4 uppercase cyber-glitch ${
            isTerminated || !isBuild
              ? "text-destructive drop-shadow-[0_0_20px_#ff3366aa]"
              : "text-accent drop-shadow-[0_0_20px_#00ff88aa]"
          }`}
        >
          {result.executionPackage?.validation?.decision || "PROCESSING"}
        </h1>
        {result.executionPackage?.buildScore && (
          <p className="text-xl md:text-2xl font-semibold text-foreground/80">
            Score: {result.executionPackage.buildScore}/100
          </p>
        )}
        {result.message && (
          <p className="text-foreground/60 mt-4 text-sm">{result.message}</p>
        )}
      </div>

      {/* Tab Navigation */}
      {tabs.length > 0 && (
        <div className="flex flex-wrap gap-2 border-b border-border/30 pb-4">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 font-accent uppercase tracking-widest text-xs transition-all ${
              activeTab === "overview"
                ? "text-accent border-b-2 border-accent"
                : "text-foreground/50 hover:text-foreground"
            }`}
          >
            Overview
          </button>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-accent uppercase tracking-widest text-xs transition-all capitalize ${
                activeTab === tab
                  ? "text-accent border-b-2 border-accent"
                  : "text-foreground/50 hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      )}

      {/* Content Area */}
      <div className="p-6 cyber-chamfer bg-card/80 border border-border/30 backdrop-blur-xl hover:shadow-[var(--box-shadow-neon-secondary)] transition">
        {activeTab === "overview" ? (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-bold text-accentTertiary font-accent uppercase tracking-widest mb-2">
                Pipeline Status
              </h3>
              <div className="flex flex-wrap gap-2">
                {result.pipeline?.map((stage) => (
                  <span
                    key={stage}
                    className="px-3 py-1 rounded text-xs bg-accent/20 text-accent font-mono uppercase"
                  >
                    ✓ {stage}
                  </span>
                ))}
              </div>
            </div>

            {result.nextSteps && result.nextSteps.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-accentTertiary font-accent uppercase tracking-widest mb-2">
                  Next Steps
                </h3>
                <ul className="flex flex-col gap-2">
                  {result.nextSteps.map((step, i) => (
                    <li key={i} className="flex gap-3 text-foreground/80 font-body">
                      <span className="text-accentSecondary font-bold">{i + 1}.</span>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {!isTerminated && (
              <p className="text-xs text-foreground/60 mt-4 bg-foreground/5 p-3 rounded">
                ℹ️ Click on stage tabs above to view detailed outputs from each pipeline stage.
              </p>
            )}
          </div>
        ) : (
          renderContent(activeTab)
        )}
      </div>

      {/* Debug Info (Development only) */}
      {process.env.NODE_ENV === "development" && (
        <details className="p-4 bg-foreground/5 rounded text-xs text-foreground/60 font-mono">
          <summary className="cursor-pointer font-bold mb-2">Raw Response (Dev)</summary>
          <pre className="overflow-auto max-h-64">{JSON.stringify(result, null, 2)}</pre>
        </details>
      )}
    </div>
  );
}