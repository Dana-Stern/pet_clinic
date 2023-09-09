/** @type {import('tailwindcss').Config} */
export const content = [
  "./pages/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}",
];
export const theme = {
  fontFamily: {
    mono: ["Roboto", "monospace"],
    sans: ["Roboto", "sans-serif"],
    serif: ["Roboto", "sans-serif"],
    display: ["Roboto", "sans-serif"],
    body: ["Heebo"],
  },
  extend: {
    gridTemplateRows: {
      "auto-1fr": "auto 1fr",
    },
  },
};
export const plugins = [];
