/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      "charcol-gray": "#36454F",
      purple: "#691eff",
      midnight: "#121063",
      metal: "#565584",
      tahiti: "#3ab7bf",
      silver: "#ecebff",
      "bubble-gum": "#ff77e9",
      bermuda: "#78dcca",
      "off-white": "#f7f8f8",
      "transparent-white": "rgba(255, 255, 255, 0.08)",
      background: "#000212",
      grey: "#858699",
      "grey-dark": "#222326",
      "primary-text": "#b4bcd0",
      indigo: "#663FD6",
      green: "#22c55e",
      red: "#be123c"
    },
    borderStyle: ["hover"],
    backgroundImage: {
      "primary-gradient":
        "linear-gradient(92.88deg, rgba(69, 94, 181) 9.16%, rgba(86, 67, 204) 43.89%, rgba(103, 63, 215) 64.72%)",
      "page-gradient":
        "radial-gradient(ellipse 80% 50% at 50% -20%,rgba(120,119,198,0.3), transparent)",
      "hero-gradient":
        "radial-gradient(ellipse 50% 80% at 20% 40%,rgba(93,52,221,0.1),transparent), radial-gradient(ellipse 50% 80% at 80% 50%,rgba(120,119,198,0.15),transparent)",
      "hero-glow":
        "conic-gradient(from 230.29deg at 51.63% 52.16%, rgba(36, 0, 255) 0deg, rgba(0, 135, 255) 67.5deg, rgba(108, 39, 157) 198.75deg, rgba(24, 38, 163) 251.25deg, rgba(54, 103, 196) 301.88deg, rgba(105, 30, 255) 360deg)",
      "glow-lines":
        "linear-gradient(var(--direction),#9d9bf2 0.43%,#7877c6 14.11%,rgbaa(120,119,198,0) 62.95%)"
    },
    boxShadow: {
      primary: "rgba(80 63 205 / 50%) 0px 1px 40px"
    },
    transitionDelay: {
      0: "0ms"
    },
    keyframes: {
      "fade-in": {
        from: { opacity: 0, transform: "translateY(-10px)" },
        to: { opacity: 1, transform: "none" }
      },
      "image-rotate": {
        "0%": { transform: "rotateX(25deg)" },
        "25%": { transform: "rotateX(25deg) scale(0.9)" },
        "60%": { transform: "none" },
        "100%": { transform: "none" }
      },
      "image-glow": {
        "0%": {
          opacity: 0,
          "animation-timing-function": "cubic-bezier(0.74,0.25,0.76,1)"
        },
        "10%": {
          opacity: 1,
          "animation-timing-function": "cubic-bezier(0.12,0.01,0.08,0.99)"
        },
        "100%": {
          opacity: 0.2
        }
      },
      "sketch-lines": {
        "0%": { "stroke-dashoffset": 1 },
        "50%": { "stroke-dashoffset": 0 },
        "99%": { "stroke-dashoffset": 0 },
        "100%": { visiblity: "hidden" }
      },
      "glow-line-horizontal": {
        "0%": { opacity: 0, transform: "translateX(0)" },
        "5%": { opacity: 1, transform: "translateX(0)" },
        "90%": { opacity: 1 },
        "100%": { opacity: 0, transform: "translateX(min(70vw, 45rem))" }
      },
      "glow-line-vertical": {
        "0%": { opacity: 0, transform: "translateY(0)" },
        "5%": { opacity: 1, transform: "translateY(0)" },
        "90%": { opacity: 1 },
        "100%": { opacity: 0, transform: "translateY(min(39vw, 45rem))" }
      }
    },
    animation: {
      "fade-in": "fade-in 1000ms var(--animation-delay, 0ms) ease forwards",
      "image-rotate": "image-rotate 1400ms ease forwards",
      "image-glow": "image-glow 4100ms 600ms ease-out forwards",
      "sketch-lines": "sketch-lines 1200ms ease-out forwards",
      "glow-line-horizontal":
        "glow-line-horizontal var(--animation-duration) ease-in forwards",
      "glow-line-vertical":
        "glow-line-vertical var(--animation-duration) ease-in forwards"
    },
    extend: {}
  },
  plugins: []
};
