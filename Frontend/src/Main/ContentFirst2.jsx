import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const ContentFirst2 = () => {
    const headingRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: headingRef,
        offset: ["start 85%", "start 35%"],
    });

    const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
    const y = useTransform(scrollYProgress, [0, 1], [80, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [0.96, 1]);

    const config = {
        stiffness: 120,
        damping: 25,
    };

    const smoothY = useSpring(y, config);
    const smoothScale = useSpring(scale, config);

    return (
        <section className="w-full bg-gray-200 py-10 px-6">

            <motion.div
                ref={headingRef}
                style={{
                    opacity,
                    y: smoothY,
                    scale: smoothScale,
                    willChange: "transform",
                }}
                className="max-w-6xl mx-auto flex flex-col items-center text-center mb-10"
            >

                <h2
                    className="
                    font-poppins
                    font-extrabold
                    text-[clamp(2.2rem,6vw,4.8rem)]
                    leading-tight
                    text-black
                "
                >
                    A Platform for Endless Possibilities
                </h2>

                <p
                    className="
                    mt-6
                    max-w-3xl
                    text-gray-600
                    text-base
                    sm:text-lg
                    leading-relaxed
                "
                >
                    CodeSarthi connects you with a global developer community
                    to build and scale. Designed to boost productivity while
                    keeping workflows fast and efficient.
                </p>

            </motion.div>
            <div className='w-full flex flex-row gap-2'>

                <div className='h-[700px] w-1/2 bg-white rounded-3xl flex flex-col p-3'>

                    <div className='h-[70%] bg-black/20 rounded-3xl'></div>

                    <div className='h-[30%] bg-transparent'></div>



                </div>

                <div className='h-[700px] w-1/2 bg-black rounded-3xl   p-3'>

                    <div className='h-[70%] bg-white/20 rounded-3xl'></div>

                    <div className='h-[30%] bg-transparent'></div>

                </div>

            </div>

            <div className='w-full h-[345px] bg-white rounded-3xl'></div>
        </section>
    );
};

export default ContentFirst2;