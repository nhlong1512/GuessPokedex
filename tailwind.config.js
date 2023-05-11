/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      'main': '#dc0a2d'
    }
  },
  plugins: [],
  corePlugins: {
    preflight: false // <== disable this!
  },
}