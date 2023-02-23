/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      spacing: {
        22: '88px',
        76: '314px',
      },
    },
    colors: {
      colbalt: '#0F81E8',
      lightBlue: '#E6F0FA',
      darkTeal: '#17292E',
      brightTeal: '#40D7D4',
      orange: '#FF6112',
      clementine: '#FFA902',
      white: '#FFFFFF',
    },
  },
  plugins: [],
}
