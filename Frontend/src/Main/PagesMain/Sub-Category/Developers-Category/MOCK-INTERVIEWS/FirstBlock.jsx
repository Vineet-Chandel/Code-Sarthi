import React, { useRef } from "react";


const FirstBlock = () => {



    return (
        <section className="mt-5 lg:mt-20 w-full bg-gray-200 flex flex-col items-center justify-center  p-1.5 ">

            <div

                className="w-[95%] sm:w-[90%] mx-auto flex flex-col items-start text-center m-2 lg:mb-4"
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
                    AI BASED MOCK INTERVIEWS,
                </h2>



            </div>

            <div className="w-full sm:w-[90%] flex flex-col items-center gap-2">
                {/* Top Cards */}
                <div className="w-full flex flex-col lg:flex-row gap-2">

                    {/* Left Card */}
                    <div className="w-full lg:w-1/2 rounded-3xl bg-white p-4 flex flex-col sm:flex-row lg:flex-col gap-4">

                        {/* Stats */}
                        <div className="relative overflow-hidden w-full sm:w-1/2 lg:w-full min-h-[320px] rounded-2xl bg-base-300 flex items-center justify-center">


                            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.15)_1px,transparent_1px)] bg-[size:36px_36px]" />
                            <div className="text-center lg:text-left">
                                <h2 className="text-5xl sm:text-6xl lg:text-8xl xl:text-9xl font-bold font-general tracking-wide">
                                    500+
                                </h2>

                                <p className="mt-2 text-sm sm:text-base text-gray-600 font-poppins">
                                    Interviews Conducted
                                </p>
                            </div>

                        </div>

                        {/* Content */}
                        <div className="w-full sm:w-1/2 lg:w-full flex-1 flex flex-col justify-center">

                            <h1 className="text-xl sm:text-2xl font-extrabold font-poppins mb-4">
                                Various type of Interview Rounds
                            </h1>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">

                                <div className="flex gap-2">
                                    <span className="text-black/30 font-bold">●</span>
                                    <span className="text-sm text-black/60 font-poppins">
                                        Coding + Technical + Behavioral
                                    </span>
                                </div>

                                <div className="flex gap-2">
                                    <span className="text-black/30 font-bold">●</span>
                                    <span className="text-sm text-black/60 font-poppins">
                                        Technical + Behavioral
                                    </span>
                                </div>

                                <div className="flex gap-2">
                                    <span className="text-black/30 font-bold">●</span>
                                    <span className="text-sm text-black/60 font-poppins">
                                        Case Study + Technical + Behavioral
                                    </span>
                                </div>

                                <div className="flex gap-2">
                                    <span className="text-black/30 font-bold">●</span>
                                    <span className="text-sm text-black/60 font-poppins">
                                        Communication + Behavioral
                                    </span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="text-black/30 font-bold">●</span>
                                    <span className="text-sm text-black/60 font-poppins">
                                        Aptitude + Domain + Behavioral
                                    </span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="text-black/30 font-bold">●</span>
                                    <span className="text-sm text-black/60 font-poppins">
                                        Sales + Behavioral
                                    </span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="text-black/30 font-bold">●</span>
                                    <span className="text-sm text-black/60 font-poppins">
                                        Creative + Behavioral
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





                            <svg className="w-32 h-32 sm:w-40 sm:h-40 lg:w-52 lg:h-52 text-white" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48">
                                <path fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" d="M24 43.5c1.595 0 14.7-12.374 15.094-20.26l-1.419-2.026l1.52-2.026V7.22L26.026 4.5L24 5.21l-2.026-.71L8.805 8.106V19.25l1.52 1.965l-1.418 2.026C9.385 32.54 22.417 43.5 24 43.5"></path>
                                <path fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" d="M21.974 4.5v8.104l-9.117 6.584H8.805M26.026 4.5v8.104l9.117 6.584h4.052m-.101 4.052l-4.762.06L24 15.44l-10.332 7.8H8.907M24 15.44V43.5"></path>
                            </svg>
                        </div>

                        {/* Content */}
                        <div className="relative z-10 w-full sm:w-1/2 lg:w-full flex-1">

                            <h2 className="text-xl sm:text-2xl font-extrabold text-white font-poppins mb-4">
                                Challenging your every claims
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">

                                <div className="flex gap-2">
                                    <span className="text-white/40">●</span>
                                    <span className="text-sm text-white/70">
                                        Interrogate every claim before recruiters do.
                                    </span>
                                </div>

                                <div className="flex gap-2">
                                    <span className="text-white/40">●</span>
                                    <span className="text-sm text-white/70">
                                        Prepare for the toughest follow-up questions.
                                    </span>
                                </div>

                                <div className="flex gap-2">
                                    <span className="text-white/40">●</span>
                                    <span className="text-sm text-white/70">
                                        Challenge every achievement with recruiter-level scrutiny.
                                    </span>
                                </div>

                                <div className="flex gap-2">
                                    <span className="text-white/40">●</span>
                                    <span className="text-sm text-white/70">
                                        Practice explaining every project with confidence.
                                    </span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="text-white/40">●</span>
                                    <span className="text-sm text-white/70">
                                        Turn every resume bullet into a defendable story.
                                    </span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="text-white/40">●</span>
                                    <span className="text-sm text-white/70">
                                        Expose weak claims and strengthen them with evidence.
                                    </span>
                                </div>

                            </div>

                        </div>

                    </div>



                </div>

                {/* Bottom Card */}
                <div className="w-full rounded-3xl bg-white p-4 flex flex-col sm:flex-row gap-4">

                    {/* Image */}
                    <div className="relative overflow-hidden w-full sm:w-1/2 min-h-[320px] rounded-2xl bg-base-300 flex items-center justify-center">
                        {/* Background */}
                        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,.18),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,.15),transparent_35%)]" />

                        <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] bg-[size:40px_40px]" />





                        <svg className=" w-40 sm:w-56 md:w-64 lg:w-72 xl:w-80 h-auto relative z-10
  " xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                            <path fill="#000" d="M16.4 21h-2.154l-2-5H5.754l-2 5H1.6L8 5h2zm4.6-9v9h-2v-9zM6.554 14h4.892L9 7.885zM19.529 2.32a.507.507 0 0 1 .942 0l.253.61a4.37 4.37 0 0 0 2.25 2.327l.717.32a.53.53 0 0 1 0 .962l-.758.338a4.36 4.36 0 0 0-2.22 2.25l-.246.566a.506.506 0 0 1-.934 0l-.247-.565a4.36 4.36 0 0 0-2.219-2.251l-.76-.338a.53.53 0 0 1 0-.963l.718-.32a4.37 4.37 0 0 0 2.251-2.325z"></path>
                        </svg>
                    </div>

                    {/* Content */}
                    <div className="w-full sm:w-1/2 flex flex-col justify-center rounded-3xl bg-gray-100 px-4 py-4">
                        <h1 className="text-2xl md:text-3xl font-extrabold font-poppins">
                            AI Based Mock Interviews
                        </h1>



                        {/* Features */}
                        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-3">
                            <div className="flex gap-2 text-black/60">
                                <span>●</span>
                                <span>Company-specific interview simulations</span>
                            </div>

                            <div className="flex gap-2 text-black/60">
                                <span>●</span>
                                <span>Real-time AI interviewer with voice support</span>
                            </div>

                            <div className="flex gap-2 text-black/60">
                                <span>●</span>
                                <span> Technical, HR, Coding and behavioral interview rounds</span>
                            </div>

                            <div className="flex gap-2 text-black/60">
                                <span>●</span>
                                <span>Adaptive questions based on your experience</span>
                            </div>
                            <div className="flex gap-2 text-black/60">
                                <span>●</span>
                                <span>Insights that drive better decisions.</span>
                            </div>
                            <div className="flex gap-2 text-black/60">
                                <span>●</span>
                                <span>Communication, confidence, and clarity analysis</span>
                            </div>
                            <div className="flex gap-2 text-black/60">
                                <span>●</span>
                                <span>Performance score with detailed insights
                                </span>
                            </div>
                            <div className="flex gap-2 text-black/60">
                                <span>●</span>
                                <span>Personalized improvement recommendations</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default FirstBlock;