"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { Mail, Layers } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const words = [
    "Innovative",
    "Creative",
    "Amazing",
    "Impactful",
    "Extraordinary",
    "Beautiful",
    "Intelligent",
];
const MainCTAbutton = ({ ClassName = "" }) => {
    const navigate = useNavigate()
    return (


        <div onClick={() => navigate("/signup")} className={` flex items-center justify-between cursor-pointer text-black  font-bold ${ClassName}`}>

            <span className="text-white relative -right-[1px]" >
                <svg className='h-[33px] sm:h-[40px]' viewBox="0 0 15 40" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" transform="matrix(-1,0,0,1,0,0)">
                    <path d="M0 .5h11A3.5 3.5 0 0 1 14.5 4v20.523a5.5 5.5 0 0 1-1.416 3.684l-8.547 9.477A5.5 5.5 0 0 1 .453 39.5H0" data-stroke="true"
                        fill="#fff"
                    ></path>
                </svg>
            </span>
            <button className="bg-white  px-2  sm:px-4 py-[4px]  sm:py-[7.5px] ">Get Started</button>
            <span className="text-white relative -left-[1px]">
                <svg className='h-[33px] sm:h-[40px]' viewBox="0 0 15 40" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M0 .5h11A3.5 3.5 0 0 1 14.5 4v20.523a5.5 5.5 0 0 1-1.416 3.684l-8.547 9.477A5.5 5.5 0 0 1 .453 39.5H0"
                        fill="#fff"
                    />
                </svg>
            </span>
        </div>
    )
}
const MainCTAbutton2 = ({ ClassName = "" }) => {
    const navigate = useNavigate()
    return (


        <div onClick={() => navigate("/signup")} className={` flex items-center justify-between cursor-pointer text-black  font-bold ${ClassName}`}>

            <span className="text-white relative -right-[1px]" >
                <svg className='h-[33px] sm:h-[40px]' viewBox="0 0 15 40" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" transform="matrix(-1,0,0,1,0,0)">
                    <path d="M0 .5h11A3.5 3.5 0 0 1 14.5 4v20.523a5.5 5.5 0 0 1-1.416 3.684l-8.547 9.477A5.5 5.5 0 0 1 .453 39.5H0" data-stroke="true"
                        strokeWidth='2'
                        stroke='#ffffff'
                    ></path>
                </svg>
            </span>

            <button className="border-white text-white border-b-[1.5px]  border-t-[1.5px] px-2  sm:px-4 py-[4px]  sm:py-[6.9px] ">About CodeSarthi</button>
            <span className="text-white relative -left-[1px]">
                <svg className='h-[33px] sm:h-[40px]' viewBox="0 0 15 40" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M0 .5h11A3.5 3.5 0 0 1 14.5 4v20.523a5.5 5.5 0 0 1-1.416 3.684l-8.547 9.477A5.5 5.5 0 0 1 .453 39.5H0"

                        strokeWidth='1'
                        stroke='#ffffff'
                    />
                </svg>
            </span>
        </div>
    )
}


const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
};

// Builds the radial-gradient glow that follows the cursor under a button
const glowStyle = (pos) => ({
    background: pos
        ? `radial-gradient(120px circle at ${pos.x}px ${pos.y}px, rgba(255,255,255,0.35), transparent 70%)`
        : "transparent",
});

const Contact = () => {
    const [index, setIndex] = useState(0);
    const [primaryGlow, setPrimaryGlow] = useState(null);
    const [secondaryGlow, setSecondaryGlow] = useState(null);

    // Rotate the animated word every 2.5s
    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % words.length);
        }, 2500);
        return () => clearInterval(timer);
    }, []);

    const longestWord = words.reduce((a, b) => (a.length > b.length ? a : b));

    const track = (setter) => (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setter({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    // --- Inline magnetic button (no separate file) ---
    const MagneticButton = ({ children, className = "", ...props }) => {
        const ref = useRef(null);

        const x = useMotionValue(0);
        const y = useMotionValue(0);

        const springX = useSpring(x, {
            stiffness: 220,
            damping: 18,
            mass: 0.6,
        });

        const springY = useSpring(y, {
            stiffness: 220,
            damping: 18,
            mass: 0.6,
        });

        useEffect(() => {
            const handleMouseMove = (e) => {
                if (!ref.current) return;

                const rect = ref.current.getBoundingClientRect();

                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                const dx = e.clientX - centerX;
                const dy = e.clientY - centerY;

                const distance = Math.sqrt(dx * dx + dy * dy);

                const radius = 150;

                if (distance < radius) {
                    const power = (radius - distance) / radius;

                    x.set(dx * 0.25 * power);
                    y.set(dy * 0.25 * power);
                } else {
                    x.set(0);
                    y.set(0);
                }
            };

            window.addEventListener("mousemove", handleMouseMove);

            return () => {
                window.removeEventListener("mousemove", handleMouseMove);
            };
        }, []);

        return (
            <motion.button
                ref={ref}
                style={{
                    x: springX,
                    y: springY,
                }}
                className={className}
                {...props}
            >
                {children}
            </motion.button>
        );
    };

    return (
        <section className="relative flex min-h-[60vh] w-full items-center justify-center overflow-hidden bg-[#000]">
            {/* Background: gradients + blurred glow circles */}
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(255,255,255,0.03), transparent 60%), " +
                            "radial-gradient(ellipse 80% 50% at 50% 110%, rgba(140,140,150,0.05), transparent 60%)",
                    }}
                />
                <div className="absolute -top-24 left-[8%] h-[420px] w-[420px] rounded-full bg-white/5 blur-[120px]" />
                <div className="absolute -bottom-32 right-[10%] h-[520px] w-[520px] rounded-full bg-neutral-400/10 blur-[140px]" />
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-center px-6 text-center"
            >
                {/* Headline */}
                <motion.h1
                    variants={itemVariants}
                    className="text-5xl font-black leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
                >
                    <span className="block">Start Building with </span>
                    <span className="mt-1  block">
                        <span className=" relative inline-block h-[1.1em] align-bottom overflow-hidden">
                            <span aria-hidden="true" className="invisible whitespace-nowrap">
                                {longestWord}
                            </span>
                            <AnimatePresence mode="popLayout">
                                <motion.span
                                    key={words[index]}
                                    initial={{ y: 40, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -40, opacity: 0 }}
                                    transition={{ type: "spring", duration: 0.35, bounce: 0.22 }}
                                    className="absolute left-0 top-0 whitespace-nowrap text-white"
                                >
                                    {words[index]}
                                </motion.span>
                            </AnimatePresence>
                        </span>{" "}
                        <span className="text-neutral-300">Developers</span>
                    </span>
                </motion.h1>

                {/* Description */}
                <motion.p
                    variants={itemVariants}
                    className="mt-8 max-w-[850px] text-lg leading-relaxed text-neutral-400 md:text-xl text-white"
                >
                    CodeSarthi is an AI-powered developer ecosystem that unifies collaboration, career growth, and project management in a single platform. It helps developers communicate, build ATS-friendly resumes, prepare for interviews, and manage projects efficiently without relying on a dedicated project manager.
                </motion.p>

                {/* CTA buttons */}
                <div className='relative z-30 mt-4 sm:mt-7 flex gap-2 sm:gap-4'>
                    <MainCTAbutton />
                    <MainCTAbutton2 />
                </div>
            </motion.div>
        </section>
    );
};

export default Contact;