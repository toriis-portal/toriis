/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cobalt: '#0F81E8',
        lightBlue: '#E6F0FA',
        mediumBlue: '#4F81E8',
        darkTeal: '#17292E',
        brightTeal: '#40D7D4',
        pumpkin: '#FF6112',
        clementine: '#FFA902',
        lightClementine: '#FFEECC',
        lightGray: '#D9D9D9',
        darkGray: '#7C7C7C',
        lightShadow: '#23414634',
        medGray: '#626161',
        footnoteGray: '#9C9FA1',
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
      width: {
        '95%': '95vh',
        '98%': '98vh',
      },
    },
    fontFamily: {
      klima: ['Klima', 'Arial', 'Roboto'],
      inter: ['Inter', 'sans-serif'],
      graph: ['Graph FF Condensed Black'],
    },
  },
  plugins: [require('flowbite/plugin')],
}
