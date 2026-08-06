import React, { useRef } from "react";


const ContentFirst = () => {



    return (
        <section id="scaling" className="mt-5 lg:mt-20 w-full bg-gray-200 flex flex-col items-center justify-center  p-1.5 ">

            <div

                className="w-[95%]  mx-auto flex flex-col items-start text-center m-2 lg:mb-4"
            >
                <div className="flex sm:flex-row flex-col">
                    <h2
                        className="
                    font-poppins
                    font-semibold
                   text-4xl
                    lg:text-5xl
                    leading-tight
                    text-black
text-start
                    ml-1
                "
                    >
                        Scaling
                    </h2>
                    <h2
                        className="
                    font-poppins
                    font-semibold
                   text-4xl
                    lg:text-5xl
                    leading-tight
                    text-black
text-start
                    ml-1
                "
                    >
                        Successful Teams
                    </h2>
                </div>




            </div>

            <div className="w-[95%] flex flex-col items-center gap-2">
                {/* Top Cards */}
                <div className="w-full flex flex-col lg:flex-row gap-2">

                    {/* Left Card */}
                    <div className="w-full lg:w-1/2 rounded-3xl bg-white p-4 flex flex-col sm:flex-row lg:flex-col gap-4">

                        {/* Stats */}
                        <div className="relative overflow-hidden w-full sm:w-1/2 lg:w-full min-h-[320px] rounded-2xl bg-base-300 flex items-center justify-center">


                            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.15)_1px,transparent_1px)] bg-[size:36px_36px]" />
                            <div className="text-center lg:text-left">
                                <h2 className="text-5xl sm:text-6xl lg:text-8xl xl:text-9xl font-bold font-general tracking-wide">
                                    100+
                                </h2>

                                <p className="mt-2 text-sm sm:text-base text-gray-600 font-poppins">
                                    Teams Served
                                </p>
                            </div>

                        </div>

                        {/* Content */}
                        <div className="w-full sm:w-1/2 lg:w-full flex-1 flex flex-col justify-center">

                            <h1 className="text-xl sm:text-2xl font-extrabold font-poppins mb-4">
                                Keep Developers Engaged
                            </h1>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">

                                <div className="flex gap-2">
                                    <span className="text-black/30 font-bold">●</span>
                                    <span className="text-sm text-black/60 font-poppins">
                                        One workspace. Endless possibilities.
                                    </span>
                                </div>

                                <div className="flex gap-2">
                                    <span className="text-black/30 font-bold">●</span>
                                    <span className="text-sm text-black/60 font-poppins">
                                        Communities built to connect.
                                    </span>
                                </div>

                                <div className="flex gap-2">
                                    <span className="text-black/30 font-bold">●</span>
                                    <span className="text-sm text-black/60 font-poppins">
                                        Collaborate in real time.
                                    </span>
                                </div>

                                <div className="flex gap-2">
                                    <span className="text-black/30 font-bold">●</span>
                                    <span className="text-sm text-black/60 font-poppins">
                                        Meet, message, and create together.
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


                            <svg className="w-32 h-32 sm:w-40 sm:h-40 lg:w-52 lg:h-52 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"> <path fill="#fff" fillRule="evenodd" d="M280.4 68.995c26.79-29.767 76.077-15.992 83.552 23.35l14.88 78.321h-245.67l14.881-78.32c7.475-39.343 56.762-53.118 83.552-23.351c13.041 14.49 35.764 14.49 48.805 0M129.109 191.999l-8.106 42.667h-35.67v42.666h341.334v-42.666h-35.675l-8.106-42.667zm41.558 234.667L128 405.332l-42.667-21.333v85.333h341.334v-85.333L384 405.332l-42.667 21.334L256 469.332zm213.333-128H128v21.333h.062c1.392 29.69 25.904 53.333 55.938 53.333h8c22.679 0 34.959-14.259 39.955-32.235c3.155-11.352 12.263-21.098 24.045-21.098s20.89 9.746 24.045 21.098c4.996 17.976 17.276 32.235 39.955 32.235h8c30.034 0 54.546-23.643 55.938-53.333H384z" clipRule="evenodd"></path> </svg>

                        </div>

                        {/* Content */}
                        <div className="relative z-10 w-full sm:w-1/2 lg:w-full flex-1">

                            <h2 className="text-xl sm:text-2xl font-extrabold text-white font-poppins mb-4">
                                Eliminate PM Dependency
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">

                                <div className="flex gap-2">
                                    <span className="text-white/40">●</span>
                                    <span className="text-sm text-white/70">
                                        Self-managed teams. Better outcomes.
                                    </span>
                                </div>

                                <div className="flex gap-2">
                                    <span className="text-white/40">●</span>
                                    <span className="text-sm text-white/70">
                                        Tasks, timelines, and dashboards in one place.
                                    </span>
                                </div>

                                <div className="flex gap-2">
                                    <span className="text-white/40">●</span>
                                    <span className="text-sm text-white/70">
                                        Real-time visibility and team alignment.
                                    </span>
                                </div>

                                <div className="flex gap-2">
                                    <span className="text-white/40">●</span>
                                    <span className="text-sm text-white/70">
                                        Identify blockers before they become delays.
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
  " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path fill="#000" d="M255.656 22.75c-131.173 0-237.72 33.326-237.72 74.344c.002 22.39 32.41 42.59 82.564 56.22c-17.407-8.91-27.53-19.216-27.53-30.47c0-32.128 81.75-58.53 182.686-58.53s183.25 26.4 183.25 58.53c0 11.194-10.3 21.59-27.53 30.47c49.843-13.627 81.968-33.91 81.968-56.22c0-41.018-106.514-74.344-237.688-74.344M147.47 103.094v30.094h216.28v-30.094zm4.374 48.78V361.94h18.687V151.875h-18.686zm39.125 0c.698 61.812 25.325 96.435 52.81 103.814c-27.847 7.475-52.776 42.9-52.843 106.25h128.188c-.066-63.353-24.952-98.766-52.78-106.25c27.468-7.386 52.05-41.998 52.75-103.813H190.968zm147.936 0V361.94h18.688V151.875h-18.688zM100.5 360.72c-50.153 13.626-82.563 33.827-82.563 56.217c0 41.018 106.546 74.344 237.72 74.344s237.687-33.325 237.687-74.342c0-22.31-32.125-42.593-81.97-56.22c17.232 8.88 27.532 19.244 27.532 30.438c0 32.13-82.313 58.563-183.25 58.563S72.97 423.283 72.97 391.155c0-11.254 10.123-21.528 27.53-30.437zm46.97 19.905v30.063h216.28v-30.063z"></path>
                        </svg>
                    </div>

                    {/* Content */}
                    <div className="w-full sm:w-1/2 flex flex-col justify-center rounded-3xl bg-gray-100 px-4 py-4">
                        <h1 className="text-2xl md:text-3xl font-extrabold font-poppins">
                            Time is Precious
                        </h1>



                        {/* Features */}
                        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-3">
                            <div className="flex gap-2 text-black/60">
                                <span>●</span>
                                <span>Everything in one workspace.</span>
                            </div>

                            <div className="flex gap-2 text-black/60">
                                <span>●</span>
                                <span>See every task. Track every hour.</span>
                            </div>

                            <div className="flex gap-2 text-black/60">
                                <span>●</span>
                                <span>Accountability made effortless.</span>
                            </div>

                            <div className="flex gap-2 text-black/60">
                                <span>●</span>
                                <span>Visibility that keeps projects moving.</span>
                            </div>
                            <div className="flex gap-2 text-black/60">
                                <span>●</span>
                                <span>Insights that drive better decisions.</span>
                            </div>
                            <div className="flex gap-2 text-black/60">
                                <span>●</span>
                                <span>Stay aligned from start to finish.</span>
                            </div>
                            <div className="flex gap-2 text-black/60">
                                <span>●</span>
                                <span>Identify issues before they grow.</span>
                            </div>
                            <div className="flex gap-2 text-black/60">
                                <span>●</span>
                                <span>Built for teams that move fast.</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ContentFirst;