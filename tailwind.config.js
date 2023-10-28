/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      // Add more paths here if you have more directories where you use Tailwind classes
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#243c5a',
      },
    },
  },
  variants: {},
  plugins: [],
}


