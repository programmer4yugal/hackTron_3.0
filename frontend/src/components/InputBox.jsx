import { Send } from "lucide-react";

export default function InputBox({ value, onChange, onSubmit, isLoading }) {
  return (
    <div className="w-full relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
      <div className="relative flex bg-black border border-white/20 rounded-2xl p-2 items-end min-h-[120px]">
        <textarea
          className="w-full bg-transparent text-white p-4 resize-none outline-none text-lg min-h-[100px] placeholder:text-white/30"
          placeholder="Enter your idea... (e.g. A marketplace for trading custom CSS snippets)"
          value={value}
          onChange={onChange}
          disabled={isLoading}
        />
        <button
          onClick={onSubmit}
          disabled={!value.trim() || isLoading}
          className="absolute bottom-4 right-4 p-3 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-400 text-black hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center"
        >
          <Send size={20} className={isLoading ? "animate-pulse" : ""} />
        </button>
      </div>
    </div>
  );
}