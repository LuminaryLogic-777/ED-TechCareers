/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        base: ["Catamaran"],
        heading: ["Catamaran"],
      },
      fontSize: {
        "1.5xl": "22px",
      },
      colors: {
        primary: "#2DB2C4",
        primaryDark: "#1B92A3",
        textBox: "#28313D",
        theme: "#0B0C10",
        card: "#202833",
        cardRed: "#F84A4A",
        slate: {
          300: "#C5D9DC",
          400: "#A4C3C8",
        },
        till: {
          100: "#dffbff",
          200: "#98dee9",
          300: "#8bd6e1",
          400: "#72cad7",
          500: "#5fb9c6",
          600: "#35C69D",
          700: "#58cadb",
          800: "#46c1d3",
          900: "#3AB2C4",
          950: "#309eae",
        },
        fontFamily: {
          catamaran: ["Catamaran"],
          outfit: ["Outfit"],
        },
        fontWeight: {
          100: "100",
          200: "200",
          300: "300",
          400: "400",
          500: "500",
          600: "600",
          700: "700",
          800: "800",
          900: "900",
        },
      },
      screens: {
        'tab-screen': '821px',
      },
    },
  },
  plugins: [],
};
