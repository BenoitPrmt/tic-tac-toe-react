/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        colors: {
            primary: {
                DEFAULT: "#36CDCA",
            },
            secondary: {
                DEFAULT: "#F6BC47",
                shadow: "#CE8E14"
            },
            grey: {
                light: {
                    DEFAULT: "#B6CAD3",
                    shadow: "#7D9AA7"
                },
                medium: {
                    DEFAULT: "#284551",
                    shadow: "#132C36",
                },
                dark: {
                    DEFAULT: "#203741"
                }
            }
        },
        fontFamily: {
            'fredoka': ['Fredoka']
        },
        extend: {},
    },
    plugins: [],
}
