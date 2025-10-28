/** @type {import('tailwindcss').Config} */
export default {
  // 🚨 IMPORTANT: Enable dark mode based on the 'dark' class
  darkMode: 'class', 
  content: [
    // Tell Tailwind to scan all React and JavaScript files in src/
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
