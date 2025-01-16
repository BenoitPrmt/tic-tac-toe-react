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
                hover: "#2ebebc",
            },
            secondary: {
                DEFAULT: "#F6BC47",
                hover: "#e1a52d",
                shadow: "#CE8E14"
            },
            grey: {
                light: {
                    DEFAULT: "#B6CAD3",
                    hover: "#9fb1b9",
                    shadow: "#7D9AA7"
                },
                medium: {
                    DEFAULT: "#284551",
                    shadow: "#132C36",
                },
                dark: {
                    DEFAULT: "#203741"
                }
            },
            error: {
                light: "#ff7e7e",
                DEFAULT: "#ff5655",
                shadow: "#cc3b3a"
            }
        },
        fontFamily: {
            'fredoka': ['Fredoka']
        },
        extend: {
            boxShadow: {
                buttonSecondary: '0px 4px 0px 0px #CE8E14',
                buttonGreyLight: '0px 4px 0px 0px #7D9AA7',
                buttonGrey: '0px 4px 0px 0px #132C36',
                inputError: '0px 4px 0px 0px #cc3b3a',
                cellGreyShadow: '0px 7px 0px 0px #132C36'
            }
        },
    },
    plugins: [],
}
