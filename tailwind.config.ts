import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0f9f4",
          100: "#dcf1e3",
          200: "#bbe3c9",
          300: "#8ccea7",
          400: "#56b07f",
          500: "#2f9560",
          600: "#1f774b",
          700: "#1a5f3d",
          800: "#174c33",
          900: "#143f2c",
        },
        gold: {
          400: "#f4c430",
          500: "#d4a017",
          600: "#b8860b",
        },
      },
      fontFamily: {
        display: ["Georgia", "serif"],
        sans: ["system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
