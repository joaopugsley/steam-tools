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
        gray: {
          25: 'rgb(250 250 251);',
          50: 'rgb(247 247 248);',
          100: 'rgb(238 238 240);',
          150: 'rgb(227 227 231);',
          200: 'rgb(217 217 222);',
          250: 'rgb(208 209 214);',
          300: 'rgb(183 184 194);',
          350: 'rgb(165 167 181);',
          400: 'rgb(147 148 161);',
          450: 'rgb(132 133 147);',
          500: 'rgb(116 118 134);',
          550: 'rgb(105 107 123);',
          600: 'rgb(94 95 110);',
          650: 'rgb(80 82 95);',
          700: 'rgb(66 67 77);',
          750: 'rgb(55 56 64);',
          800: 'rgb(47 48 55);',
          850: 'rgb(39 39 45);',
          900: 'rgb(33 33 38);',
          950: 'rgb(19 19 22);',
        }
      }
    },
  },
  plugins: [],
};
export default config;
