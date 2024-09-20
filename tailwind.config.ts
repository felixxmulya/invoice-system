/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,scss,ts}"
  ],
  theme: {
    extend: {
      screens: {
        'xs': '480px', // Custom breakpoint for extra small screens
        'sm': '640px', // Small screens
        'md': '960px', // Medium screens
        'lg': '1024px', // Large screens
        'xl': '1280px', // Extra large screens
        '2xl': '1536px', // 2x extra large screens
      },
    },
  },
  plugins: [],
}

