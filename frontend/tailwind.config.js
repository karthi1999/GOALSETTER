/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.html",   // Include all HTML files in the src directory and its subdirectories
    "./src/**/*.jsx",    // Include all JSX files in the src directory and its subdirectories
    // Add more paths or patterns as needed
  ],
  theme: {
    extend: {
      height: {
        'fs': 'calc(100vh - 100px)'
      }
    },
  },
  plugins: [],
}