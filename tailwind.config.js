/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cream': '#F5F1EB',
        'dark': '#1a1a1a',
        'charcoal': '#2d2d2d',
        'warm-gray': '#8a8580',
        'light-cream': '#FAF8F5',
        'gold': '#C9A96E',
        'off-white': '#EDEBE8',
      },
      fontFamily: {
        'display': ['"Playfair Display"', 'Georgia', 'serif'],
        'body': ['"Cormorant Garamond"', 'Georgia', 'serif'],
        'nav': ['"Montserrat"', 'Helvetica', 'Arial', 'sans-serif'],
      },
      letterSpacing: {
        'ultra': '0.3em',
        'mega': '0.4em',
      }
    },
  },
  plugins: [],
}
