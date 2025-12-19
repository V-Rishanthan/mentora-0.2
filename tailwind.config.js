/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  // content: ["./App.tsx", "./components/**/*.{js,jsx,ts,tsx}"],
    content: [
    "./app/**/*.{js,tsx,ts,jsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}", // Add other folders as needed
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
       
        primary: "#8681FB",
        black:"#000000",
        gray:"#6B6D6E",
        secondary: "#F5F8FF",
        WHITE:"#ffffff",
        accent: "#FF006E",
        light:"#c7c7c8"
        // "custom-gray": {
        //   100: "#F8F9FA",
        //   200: "#E9ECEF",
        //   500: "#6C757D",
        // },
      },
    },
  },
  plugins: [],
}