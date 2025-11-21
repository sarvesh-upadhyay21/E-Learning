import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    // root-level (app router / pages / components)
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // also keep src-based structure if you use it
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    // react-slick / runtime classes (вsafelist dynamic classes)
    { pattern: /^slick-/ },
    // add other dynamic patterns if needed
  ],
  theme: {
    extend: {
      boxShadow: {
        'input-shadow': '0 63px 59px rgba(26,33,188,.1)',
        'course-shadow': '0 40px 20px rgba(0,0,0,.15)',
        'testimonial-shadow1': '0 5.54348px 11.087px rgba(89,104,118,.05)',
        'testimonial-shadow2': '5.54348px 38.8043px 110.87px rgba(89,104,118,.15)',
      },
      colors: {
        primary: "#6556ff",
        secondary: "#1a21bc",
        grey: "#57595f",
        slateGray: "#f6faff",
        deepSlate: "#d5effa",
        success: "#43c639",
        midnight_text: "#222c44",
      },
      spacing: {
        '75%': '75%',
      },
      backgroundImage: {
        'newsletter-bg': `url('/images/newsletter/bgFile.png')`,
        'newsletter-bg-2': `url('/E-learning/images/newsletter/bgFile.png')`,
      },
    },
  },
  plugins: [],
};
export default config;
