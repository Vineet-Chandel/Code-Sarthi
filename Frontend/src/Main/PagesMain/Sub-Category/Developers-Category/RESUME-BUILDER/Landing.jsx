import React from "react";
import CTAcreateResume from "./CTAcreateResume";
import Nav from "@/Main/Nav";

const Landing = () => {
    return (
        <div className="w-full min-h-screen bg-gray-200 p-1 sm:p-2 md:p-3 lg:p-4 overflow-hidden">
            <link
                href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap"
                rel="stylesheet"
            />

            <div className="relative flex min-h-[98vh] flex-col rounded-2xl sm:rounded-3xl bg-black overflow-hidden py-4 sm:py-5 lg:py-6">
                <Nav />
                <div
                    className="
absolute
inset-0
bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,.18),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,.15),transparent_35%)]
"
                />

                <div
                    className="
absolute
inset-0
bg-[linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)]
bg-[size:40px_40px]
"
                />
                <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-4 xl:gap-10">
                    {/* LEFT SECTION */}
                    <div className="
w-full
lg:w-1/2
px-4
sm:px-6
md:px-10
lg:px-12
xl:px-16
pt-10
sm:pt-14
lg:pt-10
xl:pt-14
flex
flex-col
justify-center
">

                        {/* Badge */}
                        <div
                            className="
inline-flex
w-fit
items-center
gap-2
px-3
sm:px-4
md:px-5
py-2
rounded-full
text-[9px]
xs:text-[10px]
sm:text-xs
md:text-sm
mb-2
"
                            style={{
                                background: "#242424",
                                color: "#ffffff",
                            }}
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse inline-block" />
                            50+ Premium Templates · ATS-Friendly
                        </div>

                        {/* Heading */}
                        <h1
                            className="text-[34px]
leading-[1.05]
sm:text-5xl
md:text-6xl
lg:text-6xl
xl:text-7xl
2xl:text-[86px] leading-none mb-5"
                            style={{
                                fontWeight: 800,
                                color: "#ffffff",
                                letterSpacing: "-0.04em",
                            }}
                        >
                            AI Resume Builder
                            <br />
                            <span className="text-white/70">
                                That Gets Interviews
                            </span>
                        </h1>

                        {/* Description */}
                        <div
                            style={{ fontFamily: "'DM Sans', sans-serif" }}
                            className="max-w-2xl"
                        >
                            <p className="text-white/45 text-sm
sm:text-base
md:text-lg
lg:text-lg
xl:text-xl
2xl:text-2xl
max-w-xl
lg:max-w-2xl leading-relaxed">
                                Turn your career history into a job-winning resume and an interview-ready
                                strategy. Our AI not only crafts role-specific resumes but also prepares you
                                to confidently explain every achievement, metric, and project before
                                recruiters ask.
                            </p>
                        </div>

                        {/* CTA */}
                        <div className="mt-4
sm:mt-6
lg:mt-8">
                            <CTAcreateResume />
                        </div>

                        {/* AI Feature Card */}
                        <div className="mt-10
sm:mt-14
lg:mt-16
mb-8
lg:mb-12">
                            <div className="w-full  rounded-3xl bg-white/[0.08]
border
border-white/10
backdrop-blur-xl
shadow-2xl p-4
sm:p-6
lg:p-7
xl:p-8
rounded-2xl
sm:rounded-3xl text-white">

                                {/* Top */}
                                <div className="flex items-center gap-3 text-2xl  font-extrabold">

                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"

                                        viewBox="0 0 24 24"
                                        className="shrink-0 w-6 h-6 sm:w-8 sm:h-8"
                                    >
                                        <g fill="none">
                                            <path d="m5.5 13l4.5 4.5l11-11L16.5 2z"></path>
                                            <path
                                                stroke="#fff"
                                                strokeWidth={0.8}
                                                d="M10 17.5L5.5 13m4.5 4.5l-2.414 2.414a2 2 0 0 1-1.414.586H2.5v-3.672a2 2 0 0 1 .586-1.414L5.5 12.999m4.5 4.5l11-11L16.5 2l-11 11M5 3l.332.668L6 4l-.668.332L5 5l-.332-.668L4 4l.668-.332zm7.75 17l.25.5l.5.25l-.5.25l-.25.5l-.25-.5l-.5-.25l.5-.25zm6.75-6l.622 1.378L21.5 16l-1.378.622L19.5 18l-.622-1.378L17.5 16l1.378-.622z"
                                            ></path>
                                        </g>
                                    </svg>

                                    <span>
                                        Let AI do your work
                                    </span>
                                </div>

                                <div className='flex
flex-col
sm:flex-row
justify-center
items-center
gap-3
p-3
sm:p-2 mt-4 rounded-xl bg-white text-black transition-all duration-300 ease-in-out'>

                                    <span className="flex justify-center items-center gap-2 bg-black px-5
sm:px-6
py-2
w-full
sm:w-auto
justify-center rounded-full text-white">
                                        <h1 className="text-lg
sm:text-xl
lg:text-2xl font-bold text-white leading-tight text-center  transition-all duration-300 ease-in-out">Shastra</h1>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24" className='text-black'>
                                            <path fill="#fff" d="M16.4 21h-2.154l-2-5H5.754l-2 5H1.6L8 5h2zm4.6-9v9h-2v-9zM6.554 14h4.892L9 7.885zM19.529 2.32a.507.507 0 0 1 .942 0l.253.61a4.37 4.37 0 0 0 2.25 2.327l.717.32a.53.53 0 0 1 0 .962l-.758.338a4.36 4.36 0 0 0-2.22 2.25l-.246.566a.506.506 0 0 1-.934 0l-.247-.565a4.36 4.36 0 0 0-2.219-2.251l-.76-.338a.53.53 0 0 1 0-.963l.718-.32a4.37 4.37 0 0 0 2.251-2.325z"></path>
                                        </svg>
                                    </span>

                                    <h1 className="text-base
sm:text-lg
md:text-xl
text-center
sm:text-left font-light text-black leading-tight text-center  transition-all duration-300 ease-in-out">for Resume Content Writing</h1>
                                </div>
                                <p className="text-sm
sm:text-base
md:text-lg
lg:text-xl
leading-relaxed  text-white mt-4 tracking-wide">Designed for candidates who want offers, not just resumes.</p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SECTION */}
                    <div className="w-full
lg:w-[48%]
xl:w-[45%]
flex
items-center
justify-center
px-4
sm:px-6
lg:px-8
pt-0
pb-8
lg:pb-0">

                        <div className="relative
w-full
max-w-sm
sm:max-w-md
md:max-w-xl
lg:max-w-2xl">

                            {/* Glow */}
                            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-90"></div>

                            {/* Image */}
                            <img
                                className="relative z-10 w-full
h-auto
max-h-[420px]
sm:max-h-[500px]
md:max-h-[650px]
lg:max-h-none
object-contain object-contain drop-shadow-2xl hover:-translate-y-2
hover:scale-105
transition-all
duration-700 hover:scale-[1.02] transition duration-500"
                                src="https://res.cloudinary.com/dggoaxqxl/image/upload/q_auto/f_auto/v1777091782/Resume_Home_imatpu.webp"
                                alt="Resume Builder Preview"
                            />
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Landing;