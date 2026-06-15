import React, { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
const ContentFirst2 = () => {

    const headingRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: headingRef,
        offset: ["start 90%", "end 30%"],
    });
    const rotateX = useTransform(scrollYProgress, [0, 0.7], [60, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.7], [0.7, 1]);
    const y = useTransform(scrollYProgress, [0, 0.7], [350, 0]);
    const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
    const config = {
        stiffness: 50,
        damping: 25,
        mass: 2,
    };

    const smoothRotateX = useSpring(rotateX, config);
    const smoothScale = useSpring(scale, config);
    const smoothY = useSpring(y, config);
    return (
        <div

            className="w-screen bg-gray-200 px-10 py-10 flex flex-col gap-2 [perspective:700px]"
        >

            <motion.div
                ref={headingRef}
                style={{
                    rotateX: smoothRotateX,
                    scale: smoothScale,
                    y: smoothY,
                    opacity,
                    transformStyle: "preserve-3d",
                    transformOrigin: "center top",
                }} className='w-full text-center  flex flex-col items-center justify-center mb-5'>
                <div

                    className='text-[#000] font-poppins font-extrabold text-7xl  justify-start'>
                    A Platform for Endless Possibilities
                </div>

                <p className='text-[#000] font-poppins font-light text-lg mt-2   text-center w-1/2'>CodeSarthi connects you with a global developer community to build and scale. Designed to boost productivity while keeping workflows fast and efficient.</p>
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
        </div>
    )
}

export default ContentFirst2