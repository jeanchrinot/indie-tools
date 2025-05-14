// tailwind.config.js
import defaultTheme from "tailwindcss/defaultTheme"

export default {
  theme: {
    extend: {
      colors: {
        white: "#ffffff",
        black: "#000000",
        gray: defaultTheme.colors.gray, // fallback to standard gray
      },
    },
  },
}
