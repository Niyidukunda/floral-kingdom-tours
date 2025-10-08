/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        // Custom font sizes optimized for 80% scale aesthetic
        'xs': ['0.7rem', { lineHeight: '1rem' }],      // ~8.96px
        'sm': ['0.8rem', { lineHeight: '1.25rem' }],   // ~10.24px
        'base': ['0.9rem', { lineHeight: '1.5rem' }],  // ~11.52px
        'lg': ['1rem', { lineHeight: '1.75rem' }],     // ~12.8px
        'xl': ['1.125rem', { lineHeight: '1.75rem' }], // ~14.4px
        '2xl': ['1.375rem', { lineHeight: '2rem' }],   // ~17.6px
        '3xl': ['1.75rem', { lineHeight: '2.25rem' }], // ~22.4px
        '4xl': ['2.125rem', { lineHeight: '2.5rem' }], // ~27.2px
        '5xl': ['2.75rem', { lineHeight: '1' }],       // ~35.2px
        '6xl': ['3.5rem', { lineHeight: '1' }],        // ~44.8px
      },
      spacing: {
        // Refined spacing that works well with smaller text
        '18': '4.5rem',   // ~57.6px at 80% scale
        '72': '18rem',    // ~230.4px at 80% scale
        '84': '21rem',    // ~268.8px at 80% scale
        '96': '24rem',    // ~307.2px at 80% scale
      }
    },
  },
  plugins: [],
}