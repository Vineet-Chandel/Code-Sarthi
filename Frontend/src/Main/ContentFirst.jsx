import React, { useRef } from "react";


const ContentFirst = () => {



    return (
        <section className=" w-full bg-gray-200 flex flex-col items-center justify-center  py-10 px-1 sm:px-6">

            <div

                className="max-w-6xl mx-auto flex flex-col items-center text-center mb-4"
            >

                <h2
                    className="
                    font-poppins
                    font-extrabold
                    text-2xl
                    sm:text-3xl
                    lg:text-5xl
                    leading-tight
                    text-black
                "
                >
                    A Platform for Endless Possibilities
                </h2>

                <p
                    className="
                    mt-1
                    max-w-3xl
                    text-gray-600
                    text-base
                    sm:text-sm
                    lg:text-lg
                    leading-relaxed
                "
                >
                    CodeSarthi connects you with a global developer community
                    to build and scale. Designed to boost productivity while
                    keeping workflows fast and efficient.
                </p>

            </div>

            <div className="w-full flex flex-col items-center gap-2">
                {/* Top Cards */}
                <div className="w-full flex flex-col lg:flex-row gap-2">

                    {/* Left Card */}
                    <div className="w-full lg:w-1/2 h-[700px] sm:h-[345px] lg:h-[700px] bg-white rounded-3xl p-3 flex flex-col sm:flex-row lg:flex-col gap-1 sm:gap-3">

                        <div className="w-full sm:w-1/2 lg:w-full h-[70%]  sm:h-full lg:h-[70%] lg:flex-[7] bg-black/20 rounded-3xl" >
                            <img className="h-full object-cover rounded-3xl" src="https://res.cloudinary.com/dj0ivep44/image/upload/v1781592039/Untitled_design_4_olwich.webp" alt="" />
                        </div>


                        <div className="w-full sm:w-1/2 lg:w-full h-[30%]  sm:h-full lg:h-[30%] lg:flex-[3]" >
                            <h1 className="text-xl sm:text-2xl font-extrabold font-poppins pb-1 sm:pb-3">Keep Developers Engaged</h1>
                            <div className="flex lg:flex-row sm:flex-col min-[400px]:flex-row flex-col justify-between">
                                <div>
                                    <div className=" flex gap-1.5 min-[400px]:text-sm text-xs pb-1 sm:pb-2 font-poppins items-center text-black/55">
                                        <span className="">

                                            ●

                                        </span>
                                        <span> Everything in one place.</span>
                                    </div>
                                    <div className=" flex gap-1.5 min-[400px]:text-sm text-xs pb-1 sm:pb-2 font-poppins items-center text-black/55">
                                        <span className="">

                                            ●

                                        </span>
                                        <span>Chat without boundaries.</span>
                                    </div>
                                    <div className=" flex gap-1.5 min-[400px]:text-sm text-xs pb-1 sm:pb-2 font-poppins items-center text-black/55">
                                        <span className="">

                                            ●

                                        </span>
                                        <span>Collaborate in real time.</span>
                                    </div>
                                    <div className=" flex gap-1.5 min-[400px]:text-sm text-xs pb-1 sm:pb-2 font-poppins items-center text-black/55">
                                        <span className="">

                                            ●

                                        </span>
                                        <span>AI that keeps work moving.</span>
                                    </div>
                                </div>


                                <div>
                                    <div className=" flex gap-1.5 min-[400px]:text-sm text-xs pb-1 sm:pb-2 font-poppins items-center text-black/55">
                                        <span className="">

                                            ●

                                        </span>
                                        <span>Communities built to connect.</span>
                                    </div>
                                    <div className=" flex gap-1.5 min-[400px]:text-sm text-xs pb-1 sm:pb-2 font-poppins items-center text-black/55">
                                        <span className="">

                                            ●

                                        </span>
                                        <span>Meet, message, and create together.</span>
                                    </div>
                                    <div className=" flex gap-1.5 min-[400px]:text-sm text-xs pb-1 sm:pb-2 font-poppins items-center text-black/55">
                                        <span className="">

                                            ●

                                        </span>
                                        <span>Instant feedback. Faster decisions.</span>
                                    </div>
                                    <div className=" flex gap-1.5 min-[400px]:text-sm text-xs pb-1 sm:pb-2 font-poppins items-center text-black/55">
                                        <span className="">

                                            ●

                                        </span>
                                        <span>One workspace. Endless possibilities.</span>
                                    </div>
                                </div>


                            </div>
                        </div>

                    </div>

                    {/* Right Card */}
                    <div className="w-full lg:w-1/2 h-[700px] sm:h-[345px] lg:h-[700px] bg-black rounded-3xl p-3 flex flex-col sm:flex-row lg:flex-col gap-1 sm:gap-3">

                        <div className="w-full sm:w-1/2 lg:w-full h-[70%]  sm:h-full lg:h-[70%] lg:flex-[7] bg-white/20 rounded-3xl" >

                            <img className="rounded-3xl object-cover h-full " src="https://res.cloudinary.com/dj0ivep44/image/upload/v1781591010/Untitled_design_3_jisimz.webp" alt="" />
                        </div>

                        <div className="w-full sm:w-1/2 lg:w-full h-[30%]  sm:h-full lg:h-[30%] lg:flex-[3]" >
                            <h1 className="text-xl sm:text-2xl text-white font-extrabold font-poppins pb-1 sm:pb-3">Eliminate PM Dependency</h1>

                            <div className="flex lg:flex-row sm:flex-col min-[400px]:flex-row flex-col justify-between">
                                <div>
                                    <div className=" flex gap-1.5 min-[400px]:text-sm text-xs pb-1 sm:pb-2 font-poppins items-center text-white/55">
                                        <span className="">

                                            ●

                                        </span>
                                        <span>Self-managed teams. Better outcomes.</span>
                                    </div>
                                    <div className=" flex gap-1.5 min-[400px]:text-sm text-xs pb-1 sm:pb-2 font-poppins items-center text-white/55">
                                        <span className="">

                                            ●

                                        </span>
                                        <span>Real-time visibility into every project.</span>
                                    </div>
                                    <div className=" flex gap-1.5 min-[400px]:text-sm text-xs pb-1 sm:pb-2 font-poppins items-center text-white/55">
                                        <span className="">

                                            ●

                                        </span>
                                        <span>Tasks, timelines, and dashboards in one place.</span>
                                    </div>
                                    <div className=" flex gap-1.5 min-[400px]:text-sm text-xs pb-1 sm:pb-2 font-poppins items-center text-white/55">
                                        <span className="">

                                            ●

                                        </span>
                                        <span>Track progress as it happens.</span>
                                    </div>
                                </div>


                                <div>
                                    <div className=" flex gap-1.5 min-[400px]:text-sm text-xs pb-1 sm:pb-2 font-poppins items-center text-white/55">
                                        <span className="">

                                            ●

                                        </span>
                                        <span>Identify blockers before they become delays.</span>
                                    </div>
                                    <div className=" flex gap-1.5 min-[400px]:text-sm text-xs pb-1 sm:pb-2 font-poppins items-center text-white/55">
                                        <span className="">

                                            ●

                                        </span>
                                        <span>Keep every teammate aligned and accountable.</span>
                                    </div>
                                    <div className=" flex gap-1.5 min-[400px]:text-sm text-xs pb-1 sm:pb-2 font-poppins items-center text-white/55">
                                        <span className="">

                                            ●

                                        </span>
                                        <span>Plan smarter. Execute faster.</span>
                                    </div>
                                    <div className=" flex gap-1.5 min-[400px]:text-sm text-xs pb-1 sm:pb-2 font-poppins items-center text-white/55">
                                        <span className="">

                                            ●

                                        </span>
                                        <span>Deliver projects with confidence.</span>
                                    </div>
                                </div>


                            </div>

                        </div>

                    </div>

                </div>

                {/* Bottom Card */}
                <div className="w-full min-h-[400px] sm:min-h-[345px] bg-white rounded-3xl p-3 flex flex-col sm:flex-row  gap-3">

                    <div className="w-full sm:w-1/2 min-h-[70%] sm:min-h-full  lg:flex-[3]  rounded-3xl" >
                        <img className="rounded-3xl h-full object-cover" src="https://res.cloudinary.com/dj0ivep44/image/upload/v1781588006/Untitled_design_2_d6ewiv.webp" alt="" />
                    </div>

                    <div className="w-full sm:w-1/2 lg:w-full h-[30%]  sm:h-full lg:h-[30%] lg:flex-[3]" >
                        <h1 className="text-xl sm:text-2xl text-black font-extrabold font-poppins pb-1 sm:pb-3">Time is Precious</h1>

                        <div className="flex lg:flex-row sm:flex-col min-[400px]:flex-row flex-col justify-between">
                            <div>
                                <div className=" flex gap-1.5 min-[400px]:text-sm text-xs pb-1 sm:pb-2 font-poppins items-center text-black/55">
                                    <span className="">

                                        ●

                                    </span>
                                    <span> One workspace for work that matters..</span>
                                </div>
                                <div className=" flex gap-1.5 min-[400px]:text-sm text-xs pb-1 sm:pb-2 font-poppins items-center text-black/55">
                                    <span className="">

                                        ●

                                    </span>
                                    <span>Real-time visibility into every project.</span>
                                </div>
                                <div className=" flex gap-1.5 min-[400px]:text-sm text-xs pb-1 sm:pb-2 font-poppins items-center text-black/55">
                                    <span className="">

                                        ●

                                    </span>
                                    <span>Track tasks, time, and progress effortlessly.</span>
                                </div>
                                <div className=" flex gap-1.5 min-[400px]:text-sm text-xs pb-1 sm:pb-2 font-poppins items-center text-black/55">
                                    <span className="">

                                        ●

                                    </span>
                                    <span>Empower every teammate with clear ownership.</span>
                                </div>
                            </div>


                            <div>
                                <div className=" flex gap-1.5 min-[400px]:text-sm text-xs pb-1 sm:pb-2 font-poppins items-center text-black/55">
                                    <span className="">

                                        ●

                                    </span>
                                    <span>Identify blockers before they impact delivery.</span>
                                </div>
                                <div className=" flex gap-1.5 min-[400px]:text-sm text-xs pb-1 sm:pb-2 font-poppins items-center text-black/55">
                                    <span className="">

                                        ●

                                    </span>
                                    <span>Turn productivity into measurable results.</span>
                                </div>
                                <div className=" flex gap-1.5 min-[400px]:text-sm text-xs pb-1 sm:pb-2 font-poppins items-center text-black/55">
                                    <span className="">

                                        ●

                                    </span>
                                    <span>Keep teams aligned with shared dashboards.</span>
                                </div>
                                <div className=" flex gap-1.5 min-[400px]:text-sm text-xs pb-1 sm:pb-2 font-poppins items-center text-black/55">
                                    <span className="">

                                        ●

                                    </span>
                                    <span>Execute with confidence, every single day.</span>
                                </div>
                            </div>


                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
};

export default ContentFirst;