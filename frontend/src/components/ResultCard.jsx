export default function ResultCard({ result }) {
  if (!result) return null;

  const isBuild = result.verdict === "BUILD";

  return (
    <div className="w-full mt-12 mb-20 flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Verdict Header */}
      <div className={`p-8 rounded-3xl border text-center ${isBuild ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
        <h3 className="text-white/60 text-sm font-bold tracking-widest uppercase mb-2">Final Verdict</h3>
        <h1 className={`text-6xl md:text-8xl font-black mb-4 ${isBuild ? 'text-green-400 drop-shadow-[0_0_20px_rgba(74,222,128,0.5)]' : 'text-red-500 drop-shadow-[0_0_20px_rgba(239,68,68,0.5)]'}`}>
          {result.verdict}
        </h1>
        <p className="text-2xl font-semibold opacity-90">Score: {result.score}/100</p>
      </div>

      {/* Plan Section */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <h3 className="text-xl font-bold mb-4 text-cyan-400">Execution Plan</h3>
          <ul className="flex flex-col gap-3">
            {result.plan.map((item, i) => (
              <li key={i} className="flex gap-3 text-white/80">
                <span className="text-purple-400 font-bold">•</span> {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Content generated snippet */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <h3 className="text-xl font-bold mb-4 text-purple-400">Analysis Summary</h3>
          <p className="text-white/80 leading-relaxed text-sm md:text-base">
            {result.content}
          </p>
        </div>
      </div>
    </div>
  );
}