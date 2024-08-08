module.exports = {
  mode: "jit",
  darkMode: "class",
  important: true,
  theme: {
    extend: {
      colors: {
        "orange": "#FF832D",
        "dark-orange": "#FF7723",
        green:{
          100:'#EEF0E1',
          200:'#ABFFDE',
          300:'#00DEB9',
          400:'#3FBBB3',
          500:'#00425A',
          600:'#02323E',
        },
        blue:{
          100:'#F4F9FC',
          200: '#E0EDF6',
        },
        "brown": "#C1A58D",
        'black':'#1C1912',
        'white':'#ffffff'
      },
    },
  },
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  daisyui: {},
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
