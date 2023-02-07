/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,vue,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'win97': '#c0c0c0',
        'win97-dark': '#0a0a0a',
        'win97-light': '#ffffff'
      }
    },
  },
  plugins: [],
}
