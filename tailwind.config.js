/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        
        deepBlue: '#0B1E3C',       // Darker blue for the background
        purple: '#2E1065',          // Dark purple shade
        darkBlue: '#162447',        // Very dark blue, close to black
        gradientBlue: '#1C64F2',    // Vivid blue for gradients and accents
        lightBlue: '#0044AF',       // Bright, soft blue for highlights
        gold: '#FFB700',            // Warm, golden-yellow for accents
        lightPurple: '#7F39FB',     // Bright light purple
        darkPurple: '#230E53',      // Very dark purple, almost black
      }
    },
  },
  plugins: [],
});