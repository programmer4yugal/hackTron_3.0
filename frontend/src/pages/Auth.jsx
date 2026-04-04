import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      navigate("/app");
    }
  };

  const handleGoogle = () => {
    navigate("/app");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-black relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="p-8 md:p-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold tracking-tight mb-2">Welcome Back</h2>
            <p className="text-white/60">Enter your email to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-white/30 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
            />

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-cyan-400 text-black font-bold rounded-xl py-4 hover:opacity-90 transition-opacity"
            >
              Continue
            </button>
          </form>

          <div className="mt-8 mb-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-white/40 text-sm">OR</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <button
            onClick={handleGoogle}
            className="w-full bg-white text-black font-semibold rounded-xl py-4 hover:bg-gray-100 transition-colors"
          >
            Sign up with Google
          </button>
        </div>
        <p className="text-center text-white/40 text-sm mt-8">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}