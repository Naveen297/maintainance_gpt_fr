// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       fontFamily: {
//         georama: ["Georama", "sans-serif"],
//         georamalight: ["GEORAMALight","sans-serif"],
//         raleway: ["Raleway", "sans-serif"],
//         ralewaybold: ["RALEWAYBold", "sans-serif"],
//         kanitBold: ["KANITBold", "sans-serif"],
//         kanitRegular: ["KANITRegular", "sans-serif"],
//         kanitBlack: ["KANITBlack", "sans-serif"],
//         kanitMedium: ["KANITMedium", "sans-serif"],
//         kanitLight:["KANITLight", "sans-serif"]
//       },
//       colors: {
//         'terracotta': '#B85042',
//         'sand': '#E7E8D1',
//         'sage': '#A7BEAE',
//         'PrimaryDarkPurple': '#5D5FEF',
//         'PrimaryDarkComplimentary':'#A2A4F6',
//         'PrimaryLightPurple': '#E4E5FF',
//         'PrimaryBackground': '#F8F8FF',
//       },
//     },
//   },
//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // This enables class-based dark mode
  theme: {
    extend: {
            fontFamily: {
        georama: ["Georama", "sans-serif"],
        georamalight: ["GEORAMALight","sans-serif"],
        raleway: ["Raleway", "sans-serif"],
        ralewaybold: ["RALEWAYBold", "sans-serif"],
        kanitBold: ["KANITBold", "sans-serif"],
        kanitRegular: ["KANITRegular", "sans-serif"],
        kanitBlack: ["KANITBlack", "sans-serif"],
        kanitMedium: ["KANITMedium", "sans-serif"],
        kanitLight:["KANITLight", "sans-serif"]
      },
      colors: {
        'dark-bg': '#1a1b26',
        'dark-card': '#242535',
        'dark-text': '#a9b1d6',
        'dark-primary': '#7aa2f7',
        'dark-red': '#f7768e',
        'light-bg': '#f4f4f5',
        'light-card': '#ffffff',
        'light-text': '#334155',
        'light-primary': '#2563eb',
        'light-red': '#dc2626',
      },
      
    },
  },
  plugins: [],
}