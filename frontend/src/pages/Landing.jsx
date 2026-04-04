// import { ArrowRight, Code, Layout, Palette, LayoutDashboard, Rocket, FileText, Image as ImageIcon } from "lucide-react";
// import ShaderBackground from "../components/ui/shader-background";
// import Workflow from "../components/Workflow";
// import { Link } from "react-router-dom";

// export default function Landing() {
//   return (
//     <div className="relative min-h-screen">
//       <ShaderBackground />

//       {/* Hero Section */}
//       <main className="relative pt-32 pb-20 px-6 flex flex-col items-center justify-center text-center min-h-screen z-10">
//         <div className="max-w-4xl pt-10">
//           <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-tight drop-shadow-2xl">
//             Build or Kill <br />
//             <span className="bg-gradient-to-r from-purple-500 via-cyan-400 to-purple-500 bg-clip-text text-transparent animate-gradient">
//               AI Validator
//             </span>
//           </h1>
          
//           <p className="text-lg md:text-2xl text-white/70 mb-10 max-w-2xl mx-auto font-medium">
//             Stop building the wrong ideas. Validate your idea in minutes and turn it into an execution-ready plan.
//           </p>

//           <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
//             <Link 
//               to="/auth"
//               className="group relative px-8 py-4 rounded-full bg-white text-black font-bold text-lg hover:bg-transparent overflow-hidden transition-all border-2 border-white hover:text-white w-full sm:w-auto flex items-center justify-center gap-2"
//             >
//               <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-400 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300 ease-out" />
//               <span className="relative">Start Building</span>
//               <ArrowRight className="relative group-hover:translate-x-1 transition-transform" />
//             </Link>

//             <button 
//               onClick={() => document.getElementById("workflow")?.scrollIntoView({ behavior: "smooth" })}
//               className="px-8 py-4 rounded-full border border-white/20 hover:bg-white/10 text-white font-bold text-lg transition-colors w-full sm:w-auto"
//             >
//               See How It Works
//             </button>
//           </div>
//         </div>
//       </main>

//       {/* Background Gradient Overlay to blend Shader into solid back */}
//       <div className="relative z-10 bg-gradient-to-b from-transparent to-black pt-32 pb-24">
//         <Workflow />
//       </div>

//       {/* Features Grid */}
//       <section id="features" className="relative z-10 bg-black py-24 px-6 border-t border-white/10">
//         <div className="max-w-6xl mx-auto">
//           <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
//             Everything you need for <span className="text-purple-400">rapid iteration</span>
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//             <FeatureCard title="Generate Code" icon={<Code />} colSpan="lg:col-span-1" />
//             <FeatureCard title="Launch App" icon={<Rocket />} colSpan="lg:col-span-1" />
//             <FeatureCard title="UI Components" icon={<Layout />} colSpan="lg:col-span-2" />
            
//             <FeatureCard title="Theme Ideas" icon={<Palette />} colSpan="lg:col-span-1" />
//             <FeatureCard title="User Dashboard" icon={<LayoutDashboard />} colSpan="lg:col-span-1" />
//             <FeatureCard title="Upload Docs" icon={<FileText />} colSpan="lg:col-span-1" />
//             <FeatureCard title="Image Assets" icon={<ImageIcon />} colSpan="lg:col-span-1" />
//           </div>
//         </div>
//       </section>

//       <footer className="relative z-10 py-8 border-t border-white/10 text-center text-white/40 text-sm bg-black">
//         © 2026 Build or Kill AI. Validation at warp speed.
//       </footer>
//     </div>
//   );
// }

// function FeatureCard({ title, icon, colSpan }) {
//   return (
//     <div className={`p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex flex-col items-center justify-center text-center gap-4 ${colSpan} min-h-[160px]`}>
//       <div className="text-cyan-400">
//         {icon}
//       </div>
//       <span className="font-semibold text-lg">{title}</span>
//     </div>
//   );
// }
import { useNavigate } from 'react-router-dom';
import Workflow from '../components/workflow';
import ShaderBackground from '../components/ShaderBackground';

export default function Landing() {
  const navigate = useNavigate();
  return (
    <div className="relative min-h-screen overflow-hidden">
      <ShaderBackground />
      <div className="relative z-10 flex flex-col items-center justify-center pt-32 px-4 text-center">
        <h1 className="text-6xl md:text-8xl font-black mb-4 bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">
          Build or Kill AI
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 mb-8 font-light">Stop building the wrong ideas.</p>
        <div className="flex gap-4">
          <button onClick={() => navigate('/auth')} className="bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-full font-bold transition">
            Start Building
          </button>
          <button className="border border-gray-700 hover:bg-white/5 px-8 py-3 rounded-full font-bold transition">
            See How It Works
          </button>
        </div>
        <Workflow />
      </div>
    </div>
  );
}