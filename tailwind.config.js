/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    screens: {
      xs: "480px",
      // => @media (min-width: 480px) { ... }
      sm: "640px",
      // => @media (min-width: 480px) { ... }
      md: "768px",
      // => @media (min-width: 480px) { ... }
      lg: "1024px",
      // => @media (min-width: 480px) { ... }
      xl: "1280px",
      // => @media (min-width: 480px) { ... }
    },
  },
  plugins: [],
};
