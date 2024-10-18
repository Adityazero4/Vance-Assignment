/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'green-btn':'#81EBAB',
        'tab-active-btn':'#7C5BDA'
      },
        fontFamily: {
        sans: ['Stabil Grotesk', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}