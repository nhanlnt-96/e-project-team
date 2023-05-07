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
        'pewter-blue': '#87A9BC',
        'light-silver': '#d9d9d9',
        'antd-status-error': '#ff4d4f',
        'antd-status-warning': '#faad14',
        'taupe-gray': '#8f8987',
        green: '#52c41a',
        secondary: '#f3d174'
      },
      padding: {
        'ratio-768-1024': 'calc(1024 / 768 * 100%)',
        'ratio-1920-898': 'calc(898 / 1920 * 100%)'
      }
    }
  },
  plugins: []
};
