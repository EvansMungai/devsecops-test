/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {

          "primary": "#BFCDE0",

          "secondary": "#5D5D81",

          "accent": "#00def7",

          "neutral": "#080F0f",

          "base-100": "#BFCDE0",

          "info": "#00aefb",

          "success": "#009c56",

          "warning": "#ff9000",

          "error": "#ff6c75",
        },
      },
    ],
  },
  plugins: [
    require('daisyui'),
  ],
}

