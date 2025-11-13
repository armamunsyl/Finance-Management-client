/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {},
  },

  plugins: [require("daisyui")],

  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#3BB273",
        },
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          primary: "#3BB273",
          "base-100": "#181A2A",
          "base-200": "#1F2034",
          "base-300": "#222436",
          "base-content": "#E8EAF6",
        },
      },
    ],
  },
};
