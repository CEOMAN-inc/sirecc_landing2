/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border)", /* Minimal border */
        input: "var(--color-input)", /* Elevated surface */
        ring: "var(--color-ring)", /* Electric cyan */
        background: "var(--color-background)", /* Rich dark base */
        foreground: "var(--color-foreground)", /* Pure white */
        primary: {
          DEFAULT: "var(--color-primary)", /* Deep construction blue */
          foreground: "var(--color-primary-foreground)", /* Pure white */
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", /* Energetic orange */
          foreground: "var(--color-secondary-foreground)", /* Pure white */
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", /* Clear red */
          foreground: "var(--color-destructive-foreground)", /* Pure white */
        },
        muted: {
          DEFAULT: "var(--color-muted)", /* Elevated surface */
          foreground: "var(--color-muted-foreground)", /* Balanced gray */
        },
        accent: {
          DEFAULT: "var(--color-accent)", /* Electric cyan */
          foreground: "var(--color-accent-foreground)", /* Rich dark base */
        },
        popover: {
          DEFAULT: "var(--color-popover)", /* Elevated surface */
          foreground: "var(--color-popover-foreground)", /* Pure white */
        },
        card: {
          DEFAULT: "var(--color-card)", /* Elevated surface */
          foreground: "var(--color-card-foreground)", /* Pure white */
        },
        success: {
          DEFAULT: "var(--color-success)", /* Construction green */
          foreground: "var(--color-success-foreground)", /* Pure white */
        },
        warning: {
          DEFAULT: "var(--color-warning)", /* Attention amber */
          foreground: "var(--color-warning-foreground)", /* Pure white */
        },
        error: {
          DEFAULT: "var(--color-error)", /* Clear red */
          foreground: "var(--color-error-foreground)", /* Pure white */
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        'orbitron': ['Orbitron', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'roboto-mono': ['Roboto Mono', 'monospace'],
        'jetbrains-mono': ['JetBrains Mono', 'monospace'],
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "slide-in": "slide-in 0.3s ease-out",
        "scale-in": "scale-in 0.2s ease-out",
        "glow": "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-in": {
          from: { transform: "translateY(20px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        "scale-in": {
          from: { transform: "scale(0.95)", opacity: "0" },
          to: { transform: "scale(1)", opacity: "1" },
        },
        "glow": {
          from: { boxShadow: "0 0 20px rgba(0, 212, 255, 0.3)" },
          to: { boxShadow: "0 0 30px rgba(0, 212, 255, 0.6)" },
        },
      },
      transitionTimingFunction: {
        'construction': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      backdropBlur: {
        xs: '2px',
      },
      zIndex: {
        '100': '100',
        '200': '200',
        '300': '300',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}