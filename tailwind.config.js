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
        light:"#c7c7c8",
      grayPro: {
          100: "#E6E7E7", // Cloud Mist
          200: "#D0D1D1", // Soft Ash
          300: "#AFB1B1", // Silver Fog
          400: "#878989", // Urban Grey
          500: "#6B6D6E", // Steel Grey
          600: "#5C5E5E", // Graphite Stone
          700: "#4E5050", // Charcoal Slate
          800: "#444546", // Deep Carbon
        },
      },
      fontFamily: {
        'outfit-thin': ['Outfit-Thin', 'system-ui'],
        'outfit-extralight': ['Outfit-ExtraLight', 'system-ui'],
        'outfit-light': ['Outfit-Light', 'system-ui'],
        'outfit-regular': ['Outfit-Regular', 'system-ui'],
        'outfit-medium': ['Outfit-Medium', 'system-ui'],
        'outfit-semibold': ['Outfit-SemiBold', 'system-ui'],
        'outfit-bold': ['Outfit-Bold', 'system-ui'],
        'outfit-extrabold': ['Outfit-ExtraBold', 'system-ui'],
        'outfit-black': ['Outfit-Black', 'system-ui'],
        
        // i have  set a default Outfit font
        'outfit': ['Outfit-Regular', 'system-ui'],
      },
    },
  },
  plugins: [],
}