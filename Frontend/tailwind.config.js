/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        blue: {
          50: "#DFDFF0",
          75: "#dfdff2",
          100: "#F0F2FA",
          200: "#010101",
          300: "#4FB7DD",
        },

        violet: {
          300: "#5724ff",
        },

        yellow: {
          100: "#8e983f",
          300: "#edff66",
        },
      },

      keyframes: {
        novaEnter: {
          "0%": { transform: "translateY(200px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },

      animation: {
        novaEnter: "novaEnter 1.5s cubic-bezier(.22,1,.36,1) forwards",
      },

      fontFamily: {
        zentry: ["zentry", "sans-serif"],
        general: ["general", "sans-serif"],
        boldContent: ["boldContent", "sans-serif"],
        "circular-web": ["circular-web", "sans-serif"],
        "robert-medium": ["robert-medium", "sans-serif"],
        "robert-regular": ["robert-regular", "sans-serif"],
        Logo: ["Logo", "sans-serif"],
        head: ["head", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },


  safelist: [
    // Bot component dynamic classes — must be safelisted for Tailwind JIT
    "bg-white/8",
    "bg-white/[0.06]",
    "bg-white/[0.08]",
    "border-white/15",
    "border-white/[0.12]",
    "border-white/[0.09]",
    "border-white/[0.08]",
    "border-white/[0.10]",
    "backdrop-blur-xl",
    "backdrop-blur-sm",
    "border-[#A7A0F8]",
    "text-[#A7A0F8]",
    "from-[#534AB7]",
    "to-[#A7A0F8]",
    "z-[9999]",
    "z-[9998]",
    "rounded-br-sm",
    "rounded-bl-sm",
  ],

  plugins: [
    require("daisyui"),
    require("tailwind-scrollbar"),
  ],
}