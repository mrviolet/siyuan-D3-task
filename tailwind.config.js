/*
 * @Author: yl_li
 * @Date: 2024-08-23
 * @LastEditors: yl_li
 * @LastEditTime: 2024-09-06
 * @description: 
 */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'nav-i': 'auto 1fr auto',
      }
    },
  },
  plugins: [
  ],
}

