/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        colors: {
            primary: "#36CDCA",
            secondary: "#F6BC47",
            shadowSecondary: "#CE8E14",
            grey: {
                light: "#B6CAD3",
                lightShadow: "#7D9AA7",
                medium: "#284551",
                mediumShadow: "#132C36",
                dark: "#203741"
            }
        },
        extend: {},
    },
    plugins: [],
}
