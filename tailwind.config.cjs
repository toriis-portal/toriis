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
        darkTeal: '#17292E',
        brightTeal: '#40D7D4',
        pumpkin: '#FF6112',
        clementine: '#FFA902',
        lightGray: '#D9D9D9',
        lightShadow: '#23414634',
        medGray: '#626161',
        white: '#FFFFFF',
      },
      flexBasis: {
        '3/7': '42.8571429%',
        '4/7': '57.1428571%',
      },
    },
    fontFamily: {
      klima: ['Klima', 'Arial', 'Roboto'],
    },
  },
  plugins: [require('flowbite/plugin')],
}
