/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/assets/css/**/*.css",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        playwrite: ["Playwrite IN", "serif"],
      },
      colors: {
        primary: "#000",
        secondary: "#fff",
      },
      screens: {
        sm: "640px",
        md: "758px",
      },
    },
  },
  plugins: [],
};
