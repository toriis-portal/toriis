/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cobalt: '#0F81E8',
        lightBlue: '#E6F0FA',
        darkTeal: '#17292E',
        brightTeal: '#40D7D4',
        pumpkin: '#FF6112',
        clementine: '#FFA902',
        white: '#FFFFFF',
      },
      fontSize: {
        '2.5xl': '28px',
      },
    },
    fontFamily: {
      klima: ['Klima', 'Arial', 'Roboto'],
    },
  },
  plugins: [],
}
