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

        <div className="w-full flex flex-col items-center justify-center">
            < div
                className="w-[90%] mt-10  bg-gray-200 flex flex-col items-center justify-between  py-10  " >
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
                            From Simple Resume Generation,
                        </h2>



                    </div>



                </div>

                <div className="w-full mx-auto h-full  px-5 flex   flex-col gap-2">
                    <div className="flex h-[600px]  w-full gap-5">
                        <div className="h-full w-2/3 group bg-white relative   rounded-3xl p-10">
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


                        <div className="h-full w-1/3 bg-white rounded-3xl relative group p-3">




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
                            <img className="w-full h-full object-cover rounded-3xl" src="https://res.cloudinary.com/dj0ivep44/image/upload/v1782033591/Screenshot_2026-06-21_at_2.49.36_PM_mcguqo.png" alt="" /></div>
                    </div>
                    <div className="flex h-[400px] relative  w-full gap-5">
                        <div className="h-full w-1/2 relative group bg-white  rounded-3xl ">

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
                                        <h1 className="mb-2 text-gray-100"> ATS Friendly Resume   </h1>
                                        <p className="text-[15px] leading-relaxed font-medium text-gray-200">Automatically generate ATS-friendly resumes with AI-optimized formatting, recruiter-approved layouts, and keyword-rich content to maximize interview opportunities.</p>
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

                                    </div>
                                </motion.div>
                            </div>

                            <h1 className="absolute pt-5 pl-5 z-10 text-2xl flex items-center gap-2  font-extrabold text-white">

                                <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24">
                                    <path fill="#fff" d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2M7.5 13A2.5 2.5 0 0 0 5 15.5A2.5 2.5 0 0 0 7.5 18a2.5 2.5 0 0 0 2.5-2.5A2.5 2.5 0 0 0 7.5 13m9 0a2.5 2.5 0 0 0-2.5 2.5a2.5 2.5 0 0 0 2.5 2.5a2.5 2.5 0 0 0 2.5-2.5a2.5 2.5 0 0 0-2.5-2.5"></path>
                                </svg>
                                ATS Friendly Resume
                            </h1>

                            <img className="w-full h-full object-cover  rounded-3xl" src="https://res.cloudinary.com/dj0ivep44/image/upload/v1781377190/Black_and_Gray_Minimalist_Creative_Portfolio_Presentation_3_osusk0.webp" alt="" /></div>
                        <div className="h-full w-1/2 relative group bg-white  rounded-3xl ">

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
                                        <h1 className="mb-2 text-gray-100"> ATS Optimized Recomendation   </h1>
                                        <p className="text-[15px] leading-relaxed font-medium text-gray-200">Get AI-powered recommendations to optimize your resume for ATS and maximize interview opportunities.</p>
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

                                    </div>
                                </motion.div>
                            </div>

                            <h1 className="absolute pt-5 pl-5 z-10 text-2xl flex items-center gap-2  font-extrabold text-white">

                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                    <g fill="none">
                                        <path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"></path>
                                        <path fill="#fff" d="M9.107 5.448c.598-1.75 3.016-1.803 3.725-.159l.06.16l.807 2.36a4 4 0 0 0 2.276 2.411l.217.081l2.36.806c1.75.598 1.803 3.016.16 3.725l-.16.06l-2.36.807a4 4 0 0 0-2.412 2.276l-.081.216l-.806 2.361c-.598 1.75-3.016 1.803-3.724.16l-.062-.16l-.806-2.36a4 4 0 0 0-2.276-2.412l-.216-.081l-2.36-.806c-1.751-.598-1.804-3.016-.16-3.724l.16-.062l2.36-.806A4 4 0 0 0 8.22 8.025l.081-.216zM19 2a1 1 0 0 1 .898.56l.048.117l.35 1.026l1.027.35a1 1 0 0 1 .118 1.845l-.118.048l-1.026.35l-.35 1.027a1 1 0 0 1-1.845.117l-.048-.117l-.35-1.026l-1.027-.35a1 1 0 0 1-.118-1.845l.118-.048l1.026-.35l.35-1.027A1 1 0 0 1 19 2"></path>
                                    </g>
                                </svg>
                                AI Recommendations
                            </h1><img className="w-full h-full object-cover  rounded-3xl" src="https://res.cloudinary.com/dj0ivep44/image/upload/v1781380067/Black_and_Gray_Minimalist_Creative_Portfolio_Presentation_4_cothdc.jpg" alt="" /></div>

                    </div>
                    <div className="flex h-[600px]  w-full gap-5">
                        <div className="h-full w-2/3 group bg-white relative   rounded-3xl p-10">
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


                        <div className="h-full w-1/3 bg-white rounded-3xl relative group p-3">




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
                            <img className="w-full h-full object-cover rounded-3xl" src="https://res.cloudinary.com/dj0ivep44/image/upload/v1782033591/Screenshot_2026-06-21_at_2.49.36_PM_mcguqo.png" alt="" /></div>
                    </div>
                </div>

                <div className='w-full text-center  flex  items-center justify-center mt-10'>
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
                <div className="w-full  h-full  px-5 flex  lg:flex-row flex-col gap-2">

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
                </div>
            </div >

        </div>

    );
};

export default SecondLanding;