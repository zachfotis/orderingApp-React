/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        yellow: '#ffd44d',
        yellowHover: '#ffc81a',
        greyLight: 'rgb(155, 155, 155)',
        greyDark: '#333',
        blue: '#3a63ac',
        green: 'rgb(0, 188, 139)',
      },
    },
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
