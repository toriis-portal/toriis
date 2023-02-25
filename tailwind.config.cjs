/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      minHeight: {
        12: '3rem',
      },
      minWidth: {
        12: '3rem',
      },
      colors: {
        cobalt: '#0F81E8',
        lightBlue: '#E6F0FA',
        darkTeal: '#17292E',
        brightTeal: '#40D7D4',
        pumpkin: '#FF6112',
        clementine: '#FFA902',
        white: '#FFFFFF',
      },
      boxShadow: {
        circleCobalt: '-6px 6px #0F81E8',
      },
    },
    fontFamily: {
      klima: ['Klima', 'Arial', 'Roboto'],
    },
  },
  plugins: [],
}
