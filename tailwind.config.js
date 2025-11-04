/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ivory-mist': '#F6F2EB',
        'soft-beige': '#E9CBA7',
        'amber-clay': '#8661A5',
        'slate-taupe': '#D8918B',
        'frosted-silver': '#D4D9D7',
        'steel-blue': '#74797C',
        'mist-blue': '#C7D7E2',
        'text-primary': '#1E1E1E',
        'text-secondary': '#4B4B4B',
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

