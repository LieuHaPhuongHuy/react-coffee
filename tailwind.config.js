const { colors } = require('@mui/material')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      translate: {
        'n1/2': "-50%"
      }
    },
    colors: {
      ...colors,
      'yellow': {
        900: "#876445",
        600: "#CA965C",
      },
      'orange': {
        200: "#E3CAA5",
      },
    },
    fontFamily: {
      podkova: ['Podkova', 'serif'],
    },
  },
  plugins: [],
}
