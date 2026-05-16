import React, { useRef, useState } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
} from "framer-motion";
import { useNavigate } from "react-router-dom";

/* ─────────────────────────────────────────
   Styles
───────────────────────────────────────── */
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Space+Mono:wght@400;700&family=Outfit:wght@300;400;500;600&display=swap');

/* ── Hero ── */
.dv-hero-title {
  font-family: 'Syne', sans-serif;
  font-weight: 800;
font-size: clamp(4rem, 11vw, 7rem);
  line-height: 0.9;
  letter-spacing: -0.04em;

}

.dv-hero-sub {
  font-family: 'Outfit', sans-serif;
  font-weight: 300;
  font-size: clamp(1rem, 1.8vw, 1.3rem);
  color: rgba(255,255,255,0.6);
  letter-spacing: 0.01em;
}

.dv-hero-tagline {
  font-family: 'Space Mono', monospace;
  font-size: clamp(0.75rem, 1vw, 0.9rem);
  color: rgba(255,255,255,0.3);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.dv-hero-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 32px;
  border-radius: 999px;
  background: #fff;
  color: #0a0a0a;
  font-family: 'Space Mono', monospace;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.23,1,0.32,1);
  position: relative;
  overflow: hidden;
}
.dv-hero-btn::before {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(135deg, #ffb830, #ff4d1c);
  opacity: 0;
  transition: opacity 0.3s;
}
.dv-hero-btn:hover::before { opacity: 1; }
.dv-hero-btn:hover { color: #fff; transform: scale(1.04);  }
.dv-hero-btn span { position: relative; z-index: 1; }
.dv-hero-btn svg  { position: relative; z-index: 1; transition: transform 0.25s; }
.dv-hero-btn:hover svg { transform: rotate(45deg) scale(1.1); }

/* ── Scroll indicator ── */
.dv-scroll-hint {
  font-family: 'Space Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.2em;
  color: rgba(255,255,255,0.25);
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 10px;
}
.dv-scroll-line {
  width: 40px; height: 1px;
  background: rgba(255,255,255,0.2);
  position: relative; overflow: hidden;
}
.dv-scroll-line::after {
  content: '';
  position: absolute; top: 0; left: -100%;
  width: 100%; height: 100%;
  background: rgba(255,255,255,0.6);
  animation: dv-slide 2s ease-in-out infinite;
}
@keyframes dv-slide {
  0%   { left: -100%; }
  100% { left:  100%; }
}

/* ─────────────────────────────────
   FOOTER
───────────────────────────────── */
.dv-footer {
  background: #060a07;
  font-family: 'Outfit', sans-serif;
  position: relative;
  overflow: hidden;
  border-top: 1px solid rgba(255,255,255,0.06);
}

/* dot grid */
.dv-footer-grid {
  position: absolute; inset: 0; pointer-events: none; z-index: 0;
  background-image: radial-gradient(rgba(255,255,255,0.035) 1px, transparent 1px);
  background-size: 32px 32px;
}

/* top ambient line */
.dv-footer-topline {
  height: 1px; width: 100%;
  background: linear-gradient(90deg, transparent 0%, rgba(0,255,135,0.35) 30%, rgba(255,184,48,0.3) 70%, transparent 100%);
  position: absolute; top: 0; left: 0;
}

/* large watermark text */
.dv-watermark {
  font-family: 'Syne', sans-serif;
  font-weight: 800;
  font-size: clamp(4rem, 14vw, 8rem);
  letter-spacing: -0.04em;
  line-height: 0.85;
  -webkit-text-stroke: 1px rgba(255,255,255,0.06);
  color: transparent;
  user-select: none;
  pointer-events: none;
  white-space: nowrap;
  text-align: center;
  width: 100vw;
  justify-self: center;
}

/* column headings */
.dv-col-head {
  font-family: 'Space Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.25);
  margin-bottom: 20px;
  display: flex; align-items: center; gap: 10px;
}
.dv-col-head::after {
  content: '';
  flex: 1; height: 1px;
  background: rgba(255,255,255,0.08);
}

/* nav links */
.dv-link {
  font-family: 'Outfit', sans-serif;
  font-size: 0.95rem;
  font-weight: 400;
  color: rgba(255,255,255,0.38);
  cursor: pointer;
  transition: color 0.22s, transform 0.22s;
  display: inline-block;
  padding: 3px 0;
  line-height: 1.3;
  text-decoration: none;
}
.dv-link:hover { color: rgba(255,255,255,0.9); transform: translateX(4px); }

/* Social icon button */
.dv-social {
  width: 38px; height: 38px; border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.1);
  background: rgba(255,255,255,0.03);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  transition: all 0.25s;
}
.dv-social:hover {
  border-color: rgba(0,255,135,0.4);
  background: rgba(0,255,135,0.08);
  transform: translateY(-3px);

}

/* brand badge */
.dv-brand {
  display: inline-flex; align-items: center; gap: 8px;
  font-family: 'Syne', sans-serif;
  font-weight: 800;
  font-size: 1.1rem;
  color: #fff;
  letter-spacing: -0.02em;
}
.dv-brand-dot {
  width: 8px; height: 8px; border-radius: 50%;
  background: #00ff87;

  animation: dv-pulse 2s ease-in-out infinite;
}
@keyframes dv-pulse {
  0%,100% { opacity:1; transform:scale(1); }
  50%      { opacity:0.4; transform:scale(0.7); }
}

.dv-tagline-footer {
  font-family: 'Outfit', sans-serif;
  font-size: 0.82rem;
  color: rgba(255,255,255,0.28);
  font-weight: 300;
  max-width: 220px;
  line-height: 1.6;
}

/* status bar */
.dv-status-bar {
  display: flex; align-items: center; gap: 8px;
  font-family: 'Space Mono', monospace;
  font-size: 10px; letter-spacing: 0.12em;
  color: rgba(0,255,135,0.6);
  text-transform: uppercase;
}
.dv-status-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: #00ff87;

  animation: dv-pulse 2s ease-in-out infinite;
}

