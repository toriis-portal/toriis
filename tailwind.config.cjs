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
        lightGray: '#D9D9D9',
        darkGray: '#7C7C7C',
        white: '#FFFFFF',
      },
      flexBasis: {
        '3/7': '42.8571429%',
        '4/7': '57.1428571%',
      },
      maxHeight: {
        '1/4': '25vh',
        '1/2': '50vh',
        '3/4': '75vh',
      },
    },
    fontFamily: {
      klima: ['Klima', 'Arial', 'Roboto'],
      inter: ['Inter', 'Arial', 'Roboto'],
    },
  },
  plugins: [],
}
