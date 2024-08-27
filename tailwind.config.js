/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
      'b1' : {
        100: '#796666',
        200: '#D4C7C1'
      },
      'rust' : {
        100: '#A24141',
        200: '#5A2B2B'
      }
      }
    },
  },
  plugins: [],
}

