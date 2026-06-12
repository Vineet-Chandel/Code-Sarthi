import React, { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { motion } from "framer-motion"

import Lines from "./Lines";
const SecondLanding = () => {
    const [rotate, setRotate] = useState(false);
    const containerRef = useRef(null);
    const iconSize = 44; // md:w-11 = 44px
    const padding = 6;   // p-1.5 = 6px

    const getTranslateX = () => {
        if (!containerRef.current) return 0;
        const containerWidth = containerRef.current.offsetWidth;
        // Move icon to far right: total width - icon size - padding on both sides
        return containerWidth - iconSize - padding * 2;
    };



    const parentVariant = {
        initial: {},
        hover: {},
    }

    const iconVariants = {
        initial: {
            rotateX: 20,
            rotateZ: 0,
            scale: 1,
        },
        hover: {
            rotateX: 180,
            rotateZ: 180,
            scale: 1.3,
        },
    };
    return (
        <div
            className="w-full  bg-gray-200 flex items-center justify-between gap-2 ">
            <div className="w-[1400px] mx-auto h-full py-10 px-5 flex  lg:flex-row flex-col gap-2">
                <div

                    className="     bg-[#080808]
    bg-[linear-gradient(45deg,#181818_25%,transparent_25%),linear-gradient(-45deg,#181818_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#181818_75%),linear-gradient(-45deg,transparent_75%,#181818_75%)]
    bg-[size:60px_60px] h-[700px] md:h-[345px] lg:h-[700px] w-full lg:w-1/3 rounded-xl flex flex-col md:flex-row lg:flex-col gap-3 p-3">


                    <div className="h-full z-20 w-full md:w-1/2 lg:w-full lg:h-1/2 bg-gray-200 rounded-xl px-5 pt-5" >
                        <div className="bg-gray-300 h-full w-full rounded-t-xl  px-5">
                            <div className="h-[10%] flex items-center justify-between">
                                <div className="flex gap-1 pl-2">
                                    <div className="h-1.5 w-1.5 rounded-full bg-red-400"></div>
                                    <div className="h-1.5 w-1.5 rounded-full bg-yellow-500"></div>
                                    <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                                </div>
                                <div className="w-full h-6 rounded-full flex items-center justify-center">
                                    <div className="w-[130px] h-3 mr-4 rounded-full bg-gray-100">

                                    </div>
                                </div>


                            </div>
                            <div className="h-[90%] w-full px-2 pt-2 rounded-t-xl bg-gray-100">
                                <div className="w-full flex justify-between">
                                    <div className="w-3.5 h-3.5  rounded-full bg-gray-300"></div>
                                    <div className="flex gap-1 items-center">
                                        <div className="w-[25px] h-2.5  rounded-full bg-gray-300"></div>
                                        <div className="w-[25px] h-2.5  rounded-full bg-gray-300"></div>
                                        <div className="w-[25px] h-2.5  rounded-full bg-gray-300"></div>
                                        <div className="w-[30px] h-3 rounded-full bg-gray-300"></div>
                                    </div>
                                </div>
                                <div className="w-full items-center rounded-full flex flex-col gap-2 py-2 justify-center mt-4">
                                    <div className="w-[130px] h-2  rounded-full bg-gray-300"></div>
                                    <div className="w-[100px] h-1  rounded-full bg-gray-300"></div>
                                    <div className="flex gap-1 items-center justify-center">
                                        <div className="w-[25px] h-2  rounded-full bg-gray-300"></div>
                                        <div className="w-[25px] h-2  rounded-full bg-gray-300"></div>
                                    </div>
                                    <div className="flex gap-1 items-center justify-center">
                                        <div className="w-3 h-3  rounded-full bg-gray-300 animate-pulse"></div>
                                        <div className="w-3 h-3  rounded-full bg-gray-300 animate-pulse"></div>
                                        <div className="w-3 h-3  rounded-full bg-gray-300 animate-pulse"></div>
                                        <div className="w-3 h-3  rounded-full bg-gray-300 animate-pulse"></div>
                                    </div>
                                    <div className="w-[130px] h-[120px] mt-5 rounded-xl bg-gray-300 flex items-center justify-center" >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                            <g fill="none" stroke="#737272ff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}>
                                                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2"></path>
                                                <path d="M8 21.168V14l4-7l4 7v7.168"></path>
                                                <path d="M8 14s1.127 1 2 1s2-1 2-1s1.127 1 2 1s2-1 2-1"></path>
                                            </g>
                                        </svg>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="h-full z-20 pl-5 pr-5 md:w-1/2 lg:w-full lg:h-1/2  rounded-xl" >
                        <div className="relative z-10 mt-9 mb-9">
                            <h2 className="text-2xl font-medium tracking-tight text-white">
                                Web Frontend & Development
                            </h2>

                            <p className="mt-3 w-[90%] text-xl leading-[1.6] font-normal text-zinc-400">
                                Designed and developed with precision, every pixel reflects my dedication to creating exceptional digital experiences.
                            </p>
                        </div>
                        <div
                            ref={containerRef}
                            className="group relative flex items-center gap-3 mb-1 p-1.5 rounded-xl bg-base-100 hover:bg-gray-100/20 transition-all duration-300 cursor-pointer border border-gray-600 w-full max-w-xs sm:max-w-sm"
                            onMouseEnter={() => setRotate(true)}
                            onMouseLeave={() => setRotate(false)}
                        >
                            <motion.div
                                animate={{
                                    rotate: rotate ? 360 : 0,
                                    x: rotate ? getTranslateX() : 0
                                }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="shrink-0 bg-black w-9 h-9 md:w-11 md:h-11 flex items-center justify-center border border-secondary p-3 rounded-xl"
                            >



                                {rotate ? (
                                    <div className="bg-accent p-1 w-full h-full rounded-xl flex flex-col justify-center items-center gap-1 transition-colors duration-500 ease-in-out">
                                        <div className="flex gap-1 ">
                                            <div className="w-[3px] h-[3px] bg-white/20 rounded-full transition-colors duration-500 ease-in-out"></div>
                                            <div className="w-[3px] h-[3px] bg-white/20 rounded-full transition-colors duration-500 ease-in-out"></div>
                                            <div className="w-[3px] h-[3px] bg-white rounded-full transition-colors duration-500 ease-in-out"></div>
                                            <div className="w-[3px] h-[3px] bg-white/20 rounded-full transition-colors duration-500 ease-in-out"></div>
                                            <div className="w-[3px] h-[3px] bg-white/20 rounded-full transition-colors duration-500 ease-in-out"></div>
                                        </div>

                                        <div className="flex gap-1 ">
                                            <div className="w-[3px] h-[3px] bg-white/20 rounded-full transition-colors duration-500 ease-in-out"></div>
                                            <div className="w-[3px] h-[3px] bg-white rounded-full transition-colors duration-500 ease-in-out"></div>
                                            <div className="w-[3px] h-[3px] bg-white/20 rounded-full transition-colors duration-500 ease-in-out"></div>
                                            <div className="w-[3px] h-[3px] bg-white/20 rounded-full transition-colors duration-500 ease-in-out"></div>
                                            <div className="w-[3px] h-[3px] bg-white/20 rounded-full transition-colors duration-500 ease-in-out"></div>
                                        </div>

                                        <div className="flex gap-1 ">
                                            <div className="w-[3px] h-[3px] bg-white rounded-full transition-colors duration-500 ease-in-out"></div>
                                            <div className="w-[3px] h-[3px] bg-white rounded-full transition-colors duration-500 ease-in-out"></div>
                                            <div className="w-[3px] h-[3px] bg-white rounded-full transition-colors duration-500 ease-in-out"></div>
                                            <div className="w-[3px] h-[3px] bg-white rounded-full transition-colors duration-500 ease-in-out"></div>
                                            <div className="w-[3px] h-[3px] bg-white rounded-full transition-colors duration-500 ease-in-out"></div>
                                        </div>

                                        <div className="flex gap-1 ">
                                            <div className="w-[3px] h-[3px] bg-white/20 rounded-full transition-colors duration-500 ease-in-out"></div>
                                            <div className="w-[3px] h-[3px] bg-white rounded-full transition-colors duration-500 ease-in-out"></div>
                                            <div className="w-[3px] h-[3px] bg-white/20 rounded-full transition-colors duration-500 ease-in-out"></div>
                                            <div className="w-[3px] h-[3px] bg-white/20 rounded-full transition-colors duration-500 ease-in-out"></div>
                                            <div className="w-[3px] h-[3px] bg-white/20 rounded-full transition-colors duration-500 ease-in-out"></div>
                                        </div>

                                        <div className="flex gap-1 ">
                                            <div className="w-[3px] h-[3px] bg-white/20 rounded-full transition-colors duration-500 ease-in-out"></div>
                                            <div className="w-[3px] h-[3px] bg-white/20 rounded-full transition-colors duration-500 ease-in-out"></div>
                                            <div className="w-[3px] h-[3px] bg-white rounded-full transition-colors duration-500 ease-in-out"></div>
                                            <div className="w-[3px] h-[3px] bg-white/20 rounded-full transition-colors duration-500 ease-in-out"></div>
                                            <div className="w-[3px] h-[3px] bg-white/20 rounded-full transition-colors duration-500 ease-in-out"></div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="bg-accent p-1 w-full h-full rounded-xl flex flex-col justify-center items-center gap-1 transition-colors duration-500 ease-in-out">
                                        <div className="flex gap-1 ">
                                            <div className="w-[3px] h-[3px] bg-white/20 rounded-full transition-colors duration-500 ease-in-out"></div>
                                            <div className="w-[3px] h-[3px] bg-white/20 rounded-full transition-colors duration-500 ease-in-out"></div>
                                            <div className="w-[3px] h-[3px] bg-white rounded-full transition-colors duration-500 ease-in-out"></div>
                                            <div className="w-[3px] h-[3px] bg-white/20 rounded-full transition-colors duration-500 ease-in-out"></div>
                                            <div className="w-[3px] h-[3px] bg-white/20 rounded-full transition-colors duration-500 ease-in-out"></div>
                                        </div>

                                        <div className="flex gap-1 ">
                                            <div className="w-[3px] h-[3px] bg-white/20 rounded-full transition-colors duration-500 ease-in-out"></div>
                                            <div className="w-[3px] h-[3px] bg-white/20 rounded-full transition-colors duration-500 ease-in-out"></div>
                                            <div className="w-[3px] h-[3px] bg-white/20 rounded-full transition-colors duration-500 ease-in-out"></div>
                                            <div className="w-[3px] h-[3px] bg-white rounded-full transition-colors duration-500 ease-in-out"></div>
                                            <div className="w-[3px] h-[3px] bg-white/20 rounded-full transition-colors duration-500 ease-in-out"></div>
                                        </div>

                                        <div className="flex gap-1 ">
                                            <div className="w-[3px] h-[3px] bg-white rounded-full transition-colors duration-500 ease-in-out"></div>
                                            <div className="w-[3px] h-[3px] bg-white rounded-full transition-colors duration-500 ease-in-out"></div>
                                            <div className="w-[3px] h-[3px] bg-white rounded-full transition-colors duration-500 ease-in-out"></div>
                                            <div className="w-[3px] h-[3px] bg-white rounded-full transition-colors duration-500 ease-in-out"></div>
                                            <div className="w-[3px] h-[3px] bg-white rounded-full transition-colors duration-500 ease-in-out"></div>
                                        </div>

                                        <div className="flex gap-1 ">
                                            <div className="w-[3px] h-[3px] bg-white/20 rounded-full transition-colors duration-500 ease-in-out"></div>
                                            <div className="w-[3px] h-[3px] bg-white/20 rounded-full transition-colors duration-500 ease-in-out"></div>
                                            <div className="w-[3px] h-[3px] bg-white/20 rounded-full transition-colors duration-500 ease-in-out"></div>
                                            <div className="w-[3px] h-[3px] bg-white rounded-full transition-colors duration-500 ease-in-out"></div>
                                            <div className="w-[3px] h-[3px] bg-white/20 rounded-full transition-colors duration-500 ease-in-out"></div>
                                        </div>

                                        <div className="flex gap-1 ">
                                            <div className="w-[3px] h-[3px] bg-white/20 rounded-full transition-colors duration-500 ease-in-out"></div>
                                            <div className="w-[3px] h-[3px] bg-white/20 rounded-full transition-colors duration-500 ease-in-out"></div>
                                            <div className="w-[3px] h-[3px] bg-white rounded-full transition-colors duration-500 ease-in-out"></div>
                                            <div className="w-[3px] h-[3px] bg-white/20 rounded-full transition-colors duration-500 ease-in-out"></div>
                                            <div className="w-[3px] h-[3px] bg-white/20 rounded-full transition-colors duration-500 ease-in-out"></div>
                                        </div>
                                    </div>
                                )}

                            </motion.div>






                            <motion.h1
                                animate={{
                                    x: rotate ? -40 : 0,
                                    opacity: rotate ? 0.8 : 1,
                                }}
                                transition={{
                                    duration: 0.2,
                                    ease: "easeInOut",
                                }}
                                className="text-white text-sm min-[320px]:text-xl  p-2 rounded-full w-full"
                            >
                                View Frontend Skills
                            </motion.h1>


                        </div>
                    </div>
                </div>
                <div className="flex lg:w-2/3 w-full h-full flex-col gap-2">
                    <div className="flex md:flex-row flex-col h-1/2 w-full gap-2">

                        <div className="h-[345px] bg-white w-full rounded-xl   overflow-hidden">
                            <div className="relative z-10  p-5">
                                <h2 className="text-3xl mb-4 font-extrabold tracking-tight text-black">
                                    Technologies I Mastered
                                </h2>
                                <Lines />

                            </div>
                        </div>
                    </div>
                    <div className="flex md:flex-row flex-col h-1/2 w-full gap-2">
                        <div className="h-[345px] w-full md:w-1/2 lg:w-2/3 bg-blue-500 rounded-xl">
                            <div className="relative h-full overflow-hidden rounded-xl border border-zinc-800 bg-gradient-to-b from-zinc-900/80 to-black p-4 sm:p-6">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#27272a_0%,transparent_60%)] opacity-50" />

                                <div className="relative h-full flex flex-col">
                                    <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">
                                        Consistency Over Time
                                    </h2>

                                    <div className="flex-1 overflow-x-auto overflow-y-hidden scrollbar-thin">
                                        <div className="w-full flex justify-center">

                                        </div>
                                    </div>
                                    <motion.div

                                        variants={parentVariant}
                                        initial="initial"
                                        whileHover="hover"
                                        className="text-white flex items-center justify-between px-4 py-2 rounded-full text-lg border bg-gray-400/40 w-[134px] cursor-pointer group border-white/10 font-extrabold font-poppins">
                                        Follow
                                        <motion.svg
                                            variants={iconVariants}
                                            transition={{
                                                duration: 0.3,
                                                ease: "easeInOut",
                                            }}
                                            className="group-hover:scale-110 transition-all duration-500" xmlns="http://www.w3.org/2000/svg" width="1.9em" height="1.9em" viewBox="0 0 24 24">
                                            <path d="M0 0h24v24H0z" fill="none" />
                                            <path fill="#fff" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2" />
                                        </motion.svg>







                                    </motion.div>
                                </div>
                            </div>
                        </div>
                        <div className="h-[345px] w-full md:w-1/2 lg:w-1/3 bg-green-500 rounded-xl ">
                            <div className="relative h-full overflow-hidden rounded-xl border border-zinc-800 bg-gradient-to-b from-zinc-900/80 to-black p-4 sm:p-6">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#27272a_0%,transparent_60%)] opacity-50" />

                                <div className="relative h-full flex justify-center items-center flex flex-col justify-center items-center">
                                    <h2 className="text-7xl sm:text-8xl font-extrabold font-poppins text-white mb-4 sm:mb-6">
                                        10+
                                    </h2>

                                    <p className="text-base sm:text-lg font-medium text-white">Projects Completed</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div >
    );
};

export default SecondLanding;