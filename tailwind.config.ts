import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50:  "#f0f7f1",
          100: "#d9eddb",
          200: "#b3dab7",
          300: "#7ec085",
          400: "#4da358",
          500: "#2d8636",
          600: "#1d6926",
          700: "#1a5c22",
          800: "#154a1c",
          900: "#0f3614",
        },
        gold: {
          50:  "#fdf9ec",
          100: "#faf0cc",
          200: "#f4df9a",
          300: "#ecc95f",
          400: "#e4b332",
          500: "#c9971a",
          600: "#a87813",
          700: "#875c11",
          800: "#6d4912",
          900: "#5a3c13",
        },
        cream: "#f5f0e8",
        parchment: "#ede5d0",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body:    ["var(--font-body)", "sans-serif"],
        arabic:  ["var(--font-arabic)", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
