/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'cus-lg': '1100px',
      },
      colors: {
      'b1' : {
        100: '#796666',
        200: '#D4C7C1'
      },
      'rust' : {
        100: '#A24141',
        200: '#5A2B2B'
      }
      },
      backgroundImage: {
        'custom-radial': 'radial-gradient(ellipse at top left, rgba(90, 43, 43, 0.8) 0%, rgba(162, 65, 65, 0.5) 40%, rgba(121, 102, 102, 0.3) 80%, rgba(212, 199, 193, 0.4) 100%)'
      },
    },
  },
  plugins: [],
}

