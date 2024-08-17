/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.js", './public/index.html'],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
      },
      colors: {
        orange: '#FF5A3C', // Custom orange color
        darkblue: '#0B2C3D', // Custom dark blue color
        lightgrey: '#EDEDED',
        medgrey: '#B1B1B1',
        darkgrey: '#A7A7A7'
      },
    },
  },
  plugins: [],
}
