/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "not-found": "url('./assets/imgs/notfound.png')",
      },
      colors: {
        primary: "#3da04d",
        ktshover: "#24632e",
      },
    },
  },
  plugins: [],
};
