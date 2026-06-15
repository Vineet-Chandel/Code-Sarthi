import React, { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { motion } from "framer-motion"
import { ImagesBadge } from "@/components/ui/images-badge";
import Lines from "./Lines";

function ImagesBadgeDemo() {
    return (
        <div className="flex h-[10rem] w-full items-center justify-center">
            <ImagesBadge
                text="From Career Profile to Resume accoring to the particular JOB!"
                images={[
                    "https://res.cloudinary.com/dj0ivep44/image/upload/v1781378265/Screenshot_2026-06-14_at_12.47.19_AM_d90eld.webp",
                    "https://res.cloudinary.com/dj0ivep44/image/upload/v1781378320/Screenshot_2026-06-14_at_12.48.06_AM_v8lzoz.webp",
                    "https://res.cloudinary.com/dj0ivep44/image/upload/v1781378380/Screenshot_2026-06-14_at_12.49.22_AM_mrct6s.webp",
                ]}
            />
        </div>
    );
}
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
            className="w-screen  bg-gray-200 flex flex-col items-center justify-between gap-3 py-10  ">
            <div className='w-full text-center  flex flex-col items-center justify-center mb-5'>
                <div className='text-[#000] font-poppins font-extrabold text-7xl  justify-start'>
                    From Simple Resume Generation,
                </div>


            </div>

            <div className="w-full mx-auto h-full  px-5 flex  lg:flex-row flex-col gap-2">
                <div

                    className="     bg-[#080808]
    bg-[linear-gradient(45deg,#181818_25%,transparent_25%),linear-gradient(-45deg,#181818_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#181818_75%),linear-gradient(-45deg,transparent_75%,#181818_75%)]
    bg-[size:60px_60px] h-[700px] md:h-[345px] lg:h-[700px] w-full lg:w-1/3 rounded-xl flex flex-col md:flex-row lg:flex-col  p-3">

                    <div className="h-[7%] z-20 pl-2 pr-5 md:w-1/2 lg:w-full   rounded-xl" >

                        <h2 className="text-3xl font-extrabold tracking-tight text-white">
                            Career Profile Generation
                        </h2>
                    </div>
                    <div className="h-[93%] z-20 w-full md:w-1/2 lg:w-full bg-white/40 rounded-xl " >
                        <img className="w-full h-full object-cover rounded-xl" src="https://res.cloudinary.com/dj0ivep44/image/upload/v1781379326/Screenshot_2026-06-14_at_1.05.04_AM_fwssh4.webp" alt="" />
                    </div>

                </div>
                <div className="flex lg:w-2/3 w-full h-full flex-col gap-2">
                    <div className="flex md:flex-row flex-col h-1/2 w-full gap-2">

                        <div className="h-[345px] bg-white w-full rounded-xl   overflow-hidden">
                            <div className="relative  overflow-hidden">



                                <img className="relative  bottom-[110px]" src="https://res.cloudinary.com/dj0ivep44/image/upload/v1781380067/Black_and_Gray_Minimalist_Creative_Portfolio_Presentation_4_cothdc.jpg" alt="" />



                            </div>
                        </div>
                    </div>
                    <div className="flex md:flex-row flex-col h-1/2 w-full gap-2">
                        <div className="h-[345px] w-full md:w-1/2 lg:w-2/3  rounded-xl">
                            <div className="relative h-full overflow-hidden rounded-xl ">

                                <h1 className="relative text-white top-0 font-extrabold text-3xl  z-10 px-4 pt-2">ATS FREINDLY FORMATS</h1>
                                <div className="absolute top-0 h-full  flex flex-col ">



                                    <img className="w-full object-cover  " src="https://res.cloudinary.com/dj0ivep44/image/upload/v1781377190/Black_and_Gray_Minimalist_Creative_Portfolio_Presentation_3_osusk0.webp" alt="" />


                                </div>
                            </div>
                        </div>
                        <div className="h-[345px] w-full md:w-1/2 lg:w-1/3 bg-green-500 rounded-xl ">
                            <div className="relative h-full overflow-hidden rounded-xl border border-zinc-800 bg-gradient-to-b from-zinc-900/80 to-black p-2">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#27272a_0%,transparent_60%)] opacity-50" />

                                <div className="relative h-full flex justify-center items-center flex flex-col justify-center items-center">
                                    <h2 className="text-4xl sm:text-5xl font-extrabold font-poppins text-white mb-2">
                                        Shastra Ai
                                    </h2>

                                    <p className="text-sm text-center w-[95%] sm:text-lg font-medium text-white"> ATS-optimized, role-specific resumes tailored to your target job and industry</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div className='w-full text-center  flex flex-col items-center justify-center mb-5 mt-10'>
                <div className='text-[#000] font-poppins font-extrabold text-7xl  justify-start'>
                    to the Mock Interview Preparation.
                </div>


            </div>
            <div className="w-full mx-auto h-full  px-5 flex  lg:flex-row flex-col gap-2">

                <div className="flex lg:w-2/3 w-full h-full flex-col gap-2">
                    <div className="flex md:flex-row flex-col h-1/2 w-full gap-2">

                        <div className="h-[345px] bg-white w-full rounded-xl   overflow-hidden">
                            <div className="relative z-10  p-5">
                                <h2 className="text-3xl  font-extrabold tracking-tight text-black">
                                    Carrer Intelligence
                                </h2>
                                <p className="mt-1 w-[90%] text-xl leading-[1.6] font-normal text-zinc-500">Introducing AI powered career work flow  from intelligent <b className='text-black/80 font-medium'> Resume </b> generation to personalized  <b className='text-black/80 font-medium'>Mock Interviews</b>.</p>

                                <ImagesBadgeDemo />

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
                    <div className="flex md:flex-row flex-col h-1/2 w-full gap-2">
                        <div className="h-[345px] w-full md:w-1/2 lg:w-2/3  rounded-xl">
                            <div className="relative h-full overflow-hidden rounded-xl ">

                                <h1 className="relative text-white top-0 font-extrabold text-3xl  z-10 px-4 pt-2">ATS FREINDLY FORMATS</h1>
                                <div className="absolute top-0 h-full  flex flex-col ">



                                    <img className="w-full object-cover  " src="https://res.cloudinary.com/dj0ivep44/image/upload/v1781377190/Black_and_Gray_Minimalist_Creative_Portfolio_Presentation_3_osusk0.webp" alt="" />


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
                <div

                    className="     bg-[#080808]
    bg-[linear-gradient(45deg,#181818_25%,transparent_25%),linear-gradient(-45deg,#181818_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#181818_75%),linear-gradient(-45deg,transparent_75%,#181818_75%)]
    bg-[size:60px_60px] h-[700px] md:h-[345px] lg:h-[700px] w-full lg:w-1/3 rounded-xl flex flex-col md:flex-row lg:flex-col  p-3">

                    <div className="h-[7%] z-20 pl-2  md:w-1/2 lg:w-full   rounded-xl" >

                        <h2 className="text-3xl font-extrabold tracking-tight text-white">
                            Career Profile Generation
                        </h2>
                    </div>
                    <div className="h-[93%] z-20 w-full md:w-1/2 lg:w-full bg-white/40 rounded-xl " >
                        <img className="w-full h-full object-cover rounded-xl" src="https://res.cloudinary.com/dj0ivep44/image/upload/v1781379326/Screenshot_2026-06-14_at_1.05.04_AM_fwssh4.webp" alt="" />
                    </div>

                </div>
            </div>
        </div >
    );
};

export default SecondLanding;