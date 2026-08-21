/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        acm: {
          blue: '#0055A2', // Primary ACM blue
          light: '#E5F1FA', // Lighter blue for backgrounds
          dark: '#003366', // Dark blue text
          accent: '#00A4E4', // Vibrant blue for accents/borders
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
