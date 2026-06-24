import React, { useRef, useState, useEffect } from "react";


import { motion } from "framer-motion"
import { ImagesBadge } from "@/components/ui/images-badge";


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





    return (

        <div id="resume" className="w-full flex flex-col items-center justify-center">
            < div
                className="sm:max-w-[1520px] w-full mt-10  bg-gray-200 flex flex-col items-center justify-between    " >
                <div className="w-full justify-start pl-7 flex sm:flex-row flex-col">
                    <h2
                        className="
                    font-poppins
                    font-semibold
                   text-3xl
                    lg:text-4xl
                    leading-tight
                    text-black
text-start
                    lg:ml-1
                "
                    >

                        The Smartest Way to
                    </h2>
                    <h2
                        className="
                    font-poppins
                    font-semibold
               text-3xl
                    lg:text-4xl
                    leading-tight
                    text-black
text-start
                    lg:ml-1
                "
                    >
                        Prepare for Every Job.
                    </h2>
                </div>
                <div className="w-full mx-auto h-full px-2 sm:px-5 flex py-3 lg:py-10 flex-col gap-2">
                    <div className="flex lg:flex-row flex-col   w-full gap-5">
                        <div className="h-full lg:w-2/3 w-full group bg-white relative   rounded-3xl p-2">
                            <div

                                className="  text-white text-2xl font-bold group-hover:flex flex-col px-10 py-10 hidden bg-black/50 absolute z-30 left-0 top-0 rounded-3xl backdrop-blur-md w-full h-full">

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{
                                        opacity: 1,
                                        y: 0,
                                        transition: {
                                            duration: 0.5,
                                            ease: "easeOut",
                                        },
                                    }}
                                    className="flex flex-col h-full justify-between "
                                >


                                    <div>
                                        <h1 className="mb-2 text-gray-100">AI Powered Resume Generation  </h1>
                                        <p className="text-[15px] leading-relaxed font-medium text-gray-200">First Step of the resume generation where you fill all the information you want to add in the resume rest leave everything on SHASTRA AI.   </p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p className="text-[15px] cursor-pointer flex items-center  gap-2 leading-relaxed font-medium text-gray-200">Create Profile

                                            <svg className="rotate-45 group-hover:rotate-90 " xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                                <g fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
                                                    <path strokeDasharray={20} d="M12 21l0 -17.5">
                                                        <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="20;0"></animate>
                                                    </path>
                                                    <path strokeDasharray={12} strokeDashoffset={12} d="M12 3l7 7M12 3l-7 7">
                                                        <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.3s" dur="0.2s" to={0}></animate>
                                                    </path>
                                                </g>
                                            </svg>
                                        </p>
                                        <p className="text-[15px] flex items-center  gap-2 leading-relaxed font-medium text-gray-200">
                                            Header, Experience, Education, Skills, Summary, Projects, Additionals

                                        </p>
                                    </div>
                                </motion.div>
                            </div>

                            <img className="w-full h-full object-contain" src="https://res.cloudinary.com/dj0ivep44/image/upload/v1782033191/Untitled_design_5_gde6oa.png" alt="" />
                        </div>



                        <div className="h-full lg:w-1/3 w-full bg-white rounded-3xl relative group pt-10 pl-[65px]">



                            <div

                                className="  text-white text-2xl font-bold group-hover:flex flex-col px-10 py-10 hidden bg-black/50 absolute z-30 left-0 top-0 rounded-3xl backdrop-blur-md w-full h-full">

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{
                                        opacity: 1,
                                        y: 0,
                                        transition: {
                                            duration: 0.5,
                                            ease: "easeOut",
                                        },
                                    }}
                                    className="flex flex-col h-full justify-between "
                                >


                                    <div>
                                        <h1 className="mb-2 text-gray-100">Carrer Profile</h1>
                                        <p className="text-[15px] leading-relaxed font-medium text-gray-200">A profile containing all the informations about your carrer, education, skills, projects, summary, additionals and more.</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p className="text-[15px] cursor-pointer flex items-center  gap-2 leading-relaxed font-medium text-gray-200">Create Profile

                                            <svg className="rotate-45 group-hover:rotate-90 transition-all duration-1000 " xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                                <g fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
                                                    <path strokeDasharray={20} d="M12 21l0 -17.5">
                                                        <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="20;0"></animate>
                                                    </path>
                                                    <path strokeDasharray={12} strokeDashoffset={12} d="M12 3l7 7M12 3l-7 7">
                                                        <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.3s" dur="0.2s" to={0}></animate>
                                                    </path>
                                                </g>
                                            </svg>
                                        </p>

                                    </div>
                                </motion.div>
                            </div>
                            <img className="w-full h-full object-cover rounded-3xl" src="https://res.cloudinary.com/dj0ivep44/image/upload/v1782240454/copy_of_codesarthi-removebg-preview_lezrbb.webp" alt="" /></div>
                    </div>

                    <div className="flex lg:flex-row flex-col  w-full gap-5">
                        <div className="relative overflow-hidden w-full lg:w-1/2 rounded-3xl bg-black p-4 flex flex-col sm:flex-row lg:flex-col gap-4">

                            {/* Background */}

                            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,.18),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,.15),transparent_35%)]" />

                            {/* Illustration */}
                            <div className="relative z-10 w-full sm:w-1/2 lg:w-full flex rounded-3xl bg-white/10 flex items-center justify-center p-6">





                                <svg className="w-32 h-32 sm:w-40 sm:h-40 lg:w-52 lg:h-52 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 16V8c0-.943 0-1.414-.293-1.707S12.943 6 12 6s-1.414 0-1.707.293S10 7.057 10 8v8c0 .943 0 1.414.293 1.707S11.057 18 12 18s1.414 0 1.707-.293S14 16.943 14 16m7-7V7c0-.943 0-1.414-.293-1.707S19.943 5 19 5s-1.414 0-1.707.293S17 6.057 17 7v2c0 .943 0 1.414.293 1.707S18.057 11 19 11s1.414 0 1.707-.293S21 9.943 21 9M7 14v-2c0-.943 0-1.414-.293-1.707S5.943 10 5 10s-1.414 0-1.707.293S3 11.057 3 12v2c0 .943 0 1.414.293 1.707S4.057 16 5 16s1.414 0 1.707-.293S7 14.943 7 14m5 7v-3m7-5v-2m-7-5V3m7 2V3M5 18v-2m0-6V8"></path>
                                </svg>
                            </div>

                            {/* Content */}
                            <div className="relative z-10 w-full sm:w-1/2 lg:w-full flex-1">

                                <h2 className="text-xl sm:text-2xl font-extrabold text-white font-poppins mb-4">
                                    Deep Analysis
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">

                                    <div className="flex gap-2">
                                        <span className="text-white/40">●</span>
                                        <span className="text-sm text-white/70">
                                            Auditing your career profile at several levels
                                        </span>
                                    </div>

                                    <div className="flex gap-2">
                                        <span className="text-white/40">●</span>
                                        <span className="text-sm text-white/70">
                                            Generating the deep analysis report
                                        </span>
                                    </div>

                                    <div className="flex gap-2">
                                        <span className="text-white/40">●</span>
                                        <span className="text-sm text-white/70">
                                            Instant feedback for the strengths and weakness
                                        </span>
                                    </div>

                                    <div className="flex gap-2">
                                        <span className="text-white/40">●</span>
                                        <span className="text-sm text-white/70">
                                            Plan a strategy to re-write your resume
                                        </span>
                                    </div>

                                </div>

                            </div>

                        </div>


                        <div className="h-full lg:w-[60%] w-full bg-black rounded-xl relative group p-2">




                            <div

                                className="  text-white text-2xl font-bold group-hover:flex flex-col px-10 py-10 hidden bg-black/50 absolute z-30 left-0 top-0 rounded-3xl backdrop-blur-md w-full h-full">

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{
                                        opacity: 1,
                                        y: 0,
                                        transition: {
                                            duration: 0.5,
                                            ease: "easeOut",
                                        },
                                    }}
                                    className="flex flex-col h-full justify-between "
                                >


                                    <div>
                                        <h1 className="mb-2 text-gray-100">Carrer Profile</h1>
                                        <p className="text-[15px] leading-relaxed font-medium text-gray-200">A profile containing all the informations about your carrer, education, skills, projects, summary, additionals and more.</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p className="text-[15px] cursor-pointer flex items-center  gap-2 leading-relaxed font-medium text-gray-200">Create Profile

                                            <svg className="rotate-45 group-hover:rotate-90 transition-all duration-1000 " xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                                <g fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
                                                    <path strokeDasharray={20} d="M12 21l0 -17.5">
                                                        <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="20;0"></animate>
                                                    </path>
                                                    <path strokeDasharray={12} strokeDashoffset={12} d="M12 3l7 7M12 3l-7 7">
                                                        <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.3s" dur="0.2s" to={0}></animate>
                                                    </path>
                                                </g>
                                            </svg>
                                        </p>

                                    </div>
                                </motion.div>
                            </div>
                            <img className="w-full h-full object-contain rounded-xl" src="https://res.cloudinary.com/dj0ivep44/image/upload/v1782162312/Screenshot_2026-06-23_at_2.31.53_AM_wesi5p.png" alt="" /></div>
                    </div>

                    <div className="w-full flex flex-col lg:flex-row gap-2">

                        {/* Left Card */}
                        <div className="w-full lg:w-1/2 rounded-3xl bg-white p-4 flex flex-col sm:flex-row lg:flex-col gap-4">

                            {/* Stats */}
                            <div className="relative overflow-hidden w-full sm:w-1/2 lg:w-full min-h-[320px] rounded-2xl bg-base-300 flex items-center justify-center">


                                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.15)_1px,transparent_1px)] bg-[size:36px_36px]" />
                                <div className="text-center lg:text-left">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="20em" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M16.4 21h-2.154l-2-5H5.754l-2 5H1.6L8 5h2zm4.6-9v9h-2v-9zM6.554 14h4.892L9 7.885zM19.529 2.32a.507.507 0 0 1 .942 0l.253.61a4.37 4.37 0 0 0 2.25 2.327l.717.32a.53.53 0 0 1 0 .962l-.758.338a4.36 4.36 0 0 0-2.22 2.25l-.246.566a.506.506 0 0 1-.934 0l-.247-.565a4.36 4.36 0 0 0-2.219-2.251l-.76-.338a.53.53 0 0 1 0-.963l.718-.32a4.37 4.37 0 0 0 2.251-2.325z"></path>
                                    </svg>


                                </div>

                            </div>

                            {/* Content */}
                            <div className="w-full sm:w-1/2 lg:w-full flex-1 flex flex-col justify-center">

                                <h1 className="text-xl sm:text-2xl font-extrabold font-poppins mb-4">
                                    AI Recommended Context
                                </h1>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">

                                    <div className="flex gap-2">
                                        <span className="text-black/30 font-bold">●</span>
                                        <span className="text-sm text-black/60 font-poppins">
                                            AI-Generated Content Enhancements
                                        </span>
                                    </div>

                                    <div className="flex gap-2">
                                        <span className="text-black/30 font-bold">●</span>
                                        <span className="text-sm text-black/60 font-poppins">
                                            AI-Powered Professional Summary
                                        </span>
                                    </div>

                                    <div className="flex gap-2">
                                        <span className="text-black/30 font-bold">●</span>
                                        <span className="text-sm text-black/60 font-poppins">
                                            Skills Recommendations
                                        </span>
                                    </div>

                                    <div className="flex gap-2">
                                        <span className="text-black/30 font-bold">●</span>
                                        <span className="text-sm text-black/60 font-poppins">
                                            Tone Enhancements
                                        </span>
                                    </div>

                                </div>

                            </div>

                        </div>

                        {/* Right Card */}
                        <div className="relative overflow-hidden w-full lg:w-1/2 rounded-3xl bg-black p-4 flex flex-col sm:flex-row lg:flex-col gap-4">

                            {/* Background */}

                            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,.18),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,.15),transparent_35%)]" />

                            {/* Illustration */}
                            <div className="relative z-10 w-full sm:w-1/2 lg:w-full flex rounded-3xl bg-white/10 flex items-center justify-center p-6">



                                <svg className="w-32 h-32 sm:w-40 sm:h-40 lg:w-52 lg:h-52 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                    <g fill="#fff">
                                        <path d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5M3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.6 26.6 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.93.93 0 0 1-.765.935c-.845.147-2.34.346-4.235.346s-3.39-.2-4.235-.346A.93.93 0 0 1 3 9.219zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a25 25 0 0 1-1.871-.183a.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736l.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25 25 0 0 0 1.922-.188a.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785l-.842-1.7a.25.25 0 0 0-.182-.135"></path>
                                        <path d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2zM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5"></path>
                                    </g>
                                </svg>
                            </div>

                            {/* Content */}
                            <div className="relative z-10 w-full sm:w-1/2 lg:w-full flex-1">

                                <h2 className="text-xl sm:text-2xl font-extrabold text-white font-poppins mb-4">
                                    ATS Optimized Content Generation
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">

                                    <div className="flex gap-2">
                                        <span className="text-white/40">●</span>
                                        <span className="text-sm text-white/70">
                                            Keyword Optimization
                                        </span>
                                    </div>

                                    <div className="flex gap-2">
                                        <span className="text-white/40">●</span>
                                        <span className="text-sm text-white/70">
                                            Achievement-Driven Content
                                        </span>
                                    </div>

                                    <div className="flex gap-2">
                                        <span className="text-white/40">●</span>
                                        <span className="text-sm text-white/70">
                                            Better ATS Score & Focused on Results.
                                        </span>
                                    </div>

                                    <div className="flex gap-2">
                                        <span className="text-white/40">●</span>
                                        <span className="text-sm text-white/70">
                                            Role-Specific Tailoring
                                        </span>
                                    </div>

                                </div>

                            </div>

                        </div>



                    </div>
                </div>

                {/* <div className='w-full text-center  flex  items-center justify-center mt-10'>
                    <div className='w-full text-center  flex flex-col items-center justify-center mb-2'>
                        <div

                            className="w-full flex flex-col items-start text-center ml-12"
                        >

                            <h2
                                className="
                    font-poppins
                    font-semibold
                    text-2xl
                    sm:text-3xl
                    lg:text-5xl
                    leading-tight
                    text-black

                    ml-1
                "
                            >
                                to the Mock Interview Preparation.
                            </h2>



                        </div>



                    </div>


                </div>
                <div className="w-full  h-full px-2 sm:px-5 flex  lg:flex-row flex-col gap-2">

                    <div className="flex lg:w-2/3 w-full h-full flex-col gap-2">
                        <div className="flex md:flex-row flex-col h-1/2 w-full gap-2">

                            <div className="h-[345px] bg-white w-full rounded-xl   overflow-hidden">
                                <div className="relative z-10  p-5">
                                    <h2 className="text-3xl  font-extrabold tracking-tight text-black">
                                        Carrer Intelligence
                                    </h2>
                                    <p className="mt-1 w-[90%] text-xl leading-[1.6] font-normal text-zinc-500">Introducing AI powered career work flow  from intelligent <b className='text-black/80 font-medium'> Resume </b> generation to personalized  <b className='text-black/80 font-medium'>Mock Interviews</b>.</p>

                                    <ImagesBadgeDemo />

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
                </div> */}
            </div >

        </div>

    );
};

export default SecondLanding;