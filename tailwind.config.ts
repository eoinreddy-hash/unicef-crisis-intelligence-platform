import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        unicef: {
          blue: "#1CABE2",
          navy: "#0B1F3A",
          mist: "#F4F8FB",
          border: "#D9E4EE",
          ink: "#0F2741"
        },
        crisis: {
          critical: "#F25F5C",
          high: "#FF8A3D",
          medium: "#F5C04E",
          stable: "#30B784",
          info: "#7C8DA6"
        }
      },
      boxShadow: {
        panel: "0 20px 60px rgba(11, 31, 58, 0.08)",
        soft: "0 10px 30px rgba(15, 39, 65, 0.08)"
      },
      backgroundImage: {
        "hero-grid":
          "linear-gradient(rgba(28,171,226,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(28,171,226,0.08) 1px, transparent 1px)"
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        pulseSoft: "pulseSoft 2.8s ease-in-out infinite",
        drift: "drift 22s linear infinite",
        scan: "scan 5s ease-in-out infinite"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" }
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.5", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.08)" }
        },
        drift: {
          "0%": { transform: "translateX(-8%)" },
          "100%": { transform: "translateX(8%)" }
        },
        scan: {
          "0%, 100%": { opacity: "0.2", transform: "translateY(-10%)" },
          "50%": { opacity: "0.55", transform: "translateY(12%)" }
        }
      }
    }
  },
  plugins: []
};

export default config;
