/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        cobalt: '-8px 8px 0px 0px rgba(15, 129, 232, 1)',
      },
      colors: {
        colbalt: '#0F81E8',
        lightBlue: '#E6F0FA',
        darkTeal: '#17292E',
        brightTeal: '#40D7D4',
        pumpkin: '#FF6112',
        clementine: '#FFA902',
        white: '#FFFFFF',
      },
    },
  },
  plugins: [],
}
