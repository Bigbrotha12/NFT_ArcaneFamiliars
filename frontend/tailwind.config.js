/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  './src/**/*.{js,jsx,ts,tsx}',
  './dist/*.html',
  './dist/*.js'],
  theme: {
    backgroundImage: {
      mainBackdrop: 'url("./assets/images/main_backdrop.png")'
      
    },
    fontFamily: {
      sans: ['Arbutus Slab, Inter, Roboto']
    },
    extend: {
      colors: {
        light: {
          primary: "#4484CE",
          secondary: "#D9D9D9",
          minor: "#F9CF00",
          accent: "#F19F4D"
        },
        dark: {
          primary: "#242424",
          secondary: "#062F4F",
          minor: "#813772",
          accent: "#B82601"
        }
      }
    },
  },
  plugins: [],
}
