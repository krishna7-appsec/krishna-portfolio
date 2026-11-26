import type { Config } from 'tailwindcss'

// Single source of truth for design tokens (mirrored as CSS variables in globals.css).
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#080B10',
        surface: '#10151D',
        accent: '#00F5A0',
        azure: '#00B8FF',
        fg: '#F5F7FA',
        muted: '#929CAA',
        line: 'rgba(255,255,255,0.08)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
} satisfies Config
