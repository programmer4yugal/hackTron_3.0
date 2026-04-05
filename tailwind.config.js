/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cyberpunk palette - Dark mode mandatory
        background: "#0a0a0f",
        foreground: "#e0e0e0",
        card: "#12121a",
        muted: "#1c1c2e",
        "muted-foreground": "#6b7280",
        "accent": "#00ff88", // Electric green
        "accent-secondary": "#ff00ff", // Hot magenta
        "accent-tertiary": "#00d4ff", // Cyan/electric blue
        "border": "#2a2a3a",
        "input": "#12121a",
        "ring": "#00ff88",
        "destructive": "#ff3366", // Error red-pink
      },
      fontSize: {
        // Cyberpunk typography scale
        "h1": ["3.5rem", { lineHeight: "1", letterSpacing: "0.05em", fontWeight: "900", textTransform: "uppercase" }],
        "h2": ["2.25rem", { lineHeight: "1.1", letterSpacing: "0.05em", fontWeight: "700", textTransform: "uppercase" }],
        "h3": ["1.5rem", { lineHeight: "1.2", letterSpacing: "0.05em", fontWeight: "600", textTransform: "uppercase" }],
        "body": ["1rem", { lineHeight: "1.5", letterSpacing: "0.03em", fontWeight: "400" }],
        "label": ["0.875rem", { lineHeight: "1.25", letterSpacing: "0.2em", fontWeight: "500", textTransform: "uppercase" }],
        "code": ["0.875rem", { lineHeight: "1.5", letterSpacing: "0.1em", fontWeight: "500", textTransform: "uppercase" }],
      },
      fontFamily: {
        heading: ["'Orbitron'", "'Share Tech Mono'", "monospace"],
        body: ["'JetBrains Mono'", "'Fira Code'", "'Consolas'", "monospace"],
        mono: ["'Share Tech Mono'", "'JetBrains Mono'", "monospace"],
      },
      borderRadius: {
        none: "0px",
        sm: "2px",
        base: "4px",
      },
      boxShadow: {
        // Neon glows
        "neon": "0 0 5px #00ff88, 0 0 10px #00ff8840",
        "neon-sm": "0 0 3px #00ff88, 0 0 6px #00ff8830",
        "neon-lg": "0 0 10px #00ff88, 0 0 20px #00ff8860, 0 0 40px #00ff8830",
        "neon-secondary": "0 0 5px #ff00ff, 0 0 20px #ff00ff60",
        "neon-tertiary": "0 0 5px #00d4ff, 0 0 20px #00d4ff60",
      },
      dropShadow: {
        // Text shadows for neon effect
        "neon": "0 0 10px rgba(0, 255, 136, 0.5)",
        "neon-md": "0 0 20px rgba(0, 255, 136, 0.3)",
        "secondary": "0 0 20px rgba(255, 0, 255, 0.4)",
      },
      animation: {
        blink: "blink 1s step-end infinite",
        glitch: "glitch 0.4s infinite",
        "scanline": "scanline 8s linear infinite",
        "rgb-shift": "rgbShift 2s infinite",
      },
      keyframes: {
        blink: {
          "0%, 50%, 100%": { opacity: "1" },
          "25%, 75%": { opacity: "0" },
        },
        glitch: {
          "0%, 100%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(2px, -2px)" },
          "60%": { transform: "translate(-1px, -1px)" },
          "80%": { transform: "translate(1px, 1px)" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        rgbShift: {
          "0%, 100%": { textShadow: "-2px 0 #ff00ff, 2px 0 #00d4ff" },
          "50%": { textShadow: "2px 0 #ff00ff, -2px 0 #00d4ff" },
        },
      },
      skew: {
        "1": "1deg",
        "2": "2deg",
      },
    },
  },
  plugins: [
    function ({ addBase, addComponents, theme }) {
      // Global base styles
      addBase({
        ":root": {
          "--color-background": "#0a0a0f",
          "--color-foreground": "#e0e0e0",
          "--color-card": "#12121a",
          "--color-muted": "#1c1c2e",
          "--color-muted-foreground": "#6b7280",
          "--color-accent": "#00ff88",
          "--color-accent-secondary": "#ff00ff",
          "--color-accent-tertiary": "#00d4ff",
          "--color-border": "#2a2a3a",
          "--box-shadow-neon": "0 0 5px #00ff88, 0 0 10px #00ff8840",
          "--box-shadow-neon-sm": "0 0 3px #00ff88, 0 0 6px #00ff8830",
          "--box-shadow-neon-lg": "0 0 10px #00ff88, 0 0 20px #00ff8860, 0 0 40px #00ff8830",
          "--box-shadow-neon-secondary": "0 0 5px #ff00ff, 0 0 20px #ff00ff60",
          "--box-shadow-neon-tertiary": "0 0 5px #00d4ff, 0 0 20px #00d4ff60",
        },
        "html, body": {
          backgroundColor: "var(--color-background)",
          color: "var(--color-foreground)",
          fontFamily: "var(--font-body)",
        },
        "*, *::before, *::after": {
          "@apply border-border": {},
        },
      });

      // Custom components with chamfered corners
      addComponents({
        ".cyber-chamfer": {
          clipPath: "polygon(0 10px, 10px 0, calc(100% - 10px) 0, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px))",
        },
        ".cyber-chamfer-sm": {
          clipPath: "polygon(0 4px, 4px 0, calc(100% - 4px) 0, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 0 calc(100% - 4px))",
        },
        ".cyber-glitch": {
          "&::before": {
            content: "attr(data-text)",
            position: "absolute",
            left: "2px",
            textShadow: "-2px 0 #ff00ff",
            animation: "glitch 0.3s infinite",
          },
          "&::after": {
            content: "attr(data-text)",
            position: "absolute",
            left: "-2px",
            textShadow: "2px 0 #00d4ff",
            animation: "glitch 0.3s infinite reverse",
          },
        },
        ".scanlines": {
          "&::after": {
            content: "''",
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.15) 2px, rgba(0, 0, 0, 0.15) 4px)",
            pointerEvents: "none",
          },
        },
        ".circuit-bg": {
          backgroundImage: "linear-gradient(rgba(0, 255, 136, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 136, 0.03) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        },
      });
    },
  ],
};
