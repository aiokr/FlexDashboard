/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./packages/*/components/**/*.{js,vue,ts}",
    "./packages/*/layouts/**/*.vue",
    "./packages/*/pages/**/*.vue",
    "./packages/*/views/**/*.vue",
    "./packages/*/plugins/**/*.{js,ts}",
    "./packages/*/app.vue",
    "./packages/*/error.vue",
  ],
  darkMode: 'selector',
  theme: {
    extend: {},
  },
  plugins: [],
}

