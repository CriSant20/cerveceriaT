/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Colores personalizados
        navy: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#bcccdc',
          700: '#1e3a8a',
          800: '#15316b',
        },
        mustard: {
          300: '#f0d05b',
          400: '#e6c34d',
          500: '#d4a017',
          600: '#b78a14',
          700: '#9a7511',
        }
      },
    },
  },
  plugins: [],
}