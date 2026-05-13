import React, { useRef } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
} from "framer-motion";
import { useNavigate } from "react-router-dom";


const Devs = () => {
    const containerRef = useRef(null);
    const navigate = useNavigate();

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    // smoother animation
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 80,
        damping: 22,
        mass: 0.6,
    });

    // fade in -> stay visible -> fade out
    const opacity = useTransform(
        smoothProgress,
        [0, 0.2, 0.8, 1],
        [0, 1, 1, 0]
    );

    // parallax movement
    const y = useTransform(
        smoothProgress,
        [0, 1],
        [80, -80]
    );

    // subtle zoom
    const scale = useTransform(
        smoothProgress,
        [0, 0.5, 1],
        [0.95, 1, 1.05]
    );

    // subtle blur at edges
    const blur = useTransform(
        smoothProgress,
        [0, 0.15, 0.85, 1],
        ["blur(8px)", "blur(0px)", "blur(0px)", "blur(8px)"]
    );

    return (
        <section
            ref={containerRef}
            className="relative h-screen w-full overflow-hidden mt-[150px]"
        >
            {/* background */}
            <img
                src="/img/developers.png"
                alt="developers"
                className="absolute inset-0 h-full w-full object-cover"
            />

            {/* overlay */}
            <div className="absolute inset-0 bg-black/60" />

            {/* content */}
            <motion.div
                style={{
                    opacity,
                    y,
                    scale,
                    filter: blur,
                }}
                className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4"
            >
                <h1
                    className="
                        text-[15rem]
                        max-xl:text-[12rem]
                        max-lg:text-[9rem]
                        max-md:text-[6rem]
                        max-sm:text-[4rem]
                        font-generalBold
                        leading-none
                        font-extrabold
                        bg-gradient-to-b
                        from-orange-100
                        via-orange-400
                        to-red-600
                        bg-clip-text
                        text-transparent
                    "
                >
                    CodeSarthi
                </h1>

                <p className="text-2xl max-md:text-lg text-white/80 font-robert-medium mt-4">
                    Made by developers, for developers.
                </p>

                <p className="text-xl max-md:text-base text-white/60 font-robert-medium mt-2">
                    “We just love the software and developers who build it.”
                </p>

                <button
                    onClick={() => navigate("/login")}
                    className="
                        mt-6
                        bg-white
                        text-black
                        px-8
                        py-3
                        rounded-xl
                        font-bold
                        transition-all
                        duration-300
                        hover:scale-110
                        hover:bg-orange-200
                        cursor-pointer
                    "
                >
                    Open CodeSarthi
                </button>
            </motion.div>
        </section>
    );
};

export default Devs;