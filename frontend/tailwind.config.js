/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      color: {
        "line-input": "#E6E6E6",
      },
      boxShadow: {
        "swipe-shadow": "-129px -5px 56px 144px rgba(0,0,0,0.64)",
      },
      screens: {
        xs: "480px",
        "ph-L": "425px",
      },
    },
  },
  plugins: [],
};
