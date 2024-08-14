/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // websiteGreen: "#08683b",
        // websiteYellow: "#FFD700",
        // websiteRed: "#FF0000",
        // websiteBlack: "#000000",
        // websiteGrey: "#808080",
        customGray: "#2e313b",
        customBlack: "#1B1E26",
        customGreen: "#31E48F",
        customHoverGreen: "#31B476",
        customTextColor: "#rgb(255 255 255 / 71%)",
        customWhite: "#FFFFFF",
        sideBarTextColor: "#6A7581",
        hoverAdd: "#2F3A45",
        dropdownTextColor: "#6A7581",
        dropdownBackground: "#000000",
        customTableGreen: "#0a854b",
        customTablebG: "#2f3a45",
        customBorderColor: "#425161ed",
      },
      backgroundImage: {
        "bubble-pattern": "url('/src/assets/bubble.png')",
      },

      dropdownHeight: {
        "60px": "60px",
      },
      borderRadius: {
        "3px": "3px",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
