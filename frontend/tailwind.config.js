/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  purge: [
    './dist/*.html',
    './dist/*.js',
    './src/**/*.{jsx,js,ts,tsx}'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