/* copyright */
.dv-copy {
  font-family: 'Space Mono', monospace;
  font-size: 10px; letter-spacing: 0.1em;
  color: rgba(255,255,255,0.15);
  text-transform: uppercase;
}

/* appear animation */
.dv-appear {
  opacity: 0;
  transform: translateY(24px);
  animation: dv-in 0.7s cubic-bezier(0.23,1,0.32,1) forwards;
}
@keyframes dv-in {
  to { opacity:1; transform:translateY(0); }
}
`;

/* ── Arrow icon ── */
const Arrow = ({ color = "currentColor" }) => (
    <svg className="rotate-45" width="13" height="13" viewBox="0 0 14 14" fill="none">
        <path d="M12.6286 1.04921L0.4829 5.52396C0.290486 5.59619 0.168389 5.78988 0.190123 5.99572C0.211219 6.2022 0.369753 6.36713 0.574952 6.39589L6.95147 7.30682L7.8624 13.6833C7.89116 13.8885 8.05673 14.0477 8.26193 14.0688C8.40128 14.0841 8.53553 14.033 8.6295 13.939C8.67488 13.8937 8.71068 13.8387 8.73369 13.776L13.2084 1.63029C13.2698 1.46408 13.2289 1.2787 13.1042 1.15405C12.9796 1.02939 12.7942 0.988481 12.6286 1.04921Z" fill={color} />
    </svg>
);

/* ── Social icons ── */
const IconInstagram = () => (
    <svg width="16" height="16" viewBox="0 0 448 512" fill="rgba(255,255,255,0.55)">
        <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9S287.7 141 224.1 141m0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7m146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8m76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1S-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8M398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1" />
    </svg>
);
const IconYoutube = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,255,255,0.55)">
        <path d="M9.25 8.07a.5.5 0 0 1 .501.002l6 3.5a.5.5 0 0 1 0 .864l-6 3.5a.5.5 0 0 1-.752-.433v-7c0-.179.096-.344.251-.434z" />
        <path fillRule="evenodd" d="M11.7 3h-.003c-.677.005-2.39.024-4.12.094-.865.036-1.74.084-2.51.152-.739.066-1.44.154-1.92.288a3.74 3.74 0 0 0-1.68 1.01 3.87 3.87 0 0 0-.96 1.72l-.013.045-.007.046c-.526 3.21-.747 8.16.029 11.4l.002.008.002.009a3.9 3.9 0 0 0 .961 1.72c.462.48 1.04.83 1.68 1.01.433.123 1.05.206 1.7.267a47 47 0 0 0 2.23.146l.843.034c1.35.047 2.65.064 3.4.07l.743.004h.007c.371-.001 2.11-.008 3.96-.073.924-.032 1.89-.079 2.72-.147.81-.066 1.59-.158 2.09-.3a3.74 3.74 0 0 0 1.68-1.01c.463-.48.793-1.07.961-1.72l.01-.041.008-.042c.557-3.23.743-8.17-.027-11.4l-.002-.01-.003-.01a3.9 3.9 0 0 0-.961-1.72 3.74 3.74 0 0 0-1.68-1.01c-.457-.128-1.13-.214-1.83-.278a51 51 0 0 0-2.39-.147l-.237-.01h-.001a127 127 0 0 0-3.75-.082l-.601-.004z" clipRule="evenodd" />
    </svg>
);
const IconMail = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,255,255,0.55)">
        <path d="m18.73 5.41-1.28 1L12 10.46 6.55 6.37l-1.28-1A2 2 0 0 0 2 7.05v11.59A1.36 1.36 0 0 0 3.36 20h3.19v-7.72L12 16.37l5.45-4.09V20h3.19A1.36 1.36 0 0 0 22 18.64V7.05a2 2 0 0 0-3.27-1.64" />
    </svg>
);
const IconGithub = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,255,255,0.55)">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
);

const footerFeatures = [
    "Toolkit", "Resume Generator", "Smart Scheduler",
    "Global Dev Community", "Project Manager",
    "Analytics & Insights", "AI Assistant",
];

const footerCompany = [
    "About Us", "Help Center", "Privacy Policy",
    "Transparency Hub", "Wellbeing Hub",
    "Feedback", "Submit a Request", "Reviews",
];

const socials = [
    {
        icon: (<svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24">
            <g fill="none" stroke="#b5b3b3ff" strokeWidth={2}>
                <rect width={14} height={14} x={5} y={5} rx={4}></rect>
                <path strokeLinecap="round" d="M15.9 8.1v.01"></path>
                <circle cx={12} cy={12} r={3}></circle>
            </g>
        </svg>), label: "Instagram", href: "https://www.instagram.com/codesarthik06/"
    },
    {
        icon: (<svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24">
            <g fill="none">
                <path fill="#b5b3b3ff" fillOpacity={0.16} fillRule="evenodd" d="M22.54 6.42a2.77 2.77 0 0 0-1.945-1.957C18.88 4 12 4 12 4s-6.88 0-8.595.463A2.77 2.77 0 0 0 1.46 6.42C1 8.148 1 11.75 1 11.75s0 3.602.46 5.33a2.77 2.77 0 0 0 1.945 1.958C5.121 19.5 12 19.5 12 19.5s6.88 0 8.595-.462a2.77 2.77 0 0 0 1.945-1.958c.46-1.726.46-5.33.46-5.33s0-3.602-.46-5.33M9.75 8.479v6.542l5.75-3.271z" clipRule="evenodd"></path>
                <path stroke="#b5b3b3ff" strokeLinejoin="round" strokeMiterlimit={10} strokeWidth={1.5} d="M20.595 4.463A2.77 2.77 0 0 1 22.54 6.42c.46 1.728.46 5.33.46 5.33s0 3.604-.46 5.33a2.77 2.77 0 0 1-1.945 1.958C18.88 19.5 12 19.5 12 19.5s-6.879 0-8.595-.462A2.77 2.77 0 0 1 1.46 17.08C1 15.353 1 11.75 1 11.75s0-3.602.46-5.33a2.77 2.77 0 0 1 1.945-1.957C5.12 4 12 4 12 4s6.88 0 8.595.463Z"></path>
                <path stroke="#b5b3b3ff" strokeLinejoin="round" strokeMiterlimit={10} strokeWidth={1.5} d="M9.75 15.021V8.48l5.75 3.271z"></path>
            </g>
        </svg>), label: "YouTube", href: "https://www.youtube.com/@CodeSarthi-ZENITH"
    },
    {
        icon: (<svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24">
            <path fill="#b5b3b3ff" d="M7.125 3.75h9.75c.813 0 1.468 0 2 .043c.546.045 1.026.14 1.47.366a3.75 3.75 0 0 1 1.64 1.639c.226.444.32.924.365 1.47q.01.12.016.247a.75.75 0 0 1 .014.336c.013.41.013.879.013 1.417v5.464c0 .813 0 1.469-.043 2c-.045.546-.14 1.026-.366 1.47a3.75 3.75 0 0 1-1.639 1.64c-.444.226-.924.32-1.47.365c-.532.043-1.187.043-2 .043h-9.75c-.813 0-1.468 0-2-.043c-.546-.045-1.026-.14-1.47-.366a3.75 3.75 0 0 1-1.639-1.639c-.226-.444-.32-.924-.365-1.47c-.044-.531-.044-1.187-.044-2V9.268c0-.538 0-1.007.013-1.417a.75.75 0 0 1 .014-.336q.007-.128.017-.246c.044-.547.139-1.027.365-1.471a3.75 3.75 0 0 1 1.639-1.64c.444-.226.924-.32 1.47-.365c.532-.043 1.187-.043 2-.043M20.85 7.341c-.038-.423-.105-.672-.202-.862a2.25 2.25 0 0 0-.983-.984c-.198-.1-.459-.17-.913-.207c-.462-.037-1.057-.038-1.909-.038H7.157c-.852 0-1.446 0-1.91.038c-.453.037-.714.107-.911.207a2.25 2.25 0 0 0-.984.984c-.096.19-.164.439-.202.862l6.604 4.403c1.01.674 1.363.895 1.722.981a2.25 2.25 0 0 0 1.048 0c.36-.086.711-.307 1.723-.981z"></path>
        </svg>), label: "Email", href: "mailto:codesarthi.headmail@gmail.com"
    },
    {
        icon: (<svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24">
            <path fill="#b5b3b3ff" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"></path>
        </svg>), label: "GitHub", href: "https://github.com/Vineet-Chandel/Code-Sarthi"
    },
];

/* ═══════════════════════════════════════
   Main Component
═══════════════════════════════════════ */
const Devs = () => {
    const containerRef = useRef(null);
    const navigate = useNavigate();

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 80, damping: 22, mass: 0.6,
    });

    const opacity = useTransform(smoothProgress, [0, 0.18, 0.82, 1], [0, 1, 1, 0]);
    const y = useTransform(smoothProgress, [0, 1], [80, -80]);



    return (
        <>
            <style>{STYLES}</style>

            {/* ──────────────── HERO ──────────────── */}
            <section
                ref={containerRef}
                className="relative h-screen w-full overflow-hidden"

            >
                {/* Background image */}
                <img
                    src="/img/developers.png"
                    alt="developers"
                    className="absolute inset-0 h-full w-full object-cover"

                />

                {/* Multi-layer overlay for depth */}
                <div className="absolute inset-0" style={{
                    background: "linear-gradient(160deg, rgba(0,0,0,0.65) 0%, rgba(10,6,0,0.5) 50%, rgba(0,0,0,0.8) 100%)"
                }} />
                {/* Bottom fade into footer */}
                <div className="absolute bottom-0 left-0 right-0 h-48" style={{
                    background: "linear-gradient(to bottom, transparent, #060a07)"
                }} />

                {/* Noise grain */}
                <div className="absolute inset-0" style={{
                    backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
                    opacity: 0.5, pointerEvents: "none",
                }} />

                {/* Content */}
                <motion.div
                    style={{ opacity, y }}
                    className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6 gap-5"
                >


                    {/* Main title */}
                    <motion.h1
                        className="dv-hero-title text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-orange-600 "
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35, duration: 1, ease: [0.23, 1, 0.32, 1] }}

                    >
                        CodeSarthi
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        className="dv-hero-sub"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.55, duration: 0.8 }}
                    >
                        Made by developers, for developers.
                    </motion.p>

                    {/* Tagline */}
                    <motion.p
                        className="dv-hero-tagline"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7, duration: 0.8 }}
                    >
                        "We just love the software and the people who build it."
                    </motion.p>

                    {/* CTA */}
                    <motion.button
                        className="dv-hero-btn"
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.85, duration: 0.6 }}
                        onClick={() => navigate("/login")}
                    >
                        <Arrow color="currentColor" />
                        <span>Open CodeSarthi</span>
                    </motion.button>
                </motion.div>
            </section>

            {/* ──────────────── FOOTER ──────────────── */}
            <footer className="dv-footer w-full">
                <div className="dv-footer-topline" />
                <div className="dv-footer-grid" />

                <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 pt-20 pb-10">

                    {/* ── Top row: brand + columns ── */}
                    <div
                        className="dv-appear"
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1.4fr 1fr 1fr",
                            gap: "48px",
                        }}
                    >
                        {/* Brand column */}
                        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                            <div>
                                <div className="dv-brand">
                                    <div className="dv-brand-dot" />
                                    CodeSarthi
                                </div>
                                <p className="dv-tagline-footer" style={{ marginTop: 12 }}>
                                    A platform built for the modern developer — where productivity meets community.
                                </p>
                            </div>

                            {/* Team member */}
                            <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 4 }}>
                                <img
                                    src="https://res.cloudinary.com/dggoaxqxl/image/upload/q_auto/f_auto/v1776693732/image_wxefat.png"
                                    alt="Team"
                                    style={{
                                        width: 44, height: 44, borderRadius: "50%",
                                        objectFit: "cover",
                                        border: "1px solid rgba(0,255,135,0.25)",

                                    }}
                                />
                                <div>
                                    <div style={{
                                        fontFamily: "'Outfit', sans-serif",
                                        fontSize: "0.85rem", fontWeight: 500,
                                        color: "rgba(255,255,255,0.7)",
                                    }}>
                                        Core Me
                                    </div>
                                    <div style={{
                                        fontFamily: "'Space Mono', monospace",
                                        fontSize: "10px", letterSpacing: "0.1em",
                                        color: "rgba(0,255,135,0.5)",
                                        textTransform: "uppercase",
                                    }}>
                                        Building the future
                                    </div>
                                </div>
                            </div>

                            {/* Social icons */}
                            <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                                {socials.map((s, i) => (
                                    <a
                                        key={i}
                                        href={s.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="dv-social"
                                        title={s.label}
                                    >
                                        {s.icon}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Features column */}
                        <div>
                            <div className="dv-col-head">Features</div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                {footerFeatures.map((item, i) => (
                                    <a key={i} href="#" className="dv-link">{item}</a>
                                ))}
                            </div>
                        </div>

                        {/* Company column */}
                        <div>
                            <div className="dv-col-head">Company</div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                {footerCompany.map((item, i) => (
                                    <a key={i} href="#" className="dv-link">{item}</a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ── Separator ── */}
                    <div style={{
                        height: 1, marginTop: 60, marginBottom: 32,
                        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)",
                    }} />

                    {/* ── Watermark ── */}
                    <div className="dv-watermark py-8" style={{ marginBottom: -16 }}>
                        CODESARTHI
                    </div>

                    {/* ── Bottom bar ── */}
                    <div style={{
                        display: "flex", alignItems: "center",
                        justifyContent: "space-between", flexWrap: "wrap",
                        gap: 12, paddingTop: 28,
                        borderTop: "1px solid rgba(255,255,255,0.05)",
                    }}>
                        <div className="dv-status-bar">
                            <div className="dv-status-dot" />
                            Vineet Singh Chandel
                        </div>

                        <p className="dv-copy">
                            © {new Date().getFullYear()} CodeSarthi · All rights reserved
                        </p>

                        <div style={{ display: "flex", gap: 20 }}>
                            {["Terms", "Privacy", "Cookies"].map((t, i) => (
                                <a key={i} href="#" style={{
                                    fontFamily: "'Space Mono', monospace",
                                    fontSize: "10px", letterSpacing: "0.1em",
                                    color: "rgba(255,255,255,0.2)",
                                    textDecoration: "none", textTransform: "uppercase",
                                    transition: "color 0.2s",
                                }}
                                    onMouseEnter={e => e.target.style.color = "rgba(255,255,255,0.6)"}
                                    onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.2)"}
                                >{t}</a>
                            ))}
                        </div>
                    </div>

                </div>
            </footer>
        </>
    );
};

export default Devs;