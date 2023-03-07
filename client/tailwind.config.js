/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      '3xl': '1920px'
    },
    fontFamily: {
      'playfair-display': '\'Playfair Display\', serif'
    },
    extend: {
      colors: {
        'link-hover': '#69b1ff',
        'pewter-blue': '#87A9BC'
      }
    }
  },
  plugins: []
};
