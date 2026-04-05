import React from 'react';

export function Footer() {
  return (
    <footer className="w-full py-10 px-8 bg-background border-t border-border/40 cyber-chamfer flex flex-col md:flex-row items-center justify-between gap-6 text-mutedForeground text-sm relative z-30">
      <div className="flex items-center gap-3">
        <span className="font-accent uppercase tracking-widest text-accentTertiary">Build or Kill AI</span>
        <span className="hidden md:inline">© {new Date().getFullYear()}</span>
      </div>
      <div className="flex items-center gap-4">
        <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition drop-shadow-[0_0_4px_var(--box-shadow-neon)]">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M22 4.01c-.77.35-1.6.59-2.47.7a4.15 4.15 0 0 0 1.82-2.3c-.8.48-1.7.83-2.65 1.02A4.13 4.13 0 0 0 16.5 3c-2.27 0-4.1 1.84-4.1 4.1 0 .32.04.64.1.94C8.1 7.87 5.1 6.38 3.1 4.1c-.35.6-.55 1.3-.55 2.05 0 1.42.72 2.68 1.82 3.42-.67-.02-1.3-.2-1.85-.5v.05c0 1.98 1.41 3.63 3.28 4-.34.09-.7.14-1.07.14-.26 0-.5-.02-.74-.07.5 1.56 1.97 2.7 3.7 2.73A8.3 8.3 0 0 1 2 19.54c-.27 0-.54-.02-.8-.05A11.7 11.7 0 0 0 8.29 21.5c7.55 0 11.68-6.26 11.68-11.68 0-.18 0-.36-.01-.54A8.3 8.3 0 0 0 22 4.01Z"/></svg>
        </a>
        <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition drop-shadow-[0_0_4px_var(--box-shadow-neon)]">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.66-.22.66-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.5 9.5 0 0 1 12 6.8c.85.004 1.7.11 2.5.32 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85v2.74c0 .27.16.58.67.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10Z"/></svg>
        </a>
        <a href="mailto:contact@cyberpunk.ai" className="hover:text-accent transition drop-shadow-[0_0_4px_var(--box-shadow-neon)]">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/></svg>
        </a>
      </div>
    </footer>
  );
}
